'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tighter">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-white group-hover:text-zilion-gold-500 transition-colors duration-300">Zilion</span>
            <span className="text-zilion-gold-500 group-hover:text-white transition-colors duration-300">Force</span>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-zilion-gold-400 transition-colors">
              Home
            </Link>
          </li>
          <li 
            className="relative group" 
            onMouseEnter={() => setIsDropdownOpen(true)} 
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link href="/incubadora" className="flex items-center text-sm font-medium text-gray-300 hover:text-zilion-gold-400 transition-colors focus:outline-none">
              Incubadora
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </Link>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 py-2 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                >
                  <li>
                    <Link href="/criterios" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-zilion-gold-400 transition-colors">
                      Critérios de Seleção
                    </Link>
                  </li>
                  <li>
                    <Link href="/submeter" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-zilion-gold-400 transition-colors">
                      Submeter Projeto
                    </Link>
                  </li>
                  <li>
                    <Link href="/projetos" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-zilion-gold-400 transition-colors">
                      Projetos Incubados
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link href="/sobre-nos" className="text-sm font-medium text-gray-300 hover:text-zilion-gold-400 transition-colors">
              Quem Somos
            </Link>
          </li>
          <li>
            <Link href="/investidores" className="text-sm font-medium text-gray-300 hover:text-zilion-gold-400 transition-colors">
              Investidores
            </Link>
          </li>
          <li>
            <Link href="/contato" className="text-sm font-medium text-gray-300 hover:text-zilion-gold-400 transition-colors">
              Contato
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs text-zilion-silver-400 hidden sm:block font-mono tracking-wide">
                {user.email}
              </span>
              <button
                onClick={signOut}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white border border-white/20 rounded hover:bg-white/10 hover:border-white/40 transition-all"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-black bg-zilion-gold-500 rounded hover:bg-zilion-gold-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
