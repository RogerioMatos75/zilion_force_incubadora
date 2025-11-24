import React, { useState, useEffect } from 'react';

const GuidedTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('zilion_dashboard_tour_seen');
    if (!hasSeenTour) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('zilion_dashboard_tour_seen', 'true');
  };

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const tourSteps = [
    {
      title: "Bem-vindo ao seu QG!",
      content: "Este é o painel de controle da sua jornada na Zilion Force. Aqui você acompanha cada passo da incubação do seu projeto.",
    },
    {
      title: "Pipeline CERNE",
      content: "Acompanhe visualmente em que etapa seu projeto está. O brilho neon indica o progresso ativo!",
    },
    {
      title: "Uploads & Feedback",
      content: "Envie novas versões da sua obra e receba feedback direto da nossa curadoria especializada.",
    },
    {
      title: "Precisa de Ajuda?",
      content: "Use o botão 'Solicitar Reunião' para agendar um papo rápido com nossos mentores.",
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-zilion-surface border border-zilion-cyan p-8 rounded-lg max-w-md shadow-neon-cyan relative animate-fade-in-up">
        <div className="absolute top-0 right-0 p-4">
            <button onClick={handleClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        
        <div className="mb-6">
            <span className="text-xs font-bold text-zilion-magenta uppercase tracking-widest">
                Tour Guiado {step + 1}/{tourSteps.length}
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 mb-4">{tourSteps[step].title}</h2>
            <p className="text-gray-300 leading-relaxed">{tourSteps[step].content}</p>
        </div>

        <div className="flex justify-between items-center mt-8">
            <button 
                onClick={handleClose}
                className="text-sm text-gray-500 hover:text-white underline"
            >
                Pular Tour
            </button>
            <button 
                onClick={handleNext}
                className="px-6 py-2 bg-zilion-cyan text-black font-bold rounded hover:shadow-neon-cyan transition-all"
            >
                {step === tourSteps.length - 1 ? 'Começar!' : 'Próximo'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;
