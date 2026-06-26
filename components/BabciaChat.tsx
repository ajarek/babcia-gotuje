'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, MessageCircleCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const QUICK_PROMPTS = [
  'Co polecasz dziś na obiad?',
  'Czy masz dania wegetariańskie?',
  'Zdradzisz sekret swoich pierogów?',
  'Które danie jest najsłodsze?'
];

export default function BabciaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: 'Witaj moje złote dziecko! Cieszę się niesamowicie, że zajrzałeś do mojej kuchni. Na pewno jesteś głodny, co? Powiedz mi, na co masz dzisiaj smaczek, a chętnie doradzę!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const newMessages = [...messages, { role: 'user', content: text } as ChatMessage];
    setMessages(newMessages);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) throw new Error('Błąd połączenia');

      const data = await response.json();
      setMessages([...newMessages, { role: 'model', content: data.text }]);
    } catch (e) {
      console.error(e);
      setMessages([
        ...newMessages,
        {
          role: 'model',
          content: 'Ojej, chyba coś mi wykipiało na kuchni i sygnał się zgubił... Spróbuj jeszcze raz mnie zapytać, kochanie!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="babcia-chat-widget">
      {/* Floating Badge Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            layoutId="babcia-chat-button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-5 py-3.5 bg-[#78350F] hover:bg-[#5C230A] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-900/10 group"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white animate-pulse" />
            </div>
            <span className="text-sm font-semibold tracking-wide">Zapytaj Babcię!</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="babcia-chat-button"
            className="w-80 sm:w-96 h-[500px] bg-[#FAF6F0] rounded-2xl shadow-2xl border border-amber-900/10 flex flex-col overflow-hidden text-[#2D241E]"
          >
            {/* Chat Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-amber-900 to-[#5C230A] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                {/* Custom Granny Avatar placeholder */}
                <div className="relative w-10 h-10 rounded-full border border-amber-300 bg-amber-100 flex items-center justify-center text-xl overflow-hidden">
                  👵
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base leading-tight">Babcia Marysia</h4>
                  <p className="text-[10px] text-amber-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                    W kuchni • AI Asystent
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF6F0]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm border ${
                      m.role === 'user'
                        ? 'bg-[#78350F] text-white border-[#78350F] rounded-br-sm'
                        : 'bg-white text-amber-950 border-amber-900/5 rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white text-amber-950 border border-amber-900/5 rounded-2xl rounded-bl-sm p-3 shadow-sm flex items-center gap-2">
                    <span className="text-xs text-amber-900/60 font-medium">Babcia miesza w garnku</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-amber-100/30 border-t border-amber-900/5 flex gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap">
                {QUICK_PROMPTS.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(qp)}
                    className="px-3 py-1.5 bg-white hover:bg-amber-50 border border-amber-900/10 rounded-full text-[11px] font-semibold text-[#78350F] transition"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-white border-t border-amber-900/10 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Napisz do Babci..."
                className="flex-1 px-3.5 py-2 text-sm bg-amber-100/10 border border-amber-900/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                className="p-2.5 bg-[#78350F] text-white rounded-xl hover:bg-[#5C230A] transition-colors flex items-center justify-center disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
