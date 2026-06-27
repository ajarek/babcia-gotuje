"use client"

import React, { useState } from "react"
import { useRestaurant } from "@/context/RestaurantContext"
import {
  X,
  Trash2,
  ShoppingBag,
  MapPin,
  Phone,
  MessageSquare,
  ClipboardCheck,
} from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
  onOpenAuth: () => void
}

export default function CartSheet({
  isOpen,
  onClose,
  onOpenAuth,
}: CartSheetProps) {
  const { cart, updateQuantity, removeFromCart, createOrder, user } =
    useRestaurant()
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0,
  )

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!address.trim()) {
      setError("Proszę podać adres dostawy!")
      return
    }
    if (!phone.trim()) {
      setError("Proszę podać numer telefonu do kontaktu!")
      return
    }

    setLoading(true)
    try {
      const orderId = await createOrder(address, phone, notes)
      setSuccessOrderId(orderId)
      // Reset form
      setAddress("")
      setPhone("")
      setNotes("")
    } catch (err: any) {
      console.error(err)
      setError(
        "Ojej, nie udało się złożyć zamówienia. Spróbuj ponownie lub zadzwoń do nas!",
      )
    } finally {
      setLoading(false)
    }
  }

  const closeAndReset = () => {
    setSuccessOrderId(null)
    setError("")
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm'>
      <div className='absolute inset-0' onClick={closeAndReset} />

      <div className='absolute inset-y-0 right-0 max-w-full pl-10 flex'>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className='w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col h-full border-l border-amber-900/10 text-[#2D241E]'
          id='cart-sheet-container'
        >
          {/* Header */}
          <div className='px-6 py-5 bg-[#FAF6F0] border-b border-amber-900/10 flex items-center justify-between'>
            <div className='flex items-center gap-2.5'>
              <ShoppingBag className='text-[#78350F]' size={22} />
              <h2 className='font-serif text-2xl font-bold text-[#4A2E1A]'>
                Twój Koszyk
              </h2>
            </div>
            <button
              onClick={closeAndReset}
              className='p-2 text-amber-950/60 hover:bg-amber-900/10 rounded-full transition'
            >
              <X size={20} />
            </button>
          </div>

          {/* Content Area */}
          <div className='flex-1 overflow-y-auto p-6 space-y-6'>
            {successOrderId ? (
              <div className='text-center py-12 px-4 flex flex-col items-center justify-center h-full'>
                <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 border border-emerald-200'>
                  <ClipboardCheck size={32} />
                </div>
                <h3 className='font-serif text-2xl font-bold text-emerald-950'>
                  Dziękujemy za zamówienie!
                </h3>
                <p className='text-sm text-amber-950/80 mt-3 max-w-xs leading-relaxed'>
                  Twoje zamówienie zostało pomyślnie złożone w naszej kuchni.
                  Babcia już stoi przy garach!
                </p>
                <div className='p-3.5 bg-amber-100/50 border border-amber-900/10 rounded-xl my-6 text-sm text-[#4A2E1A] font-mono select-all'>
                  ID Zamówienia: {successOrderId}
                </div>
                {!user && (
                  <p className='text-xs text-amber-950/60 mb-6 max-w-xs'>
                    Złożyłeś zamówienie jako Gość.{" "}
                    <button
                      onClick={() => {
                        closeAndReset()
                        onOpenAuth()
                      }}
                      className='text-[#78350F] font-semibold underline hover:text-[#5C230A]'
                    >
                      Zarejestruj się
                    </button>
                    , aby śledzić status swoich zamówień i zbierać punkty!
                  </p>
                )}
                <button
                  onClick={closeAndReset}
                  className='px-6 py-3 bg-[#78350F] hover:bg-[#5C230A] text-white font-semibold rounded-xl shadow-md transition w-full'
                >
                  Smacznego! Zamknij koszyk
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className='text-center py-16 flex flex-col items-center justify-center h-full'>
                <ShoppingBag className='text-amber-900/20 mb-4' size={64} />
                <h3 className='font-serif text-lg font-bold text-amber-950/80'>
                  Twój koszyk jest pusty
                </h3>
                <p className='text-sm text-amber-950/60 mt-1 max-w-xs'>
                  Ojej, nic nie wybrałeś! Dodaj jakieś pyszności z menu Babci,
                  na pewno jesteś głodny.
                </p>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className='space-y-4'>
                  <h3 className='text-xs font-bold text-amber-900/60 uppercase tracking-widest'>
                    Wybrane pyszności
                  </h3>
                  <div className='divide-y divide-amber-900/10'>
                    {cart.map(({ item, quantity }) => (
                      <div key={item.id} className='py-3 flex gap-3.5'>
                        <Image
                          width={64}
                          height={64}
                          src={item.image}
                          alt={item.name}
                          className='w-16 h-16 object-cover rounded-lg bg-amber-900/5'
                        />
                        <div className='flex-1'>
                          <div className='flex justify-between font-medium'>
                            <h4 className='text-[#4A2E1A] font-medium text-sm leading-snug'>
                              {item.name}
                            </h4>
                            <span className='text-sm text-[#78350F] font-bold'>
                              {item.price * quantity} zł
                            </span>
                          </div>
                          <p className='text-xs text-amber-950/60 mt-0.5'>
                            {item.price} zł / szt.
                          </p>

                          <div className='flex items-center justify-between mt-2'>
                            {/* Quantity buttons */}
                            <div className='flex items-center border border-amber-900/10 rounded-lg overflow-hidden bg-white shadow-sm'>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, quantity - 1)
                                }
                                className='px-2 py-1 text-xs text-amber-950/60 hover:bg-amber-900/5 font-bold'
                              >
                                -
                              </button>
                              <span className='px-3 py-1 text-xs font-semibold'>
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, quantity + 1)
                                }
                                className='px-2 py-1 text-xs text-amber-950/60 hover:bg-amber-900/5 font-bold'
                              >
                                +
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className='text-red-600/80 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition'
                              title='Usuń pozycję'
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery and Contact Form */}
                <form
                  onSubmit={handleOrderSubmit}
                  className='space-y-4 pt-4 border-t border-amber-900/10'
                >
                  <h3 className='text-xs font-bold text-amber-900/60 uppercase tracking-widest'>
                    Szczegóły dostawy
                  </h3>

                  {error && (
                    <div className='p-3 text-xs text-red-800 bg-red-50 rounded-lg border border-red-200'>
                      {error}
                    </div>
                  )}

                  <div className='space-y-3'>
                    <div>
                      <label className=' text-xs font-medium text-amber-900/80 mb-1 flex items-center gap-1.5'>
                        <MapPin size={14} className='text-[#78350F]' />
                        Adres dostawy <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='np. ul. Kwiatowa 5 m. 12, Warszawa'
                        className='w-full px-3 py-2 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-sm transition'
                      />
                    </div>

                    <div>
                      <label className='text-xs font-medium text-amber-900/80 mb-1 flex items-center gap-1.5'>
                        <Phone size={14} className='text-[#78350F]' />
                        Numer telefonu <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='tel'
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='np. 501 202 303'
                        className='w-full px-3 py-2 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-sm transition'
                      />
                    </div>

                    <div>
                      <label className='text-xs font-medium text-amber-900/80 mb-1 flex items-center gap-1.5'>
                        <MessageSquare size={14} className='text-[#78350F]' />
                        Uwagi dla kuchni / kierowcy
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder='np. proszę bez sztućców, domofon nie działa'
                        className='w-full px-3 py-2 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-sm transition h-16 resize-none'
                      />
                    </div>
                  </div>

                  {/* Summary & Place Order */}
                  <div className='pt-4 border-t border-amber-900/10 space-y-3'>
                    <div className='flex justify-between text-amber-950/80 text-sm'>
                      <span>Dostawa:</span>
                      <span className='font-semibold text-emerald-700'>
                        Darmowa dostawa!
                      </span>
                    </div>
                    <div className='flex justify-between text-base font-bold text-[#4A2E1A] pt-1'>
                      <span>Razem:</span>
                      <span className='font-serif text-lg'>
                        {totalPrice} zł
                      </span>
                    </div>

                    <button
                      type='submit'
                      disabled={loading}
                      className='w-full py-3.5 mt-2 bg-[#78350F] hover:bg-[#5C230A] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50'
                    >
                      {loading ? (
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      ) : (
                        <>
                          <ShoppingBag size={18} />
                          <span>Zamawiam i płacę przy odbiorze</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
