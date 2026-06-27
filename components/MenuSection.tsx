"use client"

import React, { useState } from "react"
import { useRestaurant, MenuItem } from "@/context/RestaurantContext"
import { Search, ShoppingCart, Leaf, Flame, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

export default function MenuSection() {
  const { menu, loadingMenu, addToCart } = useRestaurant()
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "soups" | "mains" | "desserts" | "drinks"
  >("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [onlyVegetarian, setOnlyVegetarian] = useState(false)
  const [justAddedId, setJustAddedId] = useState<string | null>(null)

  const categories = [
    { id: "all", name: "Wszystkie dania" },
    { id: "soups", name: "Zupy" },
    { id: "mains", name: "Dania główne" },
    { id: "desserts", name: "Słodkie desery" },
    { id: "drinks", name: "Napoje domowe" },
  ]

  // Filtering Logic
  const filteredMenu = menu.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesVeg = !onlyVegetarian || item.isVegetarian
    return matchesCategory && matchesSearch && matchesVeg
  })

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item)
    setJustAddedId(item.id)
    setTimeout(() => {
      setJustAddedId(null)
    }, 1500)
  }

  return (
    <section
      id='karta-menu'
      className='py-20 bg-[#FAF6F0] text-[#2D241E] border-b border-amber-900/10 font-sansScroll'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Title */}
        <div className='text-center max-w-2xl mx-auto mb-12'>
          <span className='text-xs font-bold uppercase tracking-widest text-[#78350F]'>
            Pachnąca Kartka
          </span>
          <h2 className='font-serif text-4xl sm:text-5xl font-extrabold text-[#4A2E1A] mt-2 leading-tight'>
            Nasze Specjały
          </h2>
          <p className='text-sm sm:text-base text-amber-950/70 mt-3 leading-relaxed'>
            Wszystkie dania przygotowujemy od podstaw na miejscu. Składniki
            kupujemy o świcie od zaprzyjaźnionych gospodarzy z Mazowsza i
            Podlasia.
          </p>
        </div>

        {/* Filter controls panel */}
        <div className='bg-[#EFE9DF] p-4 sm:p-6 rounded-2xl border border-amber-900/10 mb-10 space-y-4'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            {/* Category tabs */}
            <div className='flex gap-1.5 overflow-x-auto no-scrollbar pb-1'>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? "bg-[#78350F] text-white shadow-md"
                      : "bg-white/80 hover:bg-white text-amber-950 border border-amber-900/5"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className='relative min-w-[200px] md:w-72'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3.5 text-amber-950/40'>
                <Search size={16} />
              </span>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Wyszukaj danie...'
                className='w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-sm transition'
              />
            </div>
          </div>

          {/* Toggle buttons */}
          <div className='flex items-center justify-between border-t border-amber-900/5 pt-4'>
            <label className='flex items-center gap-2.5 cursor-pointer text-sm font-bold text-amber-950'>
              <input
                type='checkbox'
                checked={onlyVegetarian}
                onChange={(e) => setOnlyVegetarian(e.target.checked)}
                className='w-4.5 h-4.5 rounded text-amber-850 focus:ring-amber-600 accent-amber-800'
              />
              <span className='flex items-center gap-1'>
                <Leaf
                  size={14}
                  className='text-emerald-700 fill-emerald-700/10'
                />
                Dania wegetariańskie
              </span>
            </label>

            <span className='text-xs text-amber-950/60 font-semibold'>
              Pokazano:{" "}
              <span className='font-bold text-[#78350F]'>
                {filteredMenu.length}
              </span>{" "}
              dań
            </span>
          </div>
        </div>

        {/* Loading Spinner */}
        {loadingMenu ? (
          <div className='py-24 text-center flex flex-col items-center justify-center'>
            <div className='w-12 h-12 border-4 border-amber-900/10 border-t-[#78350F] rounded-full animate-spin' />
            <p className='text-sm text-amber-950/60 mt-4 font-semibold'>
              Babcia miesza w garach, ładujemy menu...
            </p>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div className='py-20 text-center bg-white/40 rounded-2xl border border-dashed border-amber-900/20'>
            <p className='text-base text-amber-950/60 font-semibold'>
              Ojej, nic nie znaleźliśmy o takich kryteriach. Spróbuj zmienić
              filtry lub wyszukiwanie!
            </p>
          </div>
        ) : (
          /* Cards Grid */
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <AnimatePresence>
              {filteredMenu.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item.id}
                  className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-amber-900/5 flex flex-col group'
                >
                  {/* Food Image */}
                  <div className='relative aspect-video overflow-hidden bg-amber-900/5'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />

                    {/* Bestseller/Vegetarian badges overlay */}
                    <div className='absolute top-3 left-3 flex flex-col gap-1.5 z-10'>
                      {item.isPopular && (
                        <span className='inline-flex items-center gap-1 px-2.5 py-1 bg-amber-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm'>
                          <Flame size={10} className='fill-white' />
                          <span>Bestseller</span>
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className='inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm'>
                          <Leaf size={10} className='fill-white' />
                          <span>Wege</span>
                        </span>
                      )}
                    </div>

                    {/* Price tag */}
                    <div className='absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl font-serif font-extrabold text-[#78350F] shadow-md border border-amber-900/5 text-base'>
                      {item.price} zł
                    </div>
                  </div>

                  {/* Details */}
                  <div className='p-6 flex-1 flex flex-col justify-between'>
                    <div>
                      <h3 className='font-serif text-lg sm:text-xl font-bold text-[#4A2E1A] line-clamp-1 group-hover:text-[#78350F] transition-colors'>
                        {item.name}
                      </h3>
                      <p className='text-xs sm:text-sm text-amber-950/70 mt-2 leading-relaxed line-clamp-3'>
                        {item.description}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className='mt-6 pt-4 border-t border-amber-900/5 flex items-center justify-between gap-4'>
                      <span className='text-[11px] font-bold text-amber-900/50 uppercase tracking-widest'>
                        Kat:{" "}
                        {categories.find((c) => c.id === item.category)?.name ||
                          item.category}
                      </span>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                          justAddedId === item.id
                            ? "bg-emerald-600 text-white shadow-emerald-600/10"
                            : "bg-[#78350F] hover:bg-[#5C230A] text-white"
                        }`}
                      >
                        <ShoppingCart size={14} />
                        <span>
                          {justAddedId === item.id ? "Dodano!" : "Do koszyka"}
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
