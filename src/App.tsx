import BackgroundMusic from './components/BackgroundMusic'
import BottomNavigation from './components/BottomNavigation'
import CoupleProfile from './components/CoupleProfile'
import EventSchedule from './components/EventSchedule'
import Footer from './components/Footer'
import GallerySection from './components/GallerySection'
import GiftInfo from './components/GiftInfo'
import HeroSection from './components/HeroSection'
import InvitationText from './components/InvitationText'
import LanguageToggle from './components/LanguageToggle'
import { AppProvider } from './context/AppContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'

function AppContent() {
  const { setLanguage } = useLanguage()
  
  return (
    <div className="min-h-screen bg-white">
      <LanguageToggle onLanguageChange={setLanguage} />
      <InvitationText />
      <HeroSection />

      <CoupleProfile />
      <GallerySection />
      {/* <LoveQuoteSection /> */}
      <EventSchedule />
      {/* <RSVPSection /> */}
      {/* <WishesSection /> */}
      <GiftInfo />
      <Footer />
      <BottomNavigation />
      <BackgroundMusic />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AppProvider>
  )
}

export default App