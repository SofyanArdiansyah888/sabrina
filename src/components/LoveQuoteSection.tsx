import { motion } from 'framer-motion'
import { Quote, Heart } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const loveQuotes = [
  {
    id: 1,
    text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    author: "Unknown"
  },
  {
    id: 2,
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou"
  },
  {
    id: 3,
    text: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn"
  }
]

export default function LoveQuoteSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-rose-300/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white rounded-full p-4 shadow-xl border-4 border-rose-200"
            >
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            </motion.div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-great-vibes text-gray-800 mb-4">
            {t('loveQuote.title') || 'Words of Love'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-gold mx-auto mb-6"></div>
        </motion.div>

        {/* Quote Cards */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {loveQuotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100">
                {/* Quote Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 left-8 bg-gradient-to-r from-rose-400 to-rose-600 rounded-full p-3 shadow-lg"
                >
                  <Quote className="w-6 h-6 text-white" />
                </motion.div>

                {/* Quote Text */}
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                  className="text-gray-700 font-merriweather text-lg sm:text-xl leading-relaxed mb-4 pt-4"
                >
                  "{quote.text}"
                </motion.blockquote>

                {/* Quote Author */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                  viewport={{ once: true }}
                  className="text-rose-600 font-lora text-right font-semibold italic"
                >
                  — {quote.author}
                </motion.p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-rose-200 rounded-full opacity-60"></div>
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gold/30 rounded-full opacity-60"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-4 text-rose-400">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-rose-400"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 bg-rose-400 rounded-full"
            />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-rose-400"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

