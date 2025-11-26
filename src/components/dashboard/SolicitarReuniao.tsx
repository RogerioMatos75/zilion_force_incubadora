import React from 'react';

const SolicitarReuniao = () => {
  return (
    <div className="bg-gradient-to-r from-zilion-surface to-black border border-zilion-cyan/30 p-6 rounded-lg text-center">
      <h3 className="text-xl font-bold text-white mb-2">Precisa de ajuda?</h3>
      <p className="text-gray-400 mb-4 text-sm">Agende uma reunião com a equipe de curadoria em nossa plataforma.</p>
      
      <a 
        href="https://zilionforcecomics.bitrix24.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-3 bg-zilion-cyan/10 border border-zilion-cyan text-zilion-cyan font-bold rounded hover:bg-zilion-cyan hover:text-black hover:shadow-neon-cyan transition-all duration-300"
      >
        Agendar Reunião no Bitrix24
      </a>
    </div>
  );
};

export default SolicitarReuniao;
