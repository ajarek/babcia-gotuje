'use client';

import React, { useState } from 'react';
import { RestaurantProvider, useRestaurant } from '@/context/RestaurantContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import OurHistory from '@/components/OurHistory';
import BabciaChat from '@/components/BabciaChat';
import AuthModal from '@/components/AuthModal';
import CartSheet from '@/components/CartSheet';
import ReservationModal from '@/components/ReservationModal';
import AdminDashboard from '@/components/AdminDashboard';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  ArrowRight, 
  Award, 
  Sparkles, 
  ShieldAlert,
  Instagram,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Main content wrapping context
function MainAppContent() {
  const { user, userRole } = useRestaurant();
  
  // Modals Toggles
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Testimonials list
  const testimonials = [
    {
      name: 'Maciej Nowak',
      role: 'Krytyk Kulinarny',
      text: 'Żurek podawany w chlebie to absolutne arcydzieło. Kwaskowaty, aromatyczny, z idealną wędzoną nutą boczku. Poczułem się, jak na niedzielnym obiedzie u mojej prababci na wsi. Gorąco polecam!',
      rating: 5,
      avatar: '👨‍🍳'
    },
    {
      name: 'Katarzyna Zielińska',
      role: 'Stała klientka',
      text: 'Pierogi ruskie Babci Marysi to po prostu niebo w gębie. Cienkie, sprężyste ciasto i idealnie doprawiony farsz. Kupuję je regularnie również na wynos na święta. Moje dzieci je uwielbiają!',
      rating: 5,
      avatar: '👩'
    },
    {
      name: 'Janusz Kowalski',
      role: 'Sąsiad i smakołyk',
      text: 'Kotlet schabowy wielkości talerza, wysmażony na złoty kolor na prawdziwym smalcu. Ziemniaczki świeże z koperkiem i chrupiąca kapustka zasmażana. Nie jadłem lepszego schabowego w całej Warszawie.',
      rating: 5,
      avatar: '👴'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2D241E] selection:bg-[#78350F] selection:text-white flex flex-col justify-between">
      
      {/* Navigation */}
      <Navbar 
        onOpenAuth={() => setAuthOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenReservation={() => setReservationOpen(true)}
        showAdminPanel={showAdminPanel}
        setShowAdminPanel={setShowAdminPanel}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* Welcome Hero */}
        <Hero onOpenReservation={() => setReservationOpen(true)} />

        {/* Menu Grid Section */}
        <MenuSection onOpenCart={() => setCartOpen(true)} />

        {/* Cozy Brand History */}
        <OurHistory />

        {/* Testimonials */}
        <section className="py-20 bg-[#FAF6F0] text-[#2D241E] border-b border-amber-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#78350F]">CO MÓWIĄ NASI GOŚCIE</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A2E1A] mt-2 leading-tight">Ciepłe Słowa Znad Talerza</h2>
              <p className="text-sm text-amber-950/70 mt-3 leading-relaxed">
                Największą nagrodą za naszą ciężką pracę są uśmiechnięte twarze gości i puste talerze wracające do zmywaka. Oto kilka opinii.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-2xl border border-amber-900/5 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 text-amber-500 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-amber-950/80 leading-relaxed italic">
                      &bdquo;{t.text}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-amber-900/5">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-lg shadow-inner">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#4A2E1A]">{t.name}</h4>
                      <p className="text-[10px] text-amber-950/50 uppercase tracking-wider font-semibold">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditionally Render Admin Panel if active & verified admin */}
        {user && userRole === 'admin' && showAdminPanel && (
          <section id="admin-panel-section" className="py-20 bg-[#FAF6F0] border-b border-amber-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AdminDashboard />
            </div>
          </section>
        )}

        {/* Interactive map / Footer Info Row */}
        <section className="py-16 bg-[#EFE9DF] text-[#2D241E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              
              {/* Address */}
              <div className="bg-white p-6 rounded-2xl border border-amber-900/5 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-amber-100 text-[#78350F] rounded-xl flex items-center justify-center mx-auto md:mx-0">
                  <MapPin size={20} />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#4A2E1A]">Gdzie jesteśmy?</h4>
                <p className="text-sm text-amber-950/85">
                  ul. Wiejska 12 <br />
                  00-480 Warszawa
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#78350F] hover:underline"
                >
                  <span>Wskazówki dojazdu</span>
                  <ArrowRight size={12} />
                </a>
              </div>

              {/* Hours */}
              <div className="bg-white p-6 rounded-2xl border border-amber-900/5 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-amber-100 text-[#78350F] rounded-xl flex items-center justify-center mx-auto md:mx-0">
                  <Clock size={20} />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#4A2E1A]">Godziny otwarcia</h4>
                <p className="text-sm text-amber-950/85 space-y-1">
                  <span>Poniedziałek - Piątek: 12:00 - 22:00</span> <br />
                  <span>Sobota - Niedziela: 11:00 - 23:00</span>
                </p>
                <span className="text-[10px] text-amber-900/50 uppercase tracking-widest font-extrabold">Kuchnia przyjmuje do 21:30</span>
              </div>

              {/* Contact */}
              <div className="bg-white p-6 rounded-2xl border border-amber-900/5 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-amber-100 text-[#78350F] rounded-xl flex items-center justify-center mx-auto md:mx-0">
                  <Phone size={20} />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#4A2E1A]">Skontaktuj się</h4>
                <p className="text-sm text-amber-950/85">
                  Telefon: <span className="font-bold">+48 501 202 303</span> <br />
                  E-mail: kontakt@babciagotuje.pl
                </p>
                <div className="flex justify-center md:justify-start gap-3 pt-1">
                  <a href="#" className="p-1.5 hover:bg-amber-900/5 rounded-lg text-[#78350F] transition" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="p-1.5 hover:bg-amber-900/5 rounded-lg text-[#78350F] transition" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer copyright */}
      <footer className="bg-[#4A2E1A] text-amber-100/60 py-8 border-t border-amber-950 text-center text-xs font-semibold tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p>© {new Date().getFullYear()} Babcia Gotuje. Wszystkie prawa zastrzeżone.</p>
          <p className="text-[10px] opacity-65">Smaczna i prawdziwa kuchnia polska serwowana prosto z serca Babci Marysi.</p>
        </div>
      </footer>

      {/* Floating AI Chat Assistant */}
      <BabciaChat />

      {/* Slide-out/Modals Overlay Drawer list */}
      <AnimatePresence>
        {authOpen && (
          <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartSheet 
            isOpen={cartOpen} 
            onClose={() => setCartOpen(false)} 
            onOpenAuth={() => setAuthOpen(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reservationOpen && (
          <ReservationModal 
            isOpen={reservationOpen} 
            onClose={() => setReservationOpen(false)} 
            onOpenAuth={() => setAuthOpen(true)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Wrap page in Context Provider
export default function HomePage() {
  return (
    <RestaurantProvider>
      <MainAppContent />
    </RestaurantProvider>
  );
}
