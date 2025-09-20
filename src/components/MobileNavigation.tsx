import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Heart, 
  Camera, 
  Calendar, 
  Users, 
  Gift
} from 'lucide-react'

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
  {
    id: 'rsvp',
    label: 'RSVP',
    icon: Users,
    targetId: 'rsvp-section'
  },
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
        const isInView = rect.top <= 150 && rect.bottom >= 150
        
        return isInView ? item.id : null
      }).filter(Boolean)

      if (sections.length > 0) {
        setActiveSection(sections[0] as string)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (targetId: string, sectionId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80
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
        <div className="bg-white/95 backdrop-blur-lg border-t border-rose-200 shadow-2xl lg:shadow-xl">
          {/* Top gradient line */}
          <div className="h-1 bg-gradient-to-r from-rose-400 via-gold to-rose-400"></div>
          
          <div className="px-4 py-3 max-w-sm mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <div className="grid grid-cols-6 gap-2 md:gap-6 lg:gap-8">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.targetId, item.id)}
                    className={`
                      relative flex flex-col items-center justify-center p-3 md:p-4 lg:p-5 rounded-xl transition-all duration-300 min-h-[64px] md:min-h-[76px] lg:min-h-[84px]
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
                        className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <Icon 
                        className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-1 md:mb-2 ${isActive ? 'text-white' : 'text-current'}`} 
                      />
                      <span className={`text-xs md:text-sm lg:text-base font-lora font-medium text-center leading-tight ${isActive ? 'text-white' : 'text-current'}`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}