import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const { config, getWeddingDate } = useApp()
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const weddingDate = getWeddingDate()
    if (!weddingDate) return

    const targetDate = weddingDate.getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [getWeddingDate])

  const timeUnits = [
    { label: t('countdown.days'), value: timeLeft.days, color: 'from-rose-400 to-rose-600', icon: Calendar },
    { label: t('countdown.hours'), value: timeLeft.hours, color: 'from-gold to-yellow-500', icon: Clock },
    { label: t('countdown.minutes'), value: timeLeft.minutes, color: 'from-rose-300 to-pink-500', icon: Heart },
    { label: t('countdown.seconds'), value: timeLeft.seconds, color: 'from-rose-500 to-red-500', icon: Heart }
  ]

  if (!config) return null

  return (
    <div className="max-w-sm sm:max-w-md mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-12"
      >
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 fill-rose-500" />
          </motion.div>
          <h3 className="text-xl sm:text-2xl font-great-vibes text-gray-800">
            {t('countdown.title')}
          </h3>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 fill-rose-500" />
          </motion.div>
        </div>
        <p className="text-gray-600 font-merriweather text-sm sm:text-base">
          {t('countdown.subtitle')}
        </p>
      </motion.div>

      {/* Countdown Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`bg-gradient-to-br ${unit.color} rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl hover:shadow-2xl border border-white/20 backdrop-blur-sm transition-all duration-300`}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <unit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/80 mx-auto" />
              </motion.div>

              {/* Number */}
              <motion.div
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg font-lora"
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.div>

              {/* Label */}
              <div className="text-white/90 font-lora text-xs sm:text-sm uppercase tracking-wider drop-shadow-lg">
                {unit.label}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-8 sm:mt-12"
      >
        <div className="bg-gradient-to-r from-rose-100 to-rose-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-rose-200">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
          </div>
          <p className="text-gray-700 font-merriweather text-sm sm:text-base">
            {t('countdown.message')}
          </p>
          <p className="text-rose-600 font-lora text-xs sm:text-sm mt-2">
            {config.couple.bride.name} & {config.couple.groom.name}
          </p>
        </div>
      </motion.div>
    </div>
  )
}