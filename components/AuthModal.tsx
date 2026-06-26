'use client';

import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { X, LogIn, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useRestaurant();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) throw new Error('Wpisz swoje imię, dziecko!');
        await signupWithEmail(name, email, password);
      } else {
        await loginWithEmail(email, password);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      let PolishMsg = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        PolishMsg = 'Błędny e-mail lub hasło. Spróbuj jeszcze raz!';
      } else if (err.code === 'auth/email-already-in-use') {
        PolishMsg = 'Ten adres e-mail jest już zajęty przez innego wnuczka!';
      } else if (err.code === 'auth/weak-password') {
        PolishMsg = 'Hasło musi mieć co najmniej 6 znaków!';
      } else if (err.code === 'auth/invalid-email') {
        PolishMsg = 'Niepoprawny format adresu e-mail!';
      }
      setError(PolishMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError('Nie udało się zalogować przez Google. Spróbuj e-mailem!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md overflow-hidden bg-[#FAF6F0] rounded-2xl shadow-2xl border border-amber-900/10 text-[#2D241E]"
        id="auth-modal-card"
      >
        {/* Header background decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-amber-900/60 transition-colors rounded-full hover:bg-amber-900/10"
          aria-label="Zamknij"
        >
          <X size={20} />
        </button>

        <div className="p-8 pt-10">
          <div className="text-center mb-8">
            <h3 className="font-serif text-3xl font-bold tracking-tight text-[#4A2E1A]">
              {isSignUp ? 'Witaj w Rodzinie!' : 'Witaj u Babci!'}
            </h3>
            <p className="text-sm text-amber-950/70 mt-2">
              {isSignUp 
                ? 'Załóż darmowe konto i zbieraj punkty za pyszne dania.' 
                : 'Zaloguj się, aby zamawiać pyszne domowe jedzenie.'
              }
            </p>
          </div>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-800 bg-red-100/80 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1">Imię</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-900/40">
                    <UserIcon size={18} />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Twoje imię"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1">E-mail</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-900/40">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="twoj.email@poczta.pl"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1">Hasło</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-900/40">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-[#78350F] hover:bg-[#5C230A] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isSignUp ? (
                <>
                  <UserPlus size={18} />
                  <span>Zarejestruj się</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Zaloguj się</span>
                </>
              )}
            </button>
          </form>

          {/* Google Sign In */}
          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-amber-900/10" />
            <span className="px-3 bg-[#FAF6F0] text-xs text-amber-950/50 uppercase tracking-widest font-medium">LUB</span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 bg-white hover:bg-amber-100/30 border border-amber-950/15 rounded-xl shadow-sm font-semibold text-amber-900 transition flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.8 2.7l2.8 2.17c1.64-1.51 2.58-3.74 2.58-6.39z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.8-2.17c-.78.52-1.78.83-3.16.83-2.43 0-4.49-1.64-5.22-3.85H.95v2.24A9.002 9.002 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.78 10.63c-.19-.57-.3-1.17-.3-1.8 0-.63.11-1.23.3-1.8V4.8H.95A9.002 9.002 0 0 0 0 9c0 1.54.39 2.98 1.09 4.26l2.69-2.63z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.8 11.43 0 9 0 5.48 0 2.44 2.02.95 4.81l2.83 2.2C4.51 4.78 6.57 3.58 9 3.58z"
              />
            </svg>
            <span>Zaloguj się przez Google</span>
          </button>

          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#78350F] hover:underline font-semibold"
            >
              {isSignUp 
                ? 'Masz już konto? Zaloguj się u Babci!' 
                : 'Nie masz konta? Zarejestruj się tutaj!'
              }
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
