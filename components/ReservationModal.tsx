"use client"

import React, { useState } from "react"
import { useRestaurant } from "@/context/RestaurantContext"
import {
  X,
  Calendar,
  Clock,
  Users,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react"
import { motion } from "motion/react"

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenAuth: () => void
}

const TIME_SLOTS = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
]

export default function ReservationModal({
  isOpen,
  onClose,
  onOpenAuth,
}: ReservationModalProps) {
  const { createReservation, user } = useRestaurant()
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!date) {
      setError("Proszę wybrać datę rezerwacji!")
      return
    }
    if (!time) {
      setError("Proszę wybrać godzinę rezerwacji!")
      return
    }
    if (!phone) {
      setError("Proszę podać numer telefonu!")
      return
    }

    setLoading(true)
    try {
      await createReservation(date, time, guests, phone, notes)
      setSuccess(true)
      // Reset form
      setDate("")
      setTime("")
      setGuests(2)
      setPhone("")
      setNotes("")
    } catch (err: any) {
      console.error(err)
      setError(
        "Przepraszamy, nie udało się zapisać rezerwacji. Spróbuj zadzwonić bezpośrednio do lokalu!",
      )
    } finally {
      setLoading(false)
    }
  }

  const closeAndReset = () => {
    setSuccess(false)
    setError("")
    onClose()
  }

  // Get today's date formatted as YYYY-MM-DD for min date limit
  const todayStr = new Date().toISOString().split("T")[0]

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className='relative w-full max-w-lg overflow-hidden bg-[#FAF6F0] rounded-2xl shadow-2xl border border-amber-900/10 text-[#2D241E]'
        id='reservation-modal-card'
      >
        <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700' />

        <button
          onClick={closeAndReset}
          className='absolute top-4 right-4 p-2 text-amber-900/60 transition-colors rounded-full hover:bg-amber-900/10'
          aria-label='Zamknij'
        >
          <X size={20} />
        </button>

        <div className='p-8 pt-10'>
          {success ? (
            <div className='text-center py-8 flex flex-col items-center justify-center'>
              <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 border border-emerald-200'>
                <CheckCircle size={32} />
              </div>
              <h3 className='font-serif text-3xl font-bold text-emerald-950'>
                Stolik zarezerwowany!
              </h3>
              <p className='text-sm text-amber-950/80 mt-3 max-w-sm leading-relaxed'>
                Rezerwacja została pomyślnie zapisana. Przygotowujemy dla Was
                najprzytulniejszy kącik w naszej karczmie!
              </p>
              <p className='text-xs text-amber-950/60 mt-1 max-w-sm'>
                Skontaktujemy się telefonicznie w przypadku dodatkowych pytań.
              </p>
              {!user && (
                <p className='text-xs text-[#78350F] font-semibold mt-4'>
                  Zarezerwowałeś jako Gość.{" "}
                  <button
                    onClick={() => {
                      closeAndReset()
                      onOpenAuth()
                    }}
                    className='underline hover:text-[#5C230A]'
                  >
                    Załóż konto
                  </button>
                  , aby zbierać darmowe desery przy kolejnych rezerwacjach!
                </p>
              )}
              <button
                onClick={closeAndReset}
                className='px-6 py-3 mt-8 bg-[#78350F] hover:bg-[#5C230A] text-white font-semibold rounded-xl shadow-md transition w-full max-w-xs'
              >
                Super, dziękuję!
              </button>
            </div>
          ) : (
            <>
              <div className='text-center mb-6'>
                <h3 className='font-serif text-3xl font-bold tracking-tight text-[#4A2E1A]'>
                  Zarezerwuj Stolik
                </h3>
                <p className='text-sm text-amber-950/70 mt-1.5'>
                  Zjedz u nas obiad, kolację lub zorganizuj rodzinne przyjęcie u
                  Babci.
                </p>
              </div>

              {error && (
                <div className='p-3 mb-4 text-xs text-red-800 bg-red-50 rounded-lg border border-red-200'>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Date */}
                  <div>
                    <label className=' text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1 flex items-center gap-1.5'>
                      <Calendar size={14} className='text-[#78350F]' />
                      Data rezerwacji <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='date'
                      required
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className='w-full px-3.5 py-2.5 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-sm transition'
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className=' text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1 flex items-center gap-1.5'>
                      <Users size={14} className='text-[#78350F]' />
                      Liczba gości <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className='w-full px-3.5 py-2.5 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-sm transition'
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osób"}
                        </option>
                      ))}
                      <option value='12'>Grupa (10-15 osób)</option>
                      <option value='20'>Większa grupa (15+ osób)</option>
                    </select>
                  </div>
                </div>

                {/* Time Selection Slots */}
                <div>
                  <label className=' text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5'>
                    <Clock size={14} className='text-[#78350F]' />
                    Godzina spotkania <span className='text-red-500'>*</span>
                  </label>
                  <div className='grid grid-cols-5 gap-2'>
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type='button'
                        onClick={() => setTime(t)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition ${
                          time === t
                            ? "bg-[#78350F] text-white border-[#78350F] shadow-sm"
                            : "bg-white text-amber-950/80 border-amber-900/15 hover:bg-amber-100/20"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Phone */}
                <div>
                  <label className=' text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1 flex items-center gap-1.5'>
                    <Phone size={14} className='text-[#78350F]' />
                    Numer telefonu <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='tel'
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='np. 505 101 202'
                    className='w-full px-3.5 py-2.5 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-sm transition'
                  />
                </div>

                {/* Special Notes */}
                <div>
                  <label className=' text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1 flex items-center gap-1.5'>
                    <MessageSquare size={14} className='text-[#78350F]' />
                    Życzenia specjalne / Uwagi
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder='np. potrzebujemy fotelik dla dziecka, stolik przy oknie, uroczystość urodzinowa'
                    className='w-full px-3.5 py-2.5 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-sm transition h-20 resize-none'
                  />
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full py-3.5 mt-4 bg-[#78350F] hover:bg-[#5C230A] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50'
                >
                  {loading ? (
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  ) : (
                    <span>Potwierdź rezerwację stolika</span>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
