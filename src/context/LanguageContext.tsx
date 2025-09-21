import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'id' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation keys
const translations = {
  id: {
    // Hero Section
    'wedding.invitation': 'Undangan Pernikahan',
    'wedding.subtitle': 'Kami Mengundang Anda Untuk Merayakan Hari Pernikahan Kami',
    'wedding.date': 'Minggu, 12 Desember 2024',
    'wedding.to': 'Kepada Yth: Bpk/Ibu/Saudara/i',
    'wedding.guest': 'Tamu Undangan',
    'wedding.disclaimer': '*) Mohon Maaf Apabila Ada Kesalahan Penulisan Nama/Gelar',
    'wedding.open': 'Buka Undangan',
    
    // Couple Profile
    'couple.title': 'Mempelai',
    'couple.subtitle': 'Dua hati yang bersatu dalam ikatan suci pernikahan',
    'couple.father': 'Ayah:',
    'couple.mother': 'Ibu:',
    'couple.follow': 'Ikuti Perjalanan Kami',
    'couple.brideDesc': 'Putri ke tujuh dari  Alm. Drs. H. Syahruddin  dan  Hj. Nurmiati Norma',
    'couple.groomDesc': 'Putra pertama dari  Muhammad Hasby, S.T. dan  Irianti',
    
    // Event Schedule
    'schedule.title': 'Acara Pernikahan',
    'schedule.subtitle': 'Dengan penuh sukacita, kami mengundang Anda untuk berbagi kebahagiaan di hari istimewa kami',
    'schedule.saveDate': 'Save The Date',
    'schedule.saveDateMessage': 'Kehadiran Anda adalah kebahagiaan bagi kami',
    'schedule.viewLocation': 'Lihat Lokasi',
    'schedule.ceremonyName': 'Akad Nikah',
    'schedule.receptionName': 'Resepsi Pernikahan',
    'schedule.endTime': 'Selesai',
    
    // Wedding Details
    'details.title': 'Detail Acara',
    'details.subtitle': 'Berikut adalah detail acara pernikahan kami. Kami sangat berharap kehadiran Bapak/Ibu/Saudara/i dalam acara yang berbahagia ini.',
    'details.ceremony': 'Akad Nikah',
    'details.reception': 'Resepsi Pernikahan',
    'details.ceremonyDesc': 'Akad nikah akan dilaksanakan di Masjid Al-Ikhlas',
    'details.receptionDesc': 'Resepsi pernikahan dengan jamuan makan siang',
    'details.weddingGift': 'Hadiah Pernikahan',
    'details.giftMessage': 'Kehadiran Anda adalah hadiah terindah bagi kami. Jika ingin memberikan hadiah, dapat disampaikan pada hari H atau transfer ke rekening berikut:',
    'details.thankYouPrayers': 'Terima kasih atas doa dan restu yang telah diberikan 🙏',
    
    // Gallery
    'gallery.title': 'Galeri Foto',
    'gallery.subtitle': 'Momen-momen indah yang telah kami lalui bersama. Setiap foto menyimpan cerita dan kenangan berharga yang ingin kami bagikan dengan Anda.',
    'gallery.viewAll': 'Lihat Semua Foto',
    
    // Love Quote
    'loveQuote.title': 'Kata-Kata Cinta',
    
    // Gift Info
    'gift.title': 'Amplop Digital',
    'gift.subtitle': 'Bagi yang ingin memberikan hadiah, dapat mengirimkan melalui rekening di bawah ini',
    'gift.forCouple': 'Hadiah untuk mempelai',
    'gift.accountNumber': 'Nomor Rekening',
    'gift.accountName': 'Atas Nama',
    'gift.copyAll': 'Salin Semua',
    'gift.copied': 'Tersalin!',
    'gift.thankYou': 'Terima Kasih',
    'gift.thankYouMessage': 'Kehadiran Anda di hari bahagia kami sudah merupakan hadiah yang sangat berharga. Namun jika Anda ingin memberikan hadiah, kami sangat berterima kasih atas kebaikan hati Anda.',
    'gift.withLove': 'Dengan Cinta',
    
    // Footer
    'footer.thankYou': 'Terima kasih telah menjadi bagian dari perjalanan cinta kami. Kehadiran dan doa Anda adalah hadiah terindah yang kami terima.',
    'footer.socialMedia': 'Social Media',
    'footer.eventLocation': 'Lokasi Acara',
    'footer.eventDate': 'Tanggal Acara',
    'footer.viewMaps': 'Lihat Maps',
    'footer.saveDate': 'Save the Date',
    'footer.copyright': 'Dibuat dengan ❤️ untuk hari yang berbahagia',
    'footer.quote': 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.',
    'footer.quoteSource': 'QS. Ar-Rum: 21',
    
    // Navigation
    'nav.home': 'Beranda',
    'nav.profile': 'Profil',
    'nav.gallery': 'Galeri',
    'nav.schedule': 'Jadwal',
    'nav.gift': 'Hadiah',
    'nav.wishes': 'Ucapan',
    
    // Music
    'music.tooltip': 'Klik untuk musik',
    'music.playing': 'Musik: I want a grow old with you',
    
    // Countdown Timer
    'countdown.title': 'Menuju Hari Bahagia',
    'countdown.subtitle': 'Hitung mundur menuju momen yang paling ditunggu',
    'countdown.days': 'Hari',
    'countdown.hours': 'Jam',
    'countdown.minutes': 'Menit',
    'countdown.seconds': 'Detik',
    'countdown.message': 'Sampai jumpa di hari bahagia kami!',
    
    // Common
    'common.scroll': 'Scroll untuk melihat lebih lanjut',
    'common.loading': 'Memuat undangan...',
    'common.timezone': 'WIB',
  },
  en: {
    // Hero Section
    'wedding.invitation': 'Wedding Invitation',
    'wedding.subtitle': 'We Invite You To Celebrate Our Wedding',
    'wedding.date': 'Sunday, 12 December 2024',
    'wedding.to': 'To: Mr./Mrs./Brother/Sister',
    'wedding.guest': 'Wedding Guest',
    'wedding.disclaimer': '*) Please apologize if there are any errors in writing the Name/Title',
    'wedding.open': 'Open Invitation',
    
    // Couple Profile
    'couple.title': 'The Couple',
    'couple.subtitle': 'Two hearts united in the sacred bond of marriage',
    'couple.father': 'Father:',
    'couple.mother': 'Mother:',
    'couple.follow': 'Follow Our Journey',
    'couple.brideDesc': 'Seventh daughter of Mr. Alm. Drs. H. Syahruddin  and Mrs. Hj. Nurmiati Norma',
    'couple.groomDesc': 'First son of Mr. Muhammad Hasby, S.T. and Mrs. Irianti',
    
    // Event Schedule
    'schedule.title': 'Wedding Events',
    'schedule.subtitle': 'With great joy, we invite you to share our happiness on our special day',
    'schedule.saveDate': 'Save The Date',
    'schedule.saveDateMessage': 'Your presence is our joy',
    'schedule.viewLocation': 'View Location',
    'schedule.ceremonyName': 'Wedding Ceremony',
    'schedule.receptionName': 'Wedding Reception',
    'schedule.endTime': 'End',
    
    // Wedding Details
    'details.title': 'Event Details',
    'details.subtitle': 'Here are the details of our wedding ceremony. We sincerely hope for the presence of Mr./Mrs./Brother/Sister in this joyful event.',
    'details.ceremony': 'Wedding Ceremony',
    'details.reception': 'Wedding Reception',
    'details.ceremonyDesc': 'Wedding ceremony will be held at Al-Ikhlas Mosque',
    'details.receptionDesc': 'Wedding reception with lunch banquet',
    'details.weddingGift': 'Wedding Gift',
    'details.giftMessage': 'Your presence is the most beautiful gift for us. If you wish to give a gift, it can be delivered on the day or transferred to the following account:',
    'details.thankYouPrayers': 'Thank you for the prayers and blessings you have given 🙏',
    
    // Gallery
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Beautiful moments we have shared together. Each photo holds precious stories and memories we want to share with you.',
    'gallery.viewAll': 'View All Photos',
    
    // Love Quote
    'loveQuote.title': 'Words of Love',
    
    // Gift Info
    'gift.title': 'Digital Envelope',
    'gift.subtitle': 'For those who wish to give a gift, you can send it through the account below',
    'gift.forCouple': 'Gift for the couple',
    'gift.accountNumber': 'Account Number',
    'gift.accountName': 'Account Name',
    'gift.copyAll': 'Copy All',
    'gift.copied': 'Copied!',
    'gift.thankYou': 'Thank You',
    'gift.thankYouMessage': 'Your presence on our happy day is already the most precious gift we receive. However, if you want to give a gift, we are very grateful for your kindness.',
    'gift.withLove': 'With Love',
    
    // Footer
    'footer.thankYou': 'Thank you for being part of our love journey. Your presence and prayers are the most beautiful gifts we receive.',
    'footer.socialMedia': 'Social Media',
    'footer.eventLocation': 'Event Location',
    'footer.eventDate': 'Event Date',
    'footer.viewMaps': 'View Maps',
    'footer.saveDate': 'Save the Date',
    'footer.copyright': 'Made with ❤️ for a happy day',
    'footer.quote': 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.',
    'footer.quoteSource': 'Quran 30:21',
    
    // Navigation
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    'nav.gallery': 'Gallery',
    'nav.schedule': 'Schedule',
    'nav.gift': 'Gift',
    'nav.wishes': 'Wishes',
    
    // Music
    'music.tooltip': 'Click for music',
    'music.playing': 'Music: I want a grow old with you',
    
    // Countdown Timer
    'countdown.title': 'Towards Our Happy Day',
    'countdown.subtitle': 'Countdown to the most awaited moment',
    'countdown.days': 'Days',
    'countdown.hours': 'Hours',
    'countdown.minutes': 'Minutes',
    'countdown.seconds': 'Seconds',
    'countdown.message': 'See you on our happy day!',
    
    // Common
    'common.scroll': 'Scroll to see more',
    'common.loading': 'Loading invitation...',
    'common.timezone': 'WIB',
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('id')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
