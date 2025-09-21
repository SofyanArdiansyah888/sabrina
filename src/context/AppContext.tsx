import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
interface WeddingConfig {
  couple: {
    bride: {
      name: string
      fullName: string
      nickname: string
      parents: { father: string; mother: string }
      photo: string
      description: string
    }
    groom: {
      name: string
      fullName: string
      nickname: string
      parents: { father: string; mother: string }
      photo: string
      description: string
    }
  }
  wedding: {
    date: string
    time: string
    events: Array<{
      name: string
      date: string
      time: string
      endTime: string
      venue: string
      address: string
      mapLink: string
    }>
  }
  invitation: {
    openingText: string
    quote: string
    quoteSource: string
  }
  gallery: string[]
  gift: {
    bankAccounts: Array<{
      bank: string
      accountNumber: string
      accountName: string
    }>
  }
  socialMedia: {
    instagram: string
    facebook: string
  }
}

interface RSVPData {
  name: string
  attendance: 'yes' | 'no'
  guestCount: number
  message?: string
}

interface WishData {
  id: string
  name: string
  message: string
  timestamp: Date
}

interface AppContextType {
  config: WeddingConfig | null
  loading: boolean
  rsvpList: RSVPData[]
  wishes: WishData[]
  addRSVP: (rsvp: RSVPData) => void
  addWish: (wish: Omit<WishData, 'id' | 'timestamp'>) => void
  getWeddingDate: () => Date | null
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<WeddingConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [rsvpList, setRsvpList] = useState<RSVPData[]>([])
  const [wishes, setWishes] = useState<WishData[]>([
    {
      id: '1',
      name: 'Keluarga Besar',
      message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
      timestamp: new Date('2024-01-15')
    },
    {
      id: '2', 
      name: 'Teman Kuliah',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fi khair. Selamat ya!',
      timestamp: new Date('2024-01-16')
    }
  ])

  // Load config from public/config.json
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/config.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setConfig(data)
      } catch (error) {
        console.error('Error loading config:', error)
        // Set a fallback config to prevent app from breaking
        setConfig({
          couple: {
            bride: {
              name: "Riang Sabrina",
              fullName: "Riang Sabrina, S.Tr.Akun",
              nickname: "Riang",
              parents: { father: "H.Suhama", mother: "Hj. Nurmiati Norma" },
              photo: "/images/holager-bride.jpg",
              description: "Putri ke tujuh dari Bapak H.Suhama dan Ibu Hj. Nurmiati Norma"
            },
            groom: {
              name: "Yudha Arfan",
              fullName: "Yudha Arfan Putra Pratama Septianto, S.S.T.Pel",
              nickname: "Yudha",
              parents: { father: "Muhammad Hasby, S.T.", mother: "Irianti" },
              photo: "/images/holager-groom.jpg",
              description: "Putra pertama dari Bapak Muhammad Hasby, S.T. dan Ibu Irianti"
            }
          },
          wedding: {
            date: "2025-10-18",
            time: "10:30",
            events: [
              {
                name: "Akad Nikah",
                date: "2025-10-18",
                time: "10:30",
                endTime: "Selesai",
                venue: "Runtono Restaurant",
                address: "Jl. G. Bawakaraeng No. 90 Makassar",
                mapLink: "https://maps.app.goo.gl/TbFKr6oZbKR5BXVe8"
              }
            ]
          },
          invitation: {
            openingText: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami:",
            quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
            quoteSource: "QS. Ar-Rum: 21"
          },
          gallery: [
            "/images/whatsapp-1.jpg",
            "/images/whatsapp-2.jpg",
            "/images/whatsapp-3.jpg",
            "/images/whatsapp-4.jpg",
            "/images/whatsapp-5.jpg"
          ],
          gift: {
            bankAccounts: [
              {
                bank: "Bank BCA",
                accountNumber: "1100421182",
                accountName: "Riang Sabrina"
              }
            ]
          },
          socialMedia: {
            instagram: "@riangdanyudha",
            facebook: "Riang & Yudha Wedding"
          }
        })
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  const addRSVP = (rsvp: RSVPData) => {
    setRsvpList(prev => [...prev, rsvp])
  }

  const addWish = (wish: Omit<WishData, 'id' | 'timestamp'>) => {
    const newWish: WishData = {
      ...wish,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setWishes(prev => [newWish, ...prev])
  }

  const getWeddingDate = (): Date | null => {
    if (!config) return null
    return new Date(`${config.wedding.date}T${config.wedding.time}:00`)
  }

  const value: AppContextType = {
    config,
    loading,
    rsvpList,
    wishes,
    addRSVP,
    addWish,
    getWeddingDate
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext
