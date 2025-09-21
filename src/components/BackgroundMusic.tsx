import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function BackgroundMusic() {
  const { t } = useLanguage()
  const [isVisible] = useState(true) // Show component but hide controls
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted for autoplay
  const [volume, setVolume] = useState(1.0)
  const [showNotification, setShowNotification] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Define attemptAutoplay function outside useEffect
  const attemptAutoplay = async () => {
    if (!audioRef.current) {
      return false
    }
    
    try {
      // Set audio properties
      audioRef.current.volume = volume
      audioRef.current.loop = true
      audioRef.current.muted = false
      
      // Try to play
      await audioRef.current.play()
      setIsPlaying(true)
      setIsMuted(false)
      setHasInteracted(true)
      
      return true
      
    } catch (error) {
      // Fallback: try muted autoplay
      try {
        audioRef.current.muted = true
        await audioRef.current.play()
        setIsPlaying(true)
        setIsMuted(true)
        
        // Auto unmute after 3 seconds
        setTimeout(() => {
          if (audioRef.current && isPlaying) {
            audioRef.current.muted = false
            setIsMuted(false)
            setHasInteracted(true)
          }
        }, 3000)
        
        return true
        
      } catch (mutedError) {
        return false
      }
    }
  }

  // Enhanced autoplay attempt
  useEffect(() => {
    // Try multiple times with different delays
    const tryAutoplay = async () => {
      const success = await attemptAutoplay()
      if (!success && !hasInteracted) {
        setupInteractionListeners()
      }
    }

    // Immediate attempt
    tryAutoplay()
    
    // Additional attempts
    setTimeout(tryAutoplay, 500)
    setTimeout(tryAutoplay, 1000)
    setTimeout(tryAutoplay, 2000)
    setTimeout(tryAutoplay, 5000)
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


  // Setup interaction listeners for autoplay
  const setupInteractionListeners = () => {
    const handleFirstInteraction = async () => {
      setHasInteracted(true)
      setShowNotification(false)
      
      if (audioRef.current) {
        try {
          audioRef.current.volume = volume
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log('Error playing audio:', error)
        }
      }
    }

    // Multiple event types for maximum coverage
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove', 'mouseenter', 'focus', 'blur', 'resize']
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true })
    })

    // Also try on window focus
    window.addEventListener('focus', handleFirstInteraction, { once: true })
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction)
      })
      window.removeEventListener('focus', handleFirstInteraction)
    }
  }

  // Enhanced interaction handling
  useEffect(() => {
    if (!hasInteracted) {
      setupInteractionListeners()
    }
  }, [hasInteracted, volume])

  // Set initial audio properties
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
      audioRef.current.muted = false
      
      // Additional autoplay attempt when audio loads
      audioRef.current.addEventListener('canplaythrough', () => {
        if (!hasInteracted) {
          attemptAutoplay()
        }
      })
    }
  }, [volume, hasInteracted])

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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }



  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Invisible Autoplay Trigger */}
          {!isPlaying && !hasInteracted && (
            <div className="fixed inset-0 z-40 pointer-events-none">
              <button
                onClick={() => {
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
            muted={false}
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
            {/* Main audio source - Sample MP3 */}
            <source src="/audio/sample.mp3" type="audio/mpeg" />
            
            
            Your browser does not support the audio element.
          </audio>
        </>
      )}
    </AnimatePresence>
  )
}
