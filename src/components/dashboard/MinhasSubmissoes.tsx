// src/components/dashboard/MinhasSubmissoes.tsx
'use client';

import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface FileRecord {
  uploadedAt: Timestamp | string; // Allow string for mock data
  fileName: string;
  fileSize?: number;
  fileType?: string;
  filePath?: string;
  status?: string; // Add status for compatibility
  titulo?: string; // Add titulo for compatibility
}

interface MinhasSubmissoesProps {
  fileHistory?: FileRecord[];
}

const MinhasSubmissoes: React.FC<MinhasSubmissoesProps> = ({ fileHistory }) => {
  // Mock data if fileHistory is empty
  const submissoes = fileHistory && fileHistory.length > 0 ? fileHistory : [
    { uploadedAt: '2023-11-01', fileName: 'A Lenda de Zilion', status: 'Em Análise', titulo: 'A Lenda de Zilion' },
    { uploadedAt: '2023-10-15', fileName: 'Cyber Samurai', status: 'Aprovado', titulo: 'Cyber Samurai' },
  ];

  const formatDate = (date: any) => {
      if (!date) return '-';
      if (typeof date === 'string') return date;
      if (date instanceof Timestamp) return date.toDate().toLocaleDateString();
      return new Date(date).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="bg-white/10 p-2 rounded-lg mr-3 text-xl">📁</span>
        Histórico de Submissões
      </h3>
      
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-black/40">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Título/Arquivo</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-white/10">
            {submissoes.map((sub, index) => (
              <tr key={index} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{sub.titulo || sub.fileName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{formatDate(sub.uploadedAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    sub.status === 'Aprovado' ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 'bg-zilion-gold-900/30 text-zilion-gold-400 border border-zilion-gold-900/50'
                  }`}>
                    {sub.status || 'Enviado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MinhasSubmissoes;
