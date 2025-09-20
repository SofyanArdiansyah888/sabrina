import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Heart, MessageSquare, User, Send, Quote } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useApp } from '../context/AppContext'

interface WishFormData {
  name: string
  message: string
}

export default function WishesSection() {
  const { wishes, addWish } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WishFormData>()

  const onSubmit = async (data: WishFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    addWish(data)
    reset()
    setIsSubmitting(false)
  }

  return (
    <section id="wishes-section" className="py-20 bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a66b' fill-opacity='0.03'%3E%3Cpath d='M50 20c16.569 0 30 13.431 30 30s-13.431 30-30 30-30-13.431-30-30 13.431-30 30-30zm0 5c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25z'/%3E%3C/g%3E%3C/svg%3E")`
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
            Ucapan & Doa
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-gold mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 font-merriweather max-w-sm sm:max-w-md mx-auto">
            Berikan ucapan dan doa terbaik untuk pasangan yang berbahagia
          </p>
        </motion.div>

        <div className="max-w-sm sm:max-w-md mx-auto">
          <div className="space-y-8 sm:space-y-12">
            {/* Wish Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-rose-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-great-vibes text-gray-800 mb-2">
                    Tulis Ucapan
                  </h3>
                  <p className="text-gray-600 font-lora">
                    Bagikan doa dan ucapan terbaik Anda
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="flex items-center space-x-2 text-gray-700 font-lora font-semibold mb-3">
                      <User className="w-5 h-5 text-rose-500" />
                      <span>Nama</span>
                    </label>
                    <Input
                      {...register('name', { 
                        required: 'Nama wajib diisi',
                        minLength: { value: 2, message: 'Nama minimal 2 karakter' }
                      })}
                      placeholder="Masukkan nama Anda"
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

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="flex items-center space-x-2 text-gray-700 font-lora font-semibold mb-3">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Ucapan & Doa</span>
                    </label>
                    <Textarea
                      {...register('message', { 
                        required: 'Ucapan wajib diisi',
                        minLength: { value: 10, message: 'Ucapan minimal 10 karakter' }
                      })}
                      placeholder="Tulis ucapan dan doa terbaik untuk mempelai..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 font-merriweather resize-none"
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 font-lora"
                      >
                        {errors.message.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-lora text-base px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Mengirim...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Send className="w-4 h-4" />
                          <span>Kirim Ucapan</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Wishes List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-rose-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-great-vibes text-gray-800 mb-2">
                    Ucapan dari Tamu
                  </h3>
                  <p className="text-gray-600 font-lora">
                    {wishes.length} ucapan telah diberikan
                  </p>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                  <AnimatePresence>
                    {wishes.map((wish, index) => (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-2xl p-4 border border-rose-200"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-lora font-semibold text-sm">
                              {wish.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-lora font-semibold text-gray-800">
                                {wish.name}
                              </h4>
                              <span className="text-xs text-gray-500 font-merriweather">
                                {wish.timestamp.toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700 font-merriweather text-sm leading-relaxed">
                              "{wish.message}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {wishes.length === 0 && (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-lora">
                        Belum ada ucapan. Jadilah yang pertama!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}
