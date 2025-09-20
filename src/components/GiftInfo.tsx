import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Copy, Check, CreditCard, Building, Heart } from 'lucide-react'
import { Button } from './ui/button'
import { useApp } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export default function GiftInfo() {
  const { config, loading } = useApp()
  const { t } = useLanguage()
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const copyToClipboard = async (text: string, accountId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(accountId)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (loading || !config) {
    return <div className="py-20 bg-ivory"></div>
  }

  return (
    <section id="gift-section" className="py-20 bg-gradient-to-b from-ivory to-rose-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-rose-300/20 rounded-full blur-2xl"></div>
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
            {t('gift.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-gold mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 font-merriweather max-w-sm sm:max-w-md mx-auto">
            {t('gift.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-sm sm:max-w-md mx-auto">
          {/* Gift Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-600 font-lora text-lg">
              {t('gift.forCouple')}
            </p>
          </motion.div>

          {/* Bank Accounts */}
          <div className="space-y-6 sm:space-y-8">
            {config.gift.bankAccounts.map((account, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + (index * 0.2) }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-2xl border border-rose-100 transition-all duration-300"
                >
                  {/* Bank Header */}
                  <div className="text-center mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                        account.bank.toLowerCase().includes('bca') 
                          ? 'bg-blue-600' 
                          : account.bank.toLowerCase().includes('mandiri')
                          ? 'bg-yellow-500'
                          : 'bg-green-600'
                      }`}
                    >
                      {account.bank.toLowerCase().includes('bca') ? (
                        <Building className="w-8 h-8 text-white" />
                      ) : account.bank.toLowerCase().includes('mandiri') ? (
                        <CreditCard className="w-8 h-8 text-white" />
                      ) : (
                        <Building className="w-8 h-8 text-white" />
                      )}
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-lora font-semibold text-gray-800 mb-2">
                      {account.bank}
                    </h3>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-4">
                    {/* Account Number */}
                    <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-2xl p-4 border border-rose-200">
                      <label className="text-gray-600 font-lora text-sm mb-2 block">
                        {t('gift.accountNumber')}
                      </label>
                      <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-mono font-bold text-gray-800 tracking-wider">
                          {account.accountNumber}
                        </span>
                        <motion.button
                          onClick={() => copyToClipboard(account.accountNumber, `${index}-number`)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="ml-3 p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
                        >
                          {copiedAccount === `${index}-number` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Account Name */}
                    <div className="bg-gradient-to-r from-gold/20 to-yellow-200/30 rounded-2xl p-4 border border-gold/30">
                      <label className="text-gray-600 font-lora text-sm mb-2 block">
                        {t('gift.accountName')}
                      </label>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-lora font-semibold text-gray-800">
                          {account.accountName}
                        </span>
                        <motion.button
                          onClick={() => copyToClipboard(account.accountName, `${index}-name`)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="ml-3 p-2 bg-gold hover:bg-yellow-600 text-white rounded-lg transition-colors"
                        >
                          {copiedAccount === `${index}-name` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Copy All Button */}
                  <motion.div
                    className="mt-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => copyToClipboard(
                        `${account.bank}\nNo. Rek: ${account.accountNumber}\nA.n: ${account.accountName}`,
                        `${index}-all`
                      )}
                      className="w-full bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-lora py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {copiedAccount === `${index}-all` ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Check className="w-4 h-4" />
                          <span>{t('gift.copied')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Copy className="w-4 h-4" />
                          <span>{t('gift.copyAll')}</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-3 h-3 bg-rose-300 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-rose-100 to-rose-50 rounded-3xl p-8 shadow-lg border border-rose-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-great-vibes text-gray-800 mb-4">
                {t('gift.thankYou')}
              </h3>
              <p className="text-gray-700 font-merriweather leading-relaxed">
                {t('gift.thankYouMessage')}
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span className="font-lora text-rose-600">{t('gift.withLove')}</span>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
