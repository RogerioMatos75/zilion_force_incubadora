'use client';

import { useState, useEffect } from 'react';
import ContactForm from "@/components/contato/ContactForm";
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zilion-gold-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="container mx-auto px-6 py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            Fale <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-300 to-zilion-gold-600">Conosco</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Tem alguma dúvida ou proposta de parceria? Estamos prontos para ouvir você.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-8 text-white flex items-center">
              <span className="w-8 h-[2px] bg-zilion-gold-500 mr-4"></span>
              Envie uma mensagem
            </h2>
            <ContactForm />
          </motion.div>

          {/* Contact Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center space-y-12"
          >
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-zilion-gold-500/30 transition-colors group">
              <h3 className="text-zilion-gold-500 font-bold uppercase tracking-widest text-sm mb-4">Email Direto</h3>
              {isClient ? (
                <a href="mailto:admzilionforcecomics@gmail.com" className="text-2xl md:text-3xl font-bold text-white hover:text-zilion-gold-400 transition-colors break-all">
                  admzilionforcecomics@gmail.com
                </a>
              ) : (
                <div className="h-8 bg-white/10 rounded w-3/4 animate-pulse"></div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-zilion-gold-500/30 transition-colors group">
              <h3 className="text-zilion-gold-500 font-bold uppercase tracking-widest text-sm mb-4">WhatsApp</h3>
              {isClient ? (
                <a 
                  href="https://wa.me/5511913613425" 
                  className="text-2xl md:text-3xl font-bold text-white hover:text-zilion-gold-400 transition-colors inline-flex items-center"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg className="w-8 h-8 mr-4 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 14.2c-.3-.1-1.8-1-2.1-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.5 0s-1.4-.5-2.6-1.6c-1-1-1.6-2.1-1.8-2.5-.2-.3 0-.5.2-.7 0-.1.2-.3.4-.4.1-.1.2-.3.3-.4s.1-.2 0-.4c-.1-.2-1-2.4-1.3-3.3-.3-.8-.7-1.1-.9-1.1s-.5 0-.7 0h-.3c-.2 0-.5.2-.7.6 0 .4-.8 2-.8 4s.8 4.6 1 4.9c.1.3 1.7 2.5 4 3.6.6.3 1 .4 1.3.5.5.1 1 .1 1.3-.1.4-.2 1.2-.5 1.4-.9.2-.5.2-1 .1-1.1s-.2-.2-.5-.4zM12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                  +55 11 91361-3425
                </a>
              ) : (
                <div className="h-8 bg-white/10 rounded w-1/2 animate-pulse"></div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-zilion-gold-500 font-bold uppercase tracking-widest text-sm mb-4">Localização</h3>
              <p className="text-xl text-white">
                São Paulo, Brasil
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Atendimento Global via Digital
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
