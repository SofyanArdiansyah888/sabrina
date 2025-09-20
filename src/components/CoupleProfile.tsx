import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export default function CoupleProfile() {
  const { config, loading } = useApp()
  const { t } = useLanguage()

  if (loading || !config) {
    return <div className="py-20 bg-white"></div>
  }

  return (
    <section id="couple-profile" className="py-20 bg-gradient-to-b from-white to-rose-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-300/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-great-vibes text-gray-800 mb-4">
            {t('couple.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-gold mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 font-merriweather max-w-sm sm:max-w-md mx-auto">
            {t('couple.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-sm sm:max-w-md mx-auto">
          <div className="space-y-8 sm:space-y-12">
            {/* Bride Profile */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative inline-block mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img
                    src="/images/Holagerphoto-225 (1).jpg"
                    alt={config.couple.bride.fullName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 via-transparent to-transparent"></div>
                </motion.div>
                
                {/* Decorative elements around photo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-8 h-8 border-2 border-rose-300 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gold rounded-full"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-great-vibes text-rose-600 mb-2">
                {config.couple.bride.fullName}
              </h3>
              <p className="text-gray-600 font-lora mb-4">
                {t('couple.brideDesc')}
              </p>
              
              <div className="space-y-2 text-gray-700 font-merriweather">
                <p><span className="font-semibold">{t('couple.father')}</span> {config.couple.bride.parents.father}</p>
                <p><span className="font-semibold">{t('couple.mother')}</span> {config.couple.bride.parents.mother}</p>
              </div>
            </motion.div>

            {/* Center Heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center my-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-white rounded-full p-4 shadow-xl border-4 border-rose-200"
              >
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              </motion.div>
            </motion.div>

            {/* Groom Profile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative inline-block mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img
                    src="/images/Holagerphoto-32.jpg"
                    alt={config.couple.groom.fullName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                </motion.div>
                
                {/* Decorative elements around photo */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -left-4 w-8 h-8 border-2 border-blue-300 rounded-full"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -right-4 w-6 h-6 bg-gold rounded-full"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-great-vibes text-blue-600 mb-2">
                {config.couple.groom.fullName}
              </h3>
              <p className="text-gray-600 font-lora mb-4">
                {t('couple.groomDesc')}
              </p>
              
              <div className="space-y-2 text-gray-700 font-merriweather">
                <p><span className="font-semibold">{t('couple.father')}</span> {config.couple.groom.parents.father}</p>
                <p><span className="font-semibold">{t('couple.mother')}</span> {config.couple.groom.parents.mother}</p>
              </div>
            </motion.div>
          </div>

          {/* Social Media Links */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h4 className="text-xl font-lora text-gray-700 mb-6">{t('couple.follow')}</h4>
            <div className="flex justify-center space-x-6">
              <motion.a
                href={`https://instagram.com/${config.socialMedia.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-lora">{config.socialMedia.instagram}</span>
              </motion.a>
              
              <motion.a
                href={`https://facebook.com/${config.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
                <span className="font-lora">Facebook</span>
              </motion.a>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  )
}
