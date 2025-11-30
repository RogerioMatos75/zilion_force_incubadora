"use client";

import React from 'react';

const ContactForm = () => {
  // Futuramente, aqui podemos adicionar o estado para os campos
  // e a lógica de envio do formulário.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de envio do formulário aqui
    alert("Formulário enviado! (funcionalidade a ser implementada)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs font-bold text-zilion-gold-500 uppercase tracking-widest mb-2">Nome</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className="w-full p-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all outline-none"
          placeholder="Seu nome completo"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-bold text-zilion-gold-500 uppercase tracking-widest mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className="w-full p-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all outline-none"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-bold text-zilion-gold-500 uppercase tracking-widest mb-2">Mensagem</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5} 
          className="w-full p-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all outline-none resize-none"
          placeholder="Como podemos ajudar?"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-zilion-gold-500 hover:bg-zilion-gold-400 text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
      >
        Enviar Mensagem
      </button>
    </form>
  );
};

export default ContactForm;
