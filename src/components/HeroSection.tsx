import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { useApp } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

// Hero background images with positioning
const heroImages = [
  { 
    src: '/images/holager-bride.jpg',
    position: 'center center'
  },
  { 
    src: '/images/holager-groom.jpg',
    position: 'center center'
  },
  { 
    src: '/images/whatsapp-1.jpg',
    position: 'center center'
  },
  { 
    src: '/images/whatsapp-2.jpg',
    position: 'center center'
  },
  { 
    src: '/images/whatsapp-3.jpg',
    position: 'center center'
  }
]

export default function HeroSection() {
  const { config, loading } = useApp()
  const { t, language } = useLanguage()
  
  // === GUEST NAME FROM QUERY PARAMS ===
  // Mengambil nama tamu dari query parameter 'name'
  const [guestName, setGuestName] = useState<string>('Tamu Undangan')
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const nameParam = urlParams.get('name')
    if (nameParam) {
      setGuestName(decodeURIComponent(nameParam))
    }
  }, [])
  
  // === PAGINATOR STATE MANAGEMENT ===
  // State untuk mengatur gambar yang sedang ditampilkan (0-based index)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // === TOUCH/SWIPE GESTURE STATE ===
  // State untuk menyimpan posisi awal dan akhir touch pada layar
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum jarak swipe yang diperlukan untuk memicu navigasi (dalam pixel)
  const minSwipeDistance = 50

  // === AUTO SLIDESHOW FUNCTIONALITY ===
  // Mengatur pergantian gambar otomatis setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length  // Loop kembali ke gambar pertama setelah gambar terakhir
      )
    }, 5000) // Interval 5000ms = 5 detik

    // Cleanup function untuk membersihkan interval saat component unmount
    return () => clearInterval(interval)
  }, [])

  // === MANUAL NAVIGATION FUNCTIONS ===
  // Fungsi untuk navigasi ke gambar berikutnya
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % heroImages.length  // Menggunakan modulo untuk loop ke gambar pertama
    )
  }

  // Fungsi untuk navigasi ke gambar sebelumnya
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1  // Jika di gambar pertama, pindah ke gambar terakhir
    )
  }

  // === TOUCH/SWIPE GESTURE HANDLERS ===
  // Handler untuk saat user mulai menyentuh layar (touch start)
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)  // Reset posisi akhir touch
    setTouchStart(e.targetTouches[0].clientX)  // Simpan posisi X awal touch
  }

  // Handler untuk saat user menggerakkan jari di layar (touch move)
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)  // Update posisi X akhir touch
  }

  // Handler untuk saat user mengangkat jari dari layar (touch end)
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return  // Pastikan kedua posisi touch tersedia
    
    // Hitung jarak dan arah swipe
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance    // Swipe ke kiri = gambar berikutnya
    const isRightSwipe = distance < -minSwipeDistance  // Swipe ke kanan = gambar sebelumnya

    // Panggil fungsi navigasi sesuai arah swipe
    if (isLeftSwipe) {
      nextImage()  // Swipe kiri = gambar berikutnya
    } else if (isRightSwipe) {
      prevImage()  // Swipe kanan = gambar sebelumnya
    }
  }

  // === KEYBOARD NAVIGATION ===
  // Event listener untuk navigasi menggunakan tombol keyboard
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage()  // Tombol panah kiri = gambar sebelumnya
      } else if (e.key === 'ArrowRight') {
        nextImage()  // Tombol panah kanan = gambar berikutnya
      }
    }

    // Tambahkan event listener ke window
    window.addEventListener('keydown', handleKeyPress)
    
    // Cleanup function untuk menghapus event listener saat component unmount
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (loading || !config) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-rose-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-rose-600 font-merriweather">{t('common.loading')}</p>
        </div>
      </section>
    )
  }


  return (
    <section 
      id="hero-section" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Images Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex].src}
            alt={`${config.couple.bride.name} & ${config.couple.groom.name} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: heroImages[currentImageIndex].position,
              minHeight: '100vh',
              minWidth: '100%'
            }}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          />
        </AnimatePresence>
        
        {/* Minimal overlay to preserve photo visibility */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>

        {/* === NAVIGATION ARROWS (PAGINATOR CONTROLS) === */}
        <div className="absolute inset-0 z-20 group">
          {/* Tombol navigasi ke gambar sebelumnya (kiri) */}
          {/* <motion.button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 shadow-lg opacity-70 hover:opacity-100"
            whileHover={{ scale: 1.1, x: -2 }}  // Animasi hover: scale up dan geser ke kiri
            whileTap={{ scale: 0.9 }}           // Animasi tap: scale down
            aria-label="Previous image"
          >
            <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 text-white rotate-90" />
          </motion.button> */}

          {/* Tombol navigasi ke gambar berikutnya (kanan) */}
          {/* <motion.button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 shadow-lg opacity-70 hover:opacity-100"
            whileHover={{ scale: 1.1, x: 2 }}   // Animasi hover: scale up dan geser ke kanan
            whileTap={{ scale: 0.9 }}           // Animasi tap: scale down
            aria-label="Next image"
          >
            <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 text-white -rotate-90" />
          </motion.button> */}
        </div>

       
      </div>

      {/* Gradient Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/20 z-5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-5"></div>

      {/* Content - Elegant Centered Wedding Invitation */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        
        {/* Main Content Container */}
        <div className="text-center space-y-8 max-w-lg mx-auto">
          
       

          {/* Wedding Invitation Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-white/60 flex-1 max-w-16"></div>
              <h2 className="text-white font-lora text-sm tracking-[0.3em] uppercase">
                {t('wedding.invitation')}
              </h2>
              <div className="h-px bg-white/60 flex-1 max-w-16"></div>
            </div>
          </motion.div>

          {/* Invitation Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-white/90 font-lora text-sm tracking-wide">
              {t('wedding.subtitle')}
            </p>
          </motion.div>

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <h1 className="text-white font-great-vibes text-4xl md:text-5xl lg:text-6xl font-light tracking-wider">
              {config?.couple?.bride?.name || 'Bride'}
              <br />
               &
               <br />
               {config?.couple?.groom?.name || 'Groom'}
            </h1>
          </motion.div>

          {/* Wedding Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="inline-block bg-white/20 rounded-full px-4 py-1 text-amber-200 font-lora text-xs tracking-widest uppercase shadow-sm border border-white/10 mb-1">
                {language === 'id' ? 'Simpan Tanggal' : 'Save The Date'}
              </span>
              <p className="text-white font-lora text-2xl md:text-3xl font-semibold tracking-wider drop-shadow-lg">
                {config?.wedding?.date
                  ? new Date(config.wedding.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : (language === 'id' ? 'Tanggal belum ditentukan' : 'Date to be determined')}
              </p>
            </div>
          </motion.div>

          {/* Invitation Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl px-8 py-8 border border-white/20 shadow-2xl max-w-md mx-auto">
              <div className="space-y-6">
                {/* Recipient */}
                <div className="space-y-2">
                  <p className="text-white/90 font-lora text-sm">
                    {t('wedding.to')}
                  </p>
                  <h3 className="text-white font-lora text-lg font-semibold capitalize">
                    {guestName}
                  </h3>
                </div>

                {/* Disclaimer */}
                <p className="text-white/60 font-lora text-xs leading-relaxed">
                  {t('wedding.disclaimer')}
                </p>

                {/* Open Invitation Button */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-lora font-medium px-8 py-3 rounded-xl shadow-xl hover:shadow-amber-500/25 transition-all duration-300 border-0 w-full"
                  onClick={() => {
                    const element = document.getElementById('couple-profile')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-lg">📧</span>
                    <span>{t('wedding.open')}</span>
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
          
        </div>
        
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white"
        >
          <span className="text-xs font-lora mb-2 tracking-wider">{t('common.scroll')}</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}