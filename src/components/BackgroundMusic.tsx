import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function BackgroundMusic() {
  // const { t } = useLanguage()
  const [isVisible] = useState(true) // Show component but hide controls
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted for autoplay
  const [volume] = useState(1.0)
  const [showNotification, setShowNotification] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Global music trigger function that can be called from anywhere
  window.startBackgroundMusic = () => {
    console.log('Global music trigger called')
    if (audioRef.current && !isPlaying) {
      audioRef.current.muted = false
      audioRef.current.volume = volume
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        setIsMuted(false)
        setHasInteracted(true)
        console.log('Music started via global trigger')
      }).catch(console.error)
    }
  }

  // Define attemptAutoplay function outside useEffect
  const attemptAutoplay = async () => {
    if (!audioRef.current) {
      console.log(isMuted)
      console.log('Audio ref not available')
      return false
    }
    
    console.log('Attempting autoplay...')
    
    try {
      // First try: muted autoplay for better browser compatibility
      audioRef.current.volume = volume
      audioRef.current.loop = true
      audioRef.current.muted = true
      
      await audioRef.current.play()
      console.log('Muted autoplay successful')
      setIsPlaying(true)
      setIsMuted(true)
      
      // Auto unmute immediately for instant full volume
      setTimeout(() => {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.muted = false
          audioRef.current.volume = volume
          setIsMuted(false)
          setHasInteracted(true)
          console.log('Audio unmuted and set to full volume')
        }
      }, 100)
      
      return true
      
    } catch (error) {
      console.error('Autoplay failed:', error)
      return false
    }
  }

  // Enhanced autoplay attempt with production-focused strategy
  useEffect(() => {
    // Try multiple times with different delays
    const tryAutoplay = async () => {
      const success = await attemptAutoplay()
      if (!success && !hasInteracted) {
        setupInteractionListeners()
      }
    }

    // Immediate attempts for development
    tryAutoplay()
    setTimeout(tryAutoplay, 50)
    setTimeout(tryAutoplay, 100)
    setTimeout(tryAutoplay, 200)
    setTimeout(tryAutoplay, 500)
    setTimeout(tryAutoplay, 1000)
    
    // Setup interaction listeners immediately for production
    setupInteractionListeners()
    
    // Special handling for production environment
    if (typeof window !== 'undefined') {
      // Try when page becomes visible
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !isPlaying) {
          setTimeout(tryAutoplay, 100)
        }
      })
      
      // Try when page gets focus
      window.addEventListener('focus', () => {
        if (!isPlaying) {
          setTimeout(tryAutoplay, 100)
        }
      })
    }
  }, [])

  // Continuous autoplay attempts
  useEffect(() => {
    if (!isPlaying && !hasInteracted) {
      const intervals = [200, 500, 1000, 2000, 3000, 5000]
      const timers = intervals.map(delay => 
        setTimeout(() => {
          if (!isPlaying && !hasInteracted) {
            attemptAutoplay()
          }
        }, delay)
      )

      return () => timers.forEach(clearTimeout)
    }
  }, [isPlaying, hasInteracted])

  // Auto-hide notification after 6 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [showNotification])


  // Setup interaction listeners for autoplay - More Aggressive
  const setupInteractionListeners = () => {
    const handleFirstInteraction = async () => {
      console.log('User interaction detected, starting music...')
      setHasInteracted(true)
      setShowNotification(false)
      
      if (audioRef.current) {
        try {
          audioRef.current.volume = volume
          audioRef.current.muted = false
          await audioRef.current.play()
          setIsPlaying(true)
          setIsMuted(false)
          console.log('Music started successfully after user interaction')
        } catch (error) {
          console.log('Error playing audio:', error)
        }
      }
    }

    // More comprehensive event types for maximum coverage
    const events = [
      'click', 'touchstart', 'touchend', 'touchmove', 
      'keydown', 'keyup', 'scroll', 'wheel',
      'mousemove', 'mouseenter', 'mouseover', 'mousedown',
      'focus', 'blur', 'resize', 'load', 'DOMContentLoaded',
      'visibilitychange', 'pageshow'
    ]
    
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true })
      window.addEventListener(event, handleFirstInteraction, { once: true, passive: true })
    })
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction)
        window.removeEventListener(event, handleFirstInteraction)
      })
    }
  }

  // Enhanced interaction handling
  useEffect(() => {
    if (!hasInteracted) {
      setupInteractionListeners()
    }
  }, [hasInteracted, volume])

  // Set initial audio properties with immediate play attempt
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
      audioRef.current.muted = true // Start muted for better autoplay success
      
      // Multiple event listeners for immediate autoplay
      const audioElement = audioRef.current
      
      const playWhenReady = () => {
        console.log('Audio ready, attempting autoplay...')
        attemptAutoplay()
      }
      
      audioElement.addEventListener('canplay', playWhenReady)
      audioElement.addEventListener('canplaythrough', playWhenReady)
      audioElement.addEventListener('loadeddata', playWhenReady)
      audioElement.addEventListener('loadedmetadata', playWhenReady)
      
      // Immediate attempt if already loaded
      if (audioElement.readyState >= 2) {
        playWhenReady()
      }
      
      return () => {
        audioElement.removeEventListener('canplay', playWhenReady)
        audioElement.removeEventListener('canplaythrough', playWhenReady)
        audioElement.removeEventListener('loadeddata', playWhenReady)
        audioElement.removeEventListener('loadedmetadata', playWhenReady)
      }
    }
  }, [volume])

  const toggleMusic = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Ensure audio is not muted when manually playing
        audioRef.current.muted = false
        audioRef.current.volume = volume
        await audioRef.current.play()
        setIsPlaying(true)
        setIsMuted(false)
        setHasInteracted(true)
      }
    } catch (error) {
      console.error('Error toggling audio:', error)
    }
    setShowNotification(false)
  }

  // const toggleMute = () => {
  //   if (audioRef.current) {
  //     audioRef.current.muted = !isMuted
  //     setIsMuted(!isMuted)
  //   }
  // }

  // const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newVolume = parseFloat(e.target.value)
  //   setVolume(newVolume)
  //   if (audioRef.current) {
  //     audioRef.current.volume = newVolume
  //   }
  // }



  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Invisible Autoplay Trigger - More Aggressive */}
          {!isPlaying && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              <button
                onClick={() => {
                  attemptAutoplay()
                  setHasInteracted(true)
                }}
                onMouseEnter={() => {
                  attemptAutoplay()
                  setHasInteracted(true)
                }}
                onTouchStart={() => {
                  attemptAutoplay()
                  setHasInteracted(true)
                }}
                className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-auto cursor-default"
                aria-label="Start background music"
              />
            </div>
          )}



          {/* Floating Music Controls - Hidden */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed bottom-24 right-4 z-40 md:bottom-4 hidden"
          >
            {/* Main Music Button */}
            <motion.button
              onClick={toggleMusic}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`
                relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300
                ${isPlaying 
                  ? 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700' 
                  : 'bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700'
                }
              `}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
              
              {/* Pulsing ring when playing */}
              {isPlaying && (
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-green-400 rounded-full"
                />
              )}
              
              {/* Music waves animation when playing */}
              {isPlaying && (
                <div className="absolute -top-2 -right-2">
                  <div className="flex space-x-0.5">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-white rounded-full"
                        animate={{
                          height: [2, 8, 2],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.button>

            {/* Volume Control - Removed */}
            
            {/* Tooltip - Removed since controls are hidden */}
          </motion.div>

          {/* Hidden Audio Element with Aggressive Autoplay */}
          <audio
            ref={audioRef}
            preload="auto"
            loop
            autoPlay
            muted={true}
            playsInline
            crossOrigin="anonymous"
            onEnded={() => {
              // Force restart if ended (backup for loop)
              if (audioRef.current) {
                audioRef.current.currentTime = 0
                audioRef.current.play().catch(console.error)
              }
            }}
            onError={(e) => {
              console.error('Audio error:', e)
              setIsPlaying(false)
              // Try next source or retry
              setTimeout(() => {
                if (!isPlaying) attemptAutoplay()
              }, 2000)
            }}
            onPlay={() => {
              setIsPlaying(true)
            }}
            onPause={() => {
              setIsPlaying(false)
            }}
            onLoadedData={() => {
              // Immediate autoplay attempt when loaded
              setTimeout(() => {
                if (!hasInteracted) {
                  attemptAutoplay()
                }
              }, 100)
            }}
            onCanPlay={() => {
              // Additional autoplay attempt
              if (!isPlaying && !hasInteracted) {
                setTimeout(() => attemptAutoplay(), 200)
              }
            }}
            onLoadedMetadata={() => {
              setTimeout(() => {
                if (!hasInteracted) {
                  attemptAutoplay()
                }
              }, 50)
            }}
          >
            {/* Multiple audio sources for better compatibility */}
            <source src="/audio/sample.mp3" type="audio/mpeg" />
            
            
            Your browser does not support the audio element.
          </audio>
        </>
      )}
    </AnimatePresence>
  )
}
