import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

// Gallery images from public assets
const galleryImages = [
  { id: 1, src: '/images/whatsapp-1.jpg', alt: 'Foto pre-wedding 1 - Riang & Yudha' },
  { id: 2, src: '/images/whatsapp-2.jpg', alt: 'Foto pre-wedding 2 - Riang & Yudha' },
  { id: 3, src: '/images/whatsapp-3.jpg', alt: 'Foto pre-wedding 3 - Riang & Yudha' },
  { id: 4, src: '/images/whatsapp-4.jpg', alt: 'Foto pre-wedding 4 - Riang & Yudha' },
  { id: 5, src: '/images/whatsapp-5.jpg', alt: 'Foto pre-wedding 5 - Riang & Yudha' },
  { id: 6, src: '/images/baru.jpg', alt: 'Foto pre-wedding 6 - Riang & Yudha' },
  { id: 7, src: '/images/baru2.jpg', alt: 'Foto pre-wedding 7 - Riang & Yudha' },
  { id: 8, src: '/images/baru3.jpg', alt: 'Foto pre-wedding 8 - Riang & Yudha' },
  { id: 9, src: '/images/baru4.jpg', alt: 'Foto pre-wedding 9 - Riang & Yudha' },
  { id: 10, src: '/images/baru5.jpg', alt: 'Foto pre-wedding 10 - Riang & Yudha' },
]

export default function GallerySection() {
  const { loading } = useApp()
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImage(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  if (loading) {
    return <div className="py-20 bg-rose-50"></div>
  }

  return (
    <section id="gallery-section" className="py-20 bg-gradient-to-b from-rose-50 to-ivory relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a66b' fill-opacity='0.03'%3E%3Cpath d='M40 10c16.569 0 30 13.431 30 30s-13.431 30-30 30-30-13.431-30-30 13.431-30 30-30zm0 5c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25z'/%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
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
            {t('gallery.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-gold mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 font-merriweather max-w-sm sm:max-w-md mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className={`
                relative overflow-hidden rounded-xl cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300
                ${index === 0 || index === 3 ? 'sm:col-span-2 sm:row-span-2' : ''}
              `}
              onClick={() => openModal(index)}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Image number badge */}
                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1} / {galleryImages.length}
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                  >
                    <ZoomIn className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-lora px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Lihat Semua Foto
          </motion.button>
        </motion.div> */}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative max-w-sm sm:max-w-md max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
              />
              
              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                <p className="text-sm font-lora text-center">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>
              
              {/* Close Button */}
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 backdrop-blur-sm transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
              
              {/* Navigation Buttons */}
              <motion.button
                onClick={prevImage}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={nextImage}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 backdrop-blur-sm transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}