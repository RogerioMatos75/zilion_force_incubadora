// src/components/dashboard/GuidedTour.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuidedTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('zilion_dashboard_tour_seen');
    if (!hasSeenTour) {
      setIsVisible(true);
    }
  }, []);

  const onClose = () => {
    setIsVisible(false);
    localStorage.setItem('zilion_dashboard_tour_seen', 'true');
  };

  const steps = [
    {
      title: 'Bem-vindo ao Painel do Criador',
      content: 'Aqui você gerencia toda a jornada da sua obra na Zilion Force Incubadora.',
    },
    {
      title: 'Meu Projeto',
      content: 'Acompanhe o status atual, a fase do pipeline e o progresso geral da sua incubação.',
    },
    {
      title: 'Crivo do Atlas',
      content: 'Veja a avaliação detalhada dos nossos curadores sobre cada aspecto da sua obra.',
    },
    {
      title: 'Mentorias e Agenda',
      content: 'Fique atento aos workshops e reuniões agendadas para impulsionar seu projeto.',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-black border border-white/10 p-8 rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-zilion-gold-500/10 rounded-full blur-[40px] pointer-events-none"></div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-zilion-gold-600 uppercase tracking-widest">
              Passo {step + 1} de {steps.length}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4">{steps[step].title}</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">{steps[step].content}</p>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-zilion-gold-500' : 'bg-gray-700'}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="bg-zilion-gold-500 text-black px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-zilion-gold-400 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              {step === steps.length - 1 ? 'Começar' : 'Próximo'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuidedTour;
