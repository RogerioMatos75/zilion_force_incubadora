// src/components/dashboard/CrivoDoAtlas.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Esta interface deve corresponder à estrutura que definimos no Firestore
interface CrivoStage {
  id: string;
  nome: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  pontuacao: number;
  feedback: string;
}

// Define a interface para as props do componente CrivoDoAtlas
interface CrivoDoAtlasProps {
  crivoData: CrivoStage[]; // Esperamos um array de CrivoStage
}

const CrivoDoAtlas = ({ crivoData }: CrivoDoAtlasProps) => {
  const criterios = [
    { nome: 'Roteiro', nota: 8.5, status: 'Aprovado' },
    { nome: 'Arte', nota: 7.0, status: 'Em Revisão' },
    { id: '1', criterio: 'Roteiro', nota: 8.5, status: 'Aprovado' },
    { id: '2', criterio: 'Arte', nota: 7.0, status: 'Pendente' }, // Changed from 'Em Revisão'
    { id: '3', criterio: 'Personagens', nota: 9.0, status: 'Aprovado' }, // Changed from 'Excelente'
    { id: '4', criterio: 'Mundo', nota: 6.5, status: 'Pendente' }, // Changed from 'Ajustes Necessários'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="bg-white/10 p-2 rounded-lg mr-3 text-xl">👁️</span>
        Crivo do Atlas
      </h3>
      
      <div className="space-y-4">
        {crivoData.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5">
            <span className="text-sm font-medium text-gray-300">{item.nome}</span>
            <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-1 rounded border ${
                    item.status === 'aprovado' ? 'bg-green-900/30 text-green-400 border-green-900/50' : 
                    item.status === 'pendente' ? 'bg-zilion-gold-900/30 text-zilion-gold-400 border-zilion-gold-900/50' : 
                    'bg-red-900/30 text-red-400 border-red-900/50'
                }`}>
                    {item.status === 'aprovado' ? 'Aprovado' : item.status === 'pendente' ? 'Pendente' : 'Rejeitado'}
                </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-zilion-gold-900/20 border border-zilion-gold-500/30 rounded-xl">
        <p className="text-xs text-zilion-gold-400 italic">
            "Sua construção de mundo é fascinante, mas o ritmo do segundo ato precisa de ajustes."
        </p>
        <p className="text-right text-[10px] text-zilion-gold-600 font-bold mt-2 uppercase tracking-widest">- Atlas AI</p>
      </div>
    </motion.div>
  );
};

export default CrivoDoAtlas;
