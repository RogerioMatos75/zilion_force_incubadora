// src/components/dashboard/MeuProjeto.tsx
import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface SubmissionData {
  tituloObra: string;
  genero: string;
  progresso?: number;
  faseAtual?: string;
  proximoDeadline?: string;
}

interface MeuProjetoProps {
  submission?: SubmissionData;
}

const MeuProjeto: React.FC<MeuProjetoProps> = ({ submission }) => {
  // Mock data if submission is not provided or fields are missing
  const titulo = submission?.tituloObra || 'A Lenda de Zilion';
  const genero = submission?.genero || 'Fantasia / Ação';
  const progresso = submission?.progresso || 35;
  const faseAtual = submission?.faseAtual || 'Desenvolvimento de Personagens';
  const proximoDeadline = submission?.proximoDeadline || '15 de Dezembro';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 relative overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-zilion-gold-500/10 rounded-full blur-[40px] pointer-events-none"></div>
      
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="w-2 h-8 bg-zilion-gold-500 mr-3 rounded-full"></span>
        Meu Projeto Atual
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">{titulo}</h3>
          <p className="text-sm text-gray-400">{genero}</p>
        </div>

        <div className="relative pt-4">
          <div className="flex justify-between text-sm mb-2 font-medium text-gray-400">
            <span>Progresso da Incubação</span>
            <span className="text-zilion-gold-500">{progresso}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-zilion-gold-400 to-zilion-gold-600 h-2.5 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]" 
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
           <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Fase Atual</p>
              <p className="text-white font-bold">{faseAtual}</p>
           </div>
           <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Próximo Deadline</p>
              <p className="text-white font-bold">{proximoDeadline}</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MeuProjeto;
