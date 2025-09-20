import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Heart, User, Users, MessageSquare, Check, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useApp } from '../context/AppContext'

interface RSVPFormData {
  name: string
  attendance: 'yes' | 'no'
  guestCount: number
  message?: string
}

export default function RSVPSection() {
  const { addRSVP } = useApp()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<RSVPFormData>({
    defaultValues: {
      attendance: 'yes',
      guestCount: 1
    }
  })

  const watchAttendance = watch('attendance')

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    addRSVP(data)
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      reset()
    }, 3000)
  }

  return (
    <section id="rsvp-section" className="py-20 bg-gradient-to-b from-ivory to-rose-50 relative overflow-hidden">
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-great-vibes text-gray-800 mb-4">
            Konfirmasi Kehadiran
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-gold mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 font-merriweather max-w-sm sm:max-w-md mx-auto">
            Kehadiran Anda sangat berarti bagi kami. Mohon konfirmasi kehadiran Anda dengan mengisi form di bawah ini.
          </p>
        </motion.div>

        <div className="max-w-sm sm:max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-rose-100"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label className="flex items-center space-x-2 text-gray-700 font-lora font-semibold mb-3">
                      <User className="w-5 h-5 text-rose-500" />
                      <span>Nama Lengkap</span>
                    </label>
                    <Input
                      {...register('name', { 
                        required: 'Nama wajib diisi',
                        minLength: { value: 2, message: 'Nama minimal 2 karakter' }
                      })}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 font-merriweather"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 font-lora"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Attendance Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label className="flex items-center space-x-2 text-gray-700 font-lora font-semibold mb-3">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Konfirmasi Kehadiran</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                          ${watchAttendance === 'yes' 
                            ? 'border-rose-400 bg-rose-50 text-rose-700' 
                            : 'border-gray-200 hover:border-rose-300 text-gray-600'
                          }
                        `}
                      >
                        <input
                          {...register('attendance')}
                          type="radio"
                          value="yes"
                          className="sr-only"
                        />
                        <Check className="w-5 h-5 mr-2" />
                        <span className="font-lora font-semibold">Ya, Hadir</span>
                      </motion.label>

                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                          ${watchAttendance === 'no' 
                            ? 'border-red-400 bg-red-50 text-red-700' 
                            : 'border-gray-200 hover:border-red-300 text-gray-600'
                          }
                        `}
                      >
                        <input
                          {...register('attendance')}
                          type="radio"
                          value="no"
                          className="sr-only"
                        />
                        <X className="w-5 h-5 mr-2" />
                        <span className="font-lora font-semibold">Tidak Hadir</span>
                      </motion.label>
                    </div>
                  </motion.div>

                  {/* Guest Count Field - Only show if attending */}
                  <AnimatePresence>
                    {watchAttendance === 'yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="flex items-center space-x-2 text-gray-700 font-lora font-semibold mb-3">
                          <Users className="w-5 h-5 text-rose-500" />
                          <span>Jumlah Tamu</span>
                        </label>
                        <Input
                          {...register('guestCount', { 
                            required: watchAttendance === 'yes' ? 'Jumlah tamu wajib diisi' : false,
                            min: { value: 1, message: 'Minimal 1 tamu' },
                            max: { value: 5, message: 'Maksimal 5 tamu' }
                          })}
                          type="number"
                          min="1"
                          max="5"
                          placeholder="Masukkan jumlah tamu"
                          className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 font-merriweather"
                        />
                        {errors.guestCount && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 font-lora"
                          >
                            {errors.guestCount.message}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="flex items-center space-x-2 text-gray-700 font-lora font-semibold mb-3">
                      <MessageSquare className="w-5 h-5 text-rose-500" />
                      <span>Pesan (Opsional)</span>
                    </label>
                    <Textarea
                      {...register('message')}
                      placeholder="Tulis pesan atau ucapan untuk mempelai..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 font-merriweather resize-none"
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="pt-4"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-lora text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Mengirim...</span>
                        </div>
                      ) : (
                        'Kirim Konfirmasi'
                      )}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                
                <h3 className="text-2xl md:text-3xl font-great-vibes mb-4">
                  Terima Kasih!
                </h3>
                
                <p className="text-lg font-merriweather mb-2">
                  Konfirmasi kehadiran Anda telah berhasil dikirim.
                </p>
                
                <p className="font-lora opacity-90">
                  Kami sangat menantikan kehadiran Anda di hari bahagia kami!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}