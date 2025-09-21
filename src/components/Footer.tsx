import { motion } from 'framer-motion'
import { Calendar, Heart, MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { config, loading } = useApp()
  const { language, t } = useLanguage()

  if (loading || !config) {
    return <div className="py-20 bg-gray-800"></div>
  }

  const mainEvent = config.wedding.events[0]
  const weddingDate = new Date(config.wedding.date)

  return (
    <footer id="footer-section" className="bg-gradient-to-b from-rose-100 to-rose-200 text-gray-800 py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-rose-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500 fill-rose-500" />
            </motion.div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-great-vibes mb-6 text-gray-800">
            {config.couple.bride.name} & {config.couple.groom.name}
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-gold mx-auto mb-8"></div>
          
          <p className="text-sm sm:text-base font-merriweather text-gray-700 mb-8 sm:mb-12 max-w-sm sm:max-w-md mx-auto leading-relaxed">
            {t('footer.thankYou')}
          </p>

          <div className="space-y-6 sm:space-y-8 max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-12">
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-rose-200">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-great-vibes mb-4 text-gray-800">{t('footer.socialMedia')}</h3>
                <div className="space-y-3">
                  <motion.a
                    href={`https://instagram.com/${config.socialMedia.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors bg-rose-50 rounded-xl py-2 px-4"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="font-lora">{config.socialMedia.instagram}</span>
                  </motion.a>
                  <motion.a
                    href={`https://facebook.com/${config.socialMedia.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 rounded-xl py-2 px-4"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="font-lora">Facebook</span>
                  </motion.a>
                </div>
              </div>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-rose-200">
                <div className="w-12 h-12 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-great-vibes mb-4 text-gray-800">{t('footer.eventLocation')}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span className="font-lora text-gray-700 font-semibold">{mainEvent.venue}</span>
                  </div>
                  <p className="font-merriweather text-sm text-gray-600 leading-relaxed">
                    {mainEvent.address}
                  </p>
                  <motion.a
                    href={mainEvent.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center space-x-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-lora transition-colors mt-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{t('footer.viewMaps')}</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-rose-200">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-great-vibes mb-4 text-gray-800">{t('footer.eventDate')}</h3>
                <div className="space-y-2">
                  <p className="font-lora text-gray-700 font-semibold">
                    {weddingDate.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="font-merriweather text-sm text-gray-600">
                    {mainEvent.time} - {mainEvent.endTime} WITA
                  </p>
                  <div className="bg-rose-50 rounded-xl p-3 mt-3">
                    <p className="text-rose-600 font-lora text-sm">
                      {t('footer.saveDate')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-rose-200 max-w-4xl mx-auto mb-12"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <blockquote className="text-lg md:text-xl font-merriweather italic text-gray-700 leading-relaxed mb-4">
                "{t('footer.quote')}"
              </blockquote>
              <cite className="text-gold font-lora font-semibold text-lg">
                — {t('footer.quoteSource')}
              </cite>
            </div>
          </motion.div>

          {/* Copyright */}
          <div className="border-t border-rose-300/50 pt-8">
            <p className="text-gray-600 font-lora text-sm text-center">
              © {weddingDate.getFullYear()} {config.couple.bride.name} & {config.couple.groom.name}
            </p>
            <p className="text-gray-500 font-merriweather text-xs mt-2 text-center">
              {t('footer.copyright')}
            </p>
            
            {/* Final decorative elements */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="w-12 h-px bg-rose-400"></div>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <div className="w-12 h-px bg-rose-400"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
