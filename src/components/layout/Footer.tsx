// src/components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-zilion-gold-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-6 block">
              ZILION <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-300 to-zilion-gold-600">FORCE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A primeira incubadora brasileira especializada em Propriedade Intelectual de HQs para o mercado Audiovisual.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              {[
                { name: 'instagram', href: 'https://www.instagram.com/zilionforcecomics/#', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.703.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.942a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.445.01 10.173 0 8 0zm0 1.442c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.598-.92c-.11-.281-.24-.705-.276-1.485-.038-.843-.046-1.096-.046-3.232s.008-2.389.046-3.232c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.232-.047zM8 4.01a3.99 3.99 0 1 0 0 7.98 3.99 3.99 0 0 0 0-7.98zM8 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm4.75-7.06a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
                  </svg>
                )},
                { name: 'youtube', href: 'https://youtube.com/@zilionforcecomics?feature=shared', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.022.26-.01.104c-.048.519-.119 1.023-.22 1.402a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.8 99.8 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z"/>
                  </svg>
                )},
                { name: 'x', href: 'https://x.com/ZilionForce?s=09', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zM11.46 13.812h1.57L4.947 2.165H3.21z"/>
                  </svg>
                )},
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-zilion-gold-500 hover:border-transparent transition-all duration-300"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navegação</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-zilion-gold-500 transition-colors text-sm">Home</Link></li>
              <li><Link href="/sobre-nos" className="text-gray-400 hover:text-zilion-gold-500 transition-colors text-sm">Sobre Nós</Link></li>
              <li><Link href="/projetos" className="text-gray-400 hover:text-zilion-gold-500 transition-colors text-sm">Projetos</Link></li>
              <li><Link href="/criterios" className="text-gray-400 hover:text-zilion-gold-500 transition-colors text-sm">Critérios</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/termos" className="text-gray-400 hover:text-zilion-gold-500 transition-colors text-sm">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="text-gray-400 hover:text-zilion-gold-500 transition-colors text-sm">Política de Privacidade</Link></li>
              <li><Link href="/contato" className="text-gray-400 hover:text-zilion-gold-500 transition-colors text-sm">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contato</h4>
            <p className="text-gray-400 text-sm mb-4">
              Dúvidas ou parcerias?
            </p>
            <a href="mailto:admzilionforcecomics@gmail.com" className="text-zilion-gold-500 hover:text-white transition-colors text-sm font-bold block mb-2">
              admzilionforcecomics@gmail.com
            </a>
            <p className="text-gray-500 text-xs mt-4">
              São Paulo, Brasil
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs mb-4 md:mb-0">
            © {currentYear} Zilion Force Comics & Incubadora. Todos os direitos reservados.
          </p>
          <p className="text-gray-700 text-[10px] uppercase tracking-widest">
            Designed by Archon AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
