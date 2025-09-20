import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'
import CountdownTimer from './CountdownTimer'

export default function EventSchedule() {
  const { config, loading } = useApp()
  const { language, t } = useLanguage()

  if (loading || !config) {
    return <div className="py-20 bg-white"></div>
  }

  return (
    <section id="event-schedule" className="py-20 bg-gradient-to-b from-white to-rose-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-rose-300/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-great-vibes text-gray-800 mb-4">
            {t('schedule.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-gold mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 font-merriweather max-w-sm sm:max-w-md mx-auto">
            {t('schedule.subtitle')}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <CountdownTimer />
        </motion.div>

        {/* Event Cards */}
        <div className="max-w-sm sm:max-w-md mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {config.wedding.events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + (index * 0.2) }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-2xl border border-rose-100 transition-all duration-300"
                >
                  {/* Event Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto ${
                      index === 0 
                        ? 'bg-gradient-to-r from-rose-400 to-rose-600' 
                        : 'bg-gradient-to-r from-gold to-yellow-500'
                    }`}
                  >
                    {index === 0 ? (
                      <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    ) : (
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    )}
                  </motion.div>

                  {/* Event Name */}
                  <h3 className="text-xl sm:text-2xl font-great-vibes text-gray-800 mb-4 text-center">
                    {index === 0 ? t('schedule.ceremonyName') : t('schedule.receptionName')}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-3 sm:space-y-4">
                    {/* Date & Time */}
                    <div className="bg-rose-50 rounded-xl p-3 sm:p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                          <span className="font-lora text-gray-700 text-xs sm:text-sm text-center">
                            {new Date(event.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                        <span className="font-lora text-gray-700 text-xs sm:text-sm">
                          {event.time} - {t('schedule.endTime')} {t('common.timezone')}
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="bg-white rounded-xl p-3 sm:p-4 border border-rose-100">
                      <div className="text-center mb-3">
                        <h4 className="font-lora font-semibold text-gray-800 text-sm sm:text-base mb-2">
                          {event.venue}
                        </h4>
                        <div className="flex items-start justify-center space-x-1 sm:space-x-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 font-merriweather text-xs leading-relaxed">
                            {event.address}
                          </p>
                        </div>
                      </div>

                      {/* Map Button */}
                      <motion.a
                        href={event.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-lora px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                      >
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{t('schedule.viewLocation')}</span>
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-3 h-3 bg-rose-300 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Save the Date */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-rose-400 to-gold p-8 rounded-3xl text-white max-w-2xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-great-vibes mb-4">{t('schedule.saveDate')}</h3>
            <p className="font-lora text-lg mb-4">
              {new Date(config.wedding.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="font-merriweather text-sm opacity-90">
              {t('schedule.saveDateMessage')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
