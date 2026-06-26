'use client';

import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { ShoppingBag, User as UserIcon, LogOut, ShieldCheck, CalendarRange, ListCollapse, BookOpenText } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  showAdminPanel: boolean;
  setShowAdminPanel: (show: boolean) => void;
}

export default function Navbar({ 
  onOpenAuth, 
  onOpenCart, 
  onOpenReservation, 
  showAdminPanel, 
  setShowAdminPanel 
}: NavbarProps) {
  const { user, userRole, cart, logout, reservations, orders } = useRestaurant();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-amber-900/10 text-[#2D241E] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👵</span>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#4A2E1A] leading-tight group-hover:text-[#78350F] transition-colors">
                  Babcia Gotuje
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-900/60 font-bold">Prawdziwy Smak Domu</span>
              </div>
            </a>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-amber-950/80">
            <a href="#karta-menu" className="hover:text-[#78350F] transition-colors">Karta Menu</a>
            <button onClick={onOpenReservation} className="hover:text-[#78350F] transition-colors">Rezerwacja Stolika</button>
            <a href="#nasza-historia" className="hover:text-[#78350F] transition-colors">Nasza Historia</a>
            {user && userRole === 'admin' && (
              <button 
                onClick={() => {
                  setShowAdminPanel(!showAdminPanel);
                  // Scroll to admin panel
                  setTimeout(() => {
                    const el = document.getElementById('admin-panel-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  showAdminPanel 
                    ? 'bg-[#78350F] text-white' 
                    : 'bg-amber-100 text-[#78350F] hover:bg-amber-200'
                }`}
              >
                <ShieldCheck size={14} />
                <span>Panel Admina</span>
              </button>
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Quick booking button */}
            <button
              onClick={onOpenReservation}
              className="hidden lg:flex items-center gap-1.5 px-4.5 py-2 bg-transparent hover:bg-amber-900/5 text-[#78350F] border border-amber-900/20 rounded-xl text-xs font-bold transition"
            >
              <CalendarRange size={15} />
              <span>Zarezerwuj Stolik</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-amber-950 hover:bg-amber-900/5 rounded-full transition group"
              id="navbar-cart-btn"
              aria-label="Koszyk"
            >
              <ShoppingBag size={22} className="group-hover:scale-105 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 bg-red-600 border-2 border-[#FAF6F0] text-[10px] font-extrabold text-white rounded-full flex items-center justify-center px-1">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Auth Dropdown or trigger */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 hover:bg-amber-900/5 rounded-xl transition"
                    aria-label="Konto użytkownika"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#78350F] text-white flex items-center justify-center font-bold text-sm border-2 border-amber-900/10">
                      {user.displayName ? user.displayName[0].toUpperCase() : 'K'}
                    </div>
                    <span className="hidden sm:inline text-xs font-bold text-[#4A2E1A] max-w-[80px] truncate">
                      {user.displayName || 'Konto'}
                    </span>
                  </button>

                  {/* Dropdown Box */}
                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-amber-900/10 py-2.5 z-20 text-[#2D241E]">
                        <div className="px-4 py-2 border-b border-amber-900/5 mb-2">
                          <p className="text-xs text-amber-950/50 uppercase tracking-widest font-bold">Witaj, wnuczku!</p>
                          <p className="text-sm font-bold text-[#4A2E1A] truncate mt-0.5">{user.displayName || 'Klient'}</p>
                          <p className="text-[11px] text-amber-950/60 truncate">{user.email}</p>
                        </div>

                        {/* Order stats */}
                        <div className="px-4 py-1.5 text-xs text-amber-950/80 space-y-1 bg-amber-500/5 py-2 mb-2">
                          <div className="flex justify-between">
                            <span>Aktywne zamówienia:</span>
                            <span className="font-bold text-[#78350F]">{orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Twoje rezerwacje:</span>
                            <span className="font-bold text-[#78350F]">{reservations.filter(r => r.status === 'confirmed' || r.status === 'pending').length}</span>
                          </div>
                        </div>

                        {userRole === 'admin' && (
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              setShowAdminPanel(!showAdminPanel);
                              setTimeout(() => {
                                const el = document.getElementById('admin-panel-section');
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-semibold text-[#78350F] hover:bg-amber-500/5 transition flex items-center gap-2"
                          >
                            <ShieldCheck size={14} />
                            <span>{showAdminPanel ? 'Ukryj Panel Admina' : 'Otwórz Panel Admina'}</span>
                          </button>
                        )}

                        <button
                          onClick={async () => {
                            setDropdownOpen(false);
                            await logout();
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                        >
                          <LogOut size={14} />
                          <span>Wyloguj się</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-4.5 py-2 bg-[#78350F] hover:bg-[#5C230A] text-white rounded-xl text-xs font-bold shadow-md transition"
                >
                  <UserIcon size={14} />
                  <span>Zaloguj się</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
