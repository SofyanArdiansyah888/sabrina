import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useState } from 'react'

type Language = 'id' | 'en'

interface LanguageToggleProps {
  onLanguageChange: (lang: Language) => void
}

export default function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  const [currentLang, setCurrentLang] = useState<Language>('id')

  const toggleLanguage = () => {
    const newLang = currentLang === 'id' ? 'en' : 'id'
    setCurrentLang(newLang)
    onLanguageChange(newLang)
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-4 z-[9999] bg-black/80 backdrop-blur-md rounded-full p-3 border border-white/50 hover:bg-black/90 transition-all duration-300 shadow-2xl"
      title={`Switch to ${currentLang === 'id' ? 'English' : 'Bahasa Indonesia'}`}
    >
      <div className="flex items-center space-x-2 text-white">
        <Globe className="w-5 h-5" />
        <span className="text-base font-lora font-bold">
          {currentLang === 'id' ? 'ID' : 'EN'}
        </span>
      </div>
    </motion.button>
  )
}
