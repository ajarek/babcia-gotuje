"use client"

import React, { useState } from "react"
import { Calendar, Award } from "lucide-react"
import { motion } from "motion/react"

interface HeroProps {
  onOpenReservation: () => void
}

export default function Hero({ onOpenReservation }: HeroProps) {
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

  const toggleAudio = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const nextMuted = !videoElement.muted
    videoElement.muted = nextMuted
    videoElement.volume = 1
    setIsMuted(nextMuted)

    videoElement.play().catch(() => {
      // Ignore autoplay restrictions; the user interaction is already present.
    })
  }

  React.useEffect(() => {
    if (!hasPlayedOnce && videoRef.current) {
      videoRef.current
        .play()
        .catch(() => {
          // autoplay may be blocked if sound is enabled before user interaction
        })
    }
  }, [hasPlayedOnce])

  return (
    <section className='relative bg-[#FAF6F0] overflow-hidden text-[#2D241E] py-16 lg:py-24 border-b border-amber-900/10 font-sans'>
      {/* Visual background accents */}
      <div className='absolute top-0 right-0 w-1/3 h-full bg-[#EFE9DF] rounded-l-[120px] -z-10 hidden lg:block' />
      <div className='absolute top-1/4 left-10 w-24 h-24 bg-amber-200/20 blur-2xl rounded-full -z-10' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
          {/* Left Text Column */}
          <div className='lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left'>
            {/* Tiny brand badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#78350F]/10 border border-[#78350F]/20 text-[#78350F] rounded-full text-xs font-bold uppercase tracking-wider'
            >
              <Award size={14} />
              <span>Gwarancja Tradycji i Smaku</span>
            </motion.div>

            {/* Display Headings */}
            <div className='space-y-4'>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#4A2E1A] leading-[1.1] tracking-tight'
              >
                Prawdziwy Smak Domu <br />u{" "}
                <span className='text-[#78350F]'>Babci Marysi</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='text-base sm:text-lg text-amber-950/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed'
              >
                Odkryj magię polskiej gościnności. Nasze pierogi są lepione
                ręcznie o świcie, żurek gotuje się na prawdziwym, 5-dniowym
                zakwasie razowym, a chrupiący schabowy smażony jest wyłącznie na
                złocistym smalcu. Zjedz u nas obiad, a poczujesz się, jakbyś
                wrócił do najpiękniejszych lat dzieciństwa.
              </motion.p>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2'
            >
              <a
                href='#karta-menu'
                className='w-full sm:w-auto px-8 py-4 bg-[#78350F] hover:bg-[#5C230A] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2'
              >
                <span>Przeglądaj Menu i Zamów</span>
              </a>

              <button
                onClick={onOpenReservation}
                className='w-full sm:w-auto px-8 py-4 bg-white hover:bg-amber-100/25 text-[#78350F] border-2 border-[#78350F]/20 font-bold rounded-2xl transition-all duration-300 text-center flex items-center justify-center gap-2'
              >
                <Calendar size={18} />
                <span>Zarezerwuj Stolik</span>
              </button>
            </motion.div>

            {/* Feature lists */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='grid grid-cols-3 gap-4 pt-6 border-t border-amber-900/10 max-w-lg mx-auto lg:mx-0'
            >
              <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                <span className='text-xl sm:text-2xl font-bold font-serif text-[#78350F]'>
                  100%
                </span>
                <span className='text-xs text-amber-950/60 font-semibold mt-1'>
                  Ręczna robota o świcie
                </span>
              </div>
              <div className='flex flex-col items-center lg:items-start text-center lg:text-left border-x border-amber-900/10 px-4'>
                <span className='text-xl sm:text-2xl font-bold font-serif text-[#78350F]'>
                  Eko
                </span>
                <span className='text-xs text-amber-950/60 font-semibold mt-1'>
                  Składniki z polskiej wsi
                </span>
              </div>
              <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                <span className='text-xl sm:text-2xl font-bold font-serif text-[#78350F]'>
                  Zero
                </span>
                <span className='text-xs text-amber-950/60 font-semibold mt-1'>
                  Chemii i sztucznych dodatków
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Image Illustration Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 20 }}
            className='lg:col-span-5 flex justify-center'
          >
            <div className='relative w-full max-w-[420px] aspect-square rounded-[40px] overflow-hidden shadow-2xl border-4 border-white rotate-2 bg-[#78350F]/5'>
              <video
                ref={videoRef}
                src='/hero.mp4'
                autoPlay={!hasPlayedOnce}
                muted={isMuted}
                playsInline
                preload='auto'
                className='w-full h-full object-cover'
                onCanPlay={() => setIsReady(true)}
                onEnded={() => setHasPlayedOnce(true)}
              />

              {!isReady && (
                <div className='absolute inset-0 bg-[#78350F]/20' />
              )}

              <button
                type='button'
                onClick={toggleAudio}
                className='absolute top-4 right-4 z-20 rounded-full bg-white/90 border border-amber-900/15 px-4 py-2 text-xs font-semibold text-amber-950 shadow-sm hover:bg-white'
              >
                {isMuted ? "Włącz dźwięk" : "Wyłącz dźwięk"}
              </button>

              <div className='absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-amber-900/10 shadow-lg flex items-center gap-3'>
                <div className='w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl'>
                  ❤️
                </div>
                <div>
                  <h4 className='font-serif font-bold text-[#4A2E1A] text-sm'>
                    Z miłości do tradycji
                  </h4>
                  <p className='text-xs text-amber-950/75 leading-tight mt-0.5'>
                    U nas zjesz tak, jak gotowała Twoja kochana babcia.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
