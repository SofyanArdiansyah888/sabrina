import { motion } from 'framer-motion'
import { Clock, MapPin, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useLanguage } from '../context/LanguageContext'

export default function WeddingDetails() {
  const { t } = useLanguage()
  
  const ceremonyDetails = [
    {
      title: t('schedule.ceremonyName'),
      time: "09:00 WITA",
      location: "Masjid Al-Ikhlas, Jakarta",
      description: t('details.ceremonyDesc')
    },
    {
      title: t('schedule.receptionName'),
      time: "11:00 - 14:00 WITA",
      location: "Gedung Serbaguna, Jakarta",
      description: t('details.receptionDesc')
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-dancing text-gray-800 mb-4">
            {t('details.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 font-playfair max-w-2xl mx-auto">
            {t('details.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {ceremonyDetails.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200/50">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <CardTitle className="text-2xl font-dancing text-gray-800">
                        {detail.title}
                      </CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Clock className="w-5 h-5 text-pink-500" />
                      </motion.div>
                      <span className="text-gray-700 font-playfair">{detail.time}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <MapPin className="w-5 h-5 text-pink-500" />
                      </motion.div>
                      <span className="text-gray-700 font-playfair">{detail.location}</span>
                    </motion.div>
                    <motion.p 
                      className="text-gray-600 text-sm font-playfair italic"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {detail.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="max-w-lg mx-auto shadow-lg bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200/50">
              <CardContent className="p-8">
                <motion.div 
                  className="flex items-center justify-center space-x-3 mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Gift className="w-6 h-6 text-pink-500" />
                  </motion.div>
                  <h3 className="text-2xl font-dancing text-gray-800">{t('details.weddingGift')}</h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 font-playfair text-sm mb-6"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {t('details.giftMessage')}
                </motion.p>

                <div className="space-y-4">
                  <motion.div 
                    className="bg-white/60 rounded-lg p-4 border border-pink-200"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-lg font-dancing text-gray-800 mb-2">Bank BCA</h4>
                    <motion.p 
                      className="text-gray-700 font-playfair font-semibold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      1100421182
                    </motion.p>
                    <p className="text-gray-600 font-playfair text-sm">a.n. Riang Sabrina</p>
                  </motion.div>

                  
                </div>

                <motion.p 
                  className="text-gray-500 font-playfair text-xs mt-4 italic"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {t('details.thankYouPrayers')}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
