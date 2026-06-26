'use client';

import React from 'react';
import { Heart, Clock, UtensilsCrossed, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function OurHistory() {
  return (
    <section id="nasza-historia" className="py-20 bg-[#FAF6F0] text-[#2D241E] border-b border-amber-900/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Decorative Left Image Collage */}
          <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl border-4 border-white -rotate-3 bg-amber-950/5">
              <Image

                src="https://casa-porter.pl/wp-content/uploads/2023/07/BLEKITNY-DOM-NA-WYNAJEM-NA-PODLASIU-819x1024.jpg" 
                alt="Tradycyjna kuchnia wiejska" 
                fill
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Little stats box overlay */}
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur p-5 rounded-2xl border border-amber-900/10 shadow-lg text-center rotate-3 hidden sm:block">
                <span className="text-3xl font-bold font-serif text-[#78350F]">Od 1982</span>
                <p className="text-[10px] text-amber-950/60 uppercase tracking-widest font-bold mt-1">Tradycja Rodzinna</p>
              </div>
            </div>
          </div>

          {/* Right Text Story */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#78350F]">Serce Naszej Karczmy</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#4A2E1A] leading-tight">
                Historia Pisana <br />
                Smakiem i Sercem
              </h2>
            </div>

            <div className="text-sm sm:text-base text-amber-950/80 space-y-4 leading-relaxed text-justify">
              <p>
                Wszystko zaczęło się w małej wiosce na Podlasiu, gdzie nasza ukochana Babcia Marysia uczyła się sztuki 
                kulinarnej od swojej mamy i babci. To właśnie tam, przy kaflowym piecu, narodziła się miłość do smaków prostych, 
                szczerych i obfitych – takich, które jednoczą przy stole całą rodzinę.
              </p>
              <p>
                W 1982 roku Babcia otworzyła małe okienko z pierogami w Warszawie. Początkowo lepiła je sama po nocach, 
                by rano nakarmić spieszących do pracy studentów i urzędników. Zapach świeżo podsmażanej cebulki i aromatycznego 
                barszczu szybko przyciągnął rzesze warszawiaków spragnionych autentycznego, matczynego ciepła.
              </p>
              <p>
                Dziś „Babcia Gotuje” to nowoczesna restauracja hołdująca dawnym rzemieślniczym zasadom. Chociaż czasy 
                się zmieniły, my nigdy nie poszliśmy na skróty. Dalej lepiemy pierogi ręcznie, nie używamy półproduktów ani 
                polepszaczy smaku. Bo wiemy, że najzdrowsze i najpyszniejsze jest to, co robi się wolno, z szacunkiem do natury 
                i z miłością.
              </p>
            </div>

            {/* Icons row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-amber-900/10">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-100 rounded-xl text-[#78350F] flex-shrink-0">
                  <Heart size={18} className="fill-[#78350F]/10" />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A2E1A] text-sm">Zrobione z miłością</h4>
                  <p className="text-xs text-amber-950/60 mt-0.5">Każde danie przygotowywane jest z troską o najwyższą jakość.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-100 rounded-xl text-[#78350F] flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A2E1A] text-sm">Długie gotowanie</h4>
                  <p className="text-xs text-amber-950/60 mt-0.5">Nasze wywary rosołowe gotujemy powoli przez 12 godzin.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-100 rounded-xl text-[#78350F] flex-shrink-0">
                  <UtensilsCrossed size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A2E1A] text-sm">Mazurskie eko plony</h4>
                  <p className="text-xs text-amber-950/60 mt-0.5">Wspieramy polskie rodzinne uprawy i gospodarstwa ekologiczne.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
