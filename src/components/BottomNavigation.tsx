import { AnimatePresence, motion } from 'framer-motion'
import {
  Calendar,
  Camera,
  Gift,
  Heart,
  Home
} from 'lucide-react'
import { useEffect, useState } from 'react'

const navigationItems = [
  {
    id: 'hero',
    label: 'Home',
    icon: Home,
    targetId: 'hero-section'
  },
  {
    id: 'couple',
    label: 'Pasangan',
    icon: Heart,
    targetId: 'couple-profile'
  },
  {
    id: 'gallery',
    label: 'Galeri',
    icon: Camera,
    targetId: 'gallery-section'
  },
  {
    id: 'event',
    label: 'Acara',
    icon: Calendar,
    targetId: 'event-schedule'
  },
  // {
  //   id: 'rsvp',
  //   label: 'RSVP',
  //   icon: Users,
  //   targetId: 'rsvp-section'
  // },
  {
    id: 'gift',
    label: 'Hadiah',
    icon: Gift,
    targetId: 'gift-section'
  }
]

export default function BottomNavigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 200)

      // Find active section based on scroll position
      const sections = navigationItems.map(item => {
        const element = document.getElementById(item.targetId)
        if (!element) return null
        
        const rect = element.getBoundingClientRect()
        // More accurate detection with different thresholds
        const threshold = window.innerHeight * 0.3 // 30% of viewport
        const isInView = rect.top <= threshold && rect.bottom >= threshold
        
        return isInView ? item.id : null
      }).filter(Boolean)

      if (sections.length > 0) {
        setActiveSection(sections[0] as string)
      } else {
        // Fallback: check which section is closest to top
        let closestSection = navigationItems[0].id
        let closestDistance = Infinity
        
        navigationItems.forEach(item => {
          const element = document.getElementById(item.targetId)
          if (element) {
            const rect = element.getBoundingClientRect()
            const distance = Math.abs(rect.top)
            if (distance < closestDistance) {
              closestDistance = distance
              closestSection = item.id
            }
          }
        })
        
        setActiveSection(closestSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (targetId: string, sectionId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      // Different offset for different sections
      let offset = 0
      
      // Adjust offset based on section
      if (targetId === 'hero-section') {
        offset = 0
      } else {
        offset = 20 // Small offset for other sections
      }
      
      const elementPosition = element.offsetTop - offset
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      
      setActiveSection(sectionId)
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="flex justify-center px-2 sm:px-4 py-2 sm:py-3">
          <div className="bg-white/95 backdrop-blur-lg border border-rose-200 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-sm">
            {/* Top gradient line */}
            <div className="h-1 bg-gradient-to-r from-rose-400 via-gold to-rose-400 rounded-t-2xl sm:rounded-t-3xl"></div>
            
            <div className="px-3 py-3 sm:px-4 sm:py-4">
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.targetId, item.id)}
                    className={`
                      relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 min-h-[56px] sm:min-h-[64px] w-full
                      ${isActive 
                        ? 'bg-gradient-to-r from-rose-400 to-rose-600 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600 hover:scale-105 active:scale-95'
                      }
                    `}
                  >
                    {/* Active background indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 rounded-2xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <Icon 
                        className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-1.5 ${isActive ? 'text-white' : 'text-current'}`} 
                      />
                      <span className={`text-xs sm:text-sm font-lora font-medium text-center leading-tight ${isActive ? 'text-white' : 'text-current'}`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
                      />
                    )}
                  </button>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}