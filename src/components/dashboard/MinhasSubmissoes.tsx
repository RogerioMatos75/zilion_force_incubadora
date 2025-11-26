// src/components/dashboard/MinhasSubmissoes.tsx
'use client';

import React from 'react';
import { Timestamp } from 'firebase/firestore';

interface FileRecord {
  uploadedAt: Timestamp;
  fileName: string;
  fileSize: number;
  fileType: string;
  filePath: string;
}

interface MinhasSubmissoesProps {
  fileHistory: FileRecord[];
}

const MinhasSubmissoes: React.FC<MinhasSubmissoesProps> = ({ fileHistory }) => {
  // Função para formatar bytes em um formato legível (KB, MB, GB)
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Função para formatar a data do Firebase
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'Data inválida';
    return timestamp.toDate().toLocaleString('pt-BR');
  };

  // Ordena o histórico do arquivo mais recente para o mais antigo
  const sortedHistory = [...(fileHistory || [])].sort((a, b) => {
    const timeA = a.uploadedAt ? a.uploadedAt.toMillis() : 0;
    const timeB = b.uploadedAt ? b.uploadedAt.toMillis() : 0;
    return timeB - timeA;
  });

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl border border-gray-700 mt-8">
      <h3 className="text-xl font-bold text-blue-400 mb-4">Histórico de Arquivos Enviados</h3>
      {sortedHistory && sortedHistory.length > 0 ? (
        <ul className="space-y-3">
          {sortedHistory.map((file, index) => (
            <li key={index} className="bg-gray-700 p-3 rounded-md flex justify-between items-center transition-colors hover:bg-gray-600">
              <div>
                <p className="font-semibold text-gray-100">{file.fileName}</p>
                <p className="text-xs text-gray-400">
                  Enviado em: {formatDate(file.uploadedAt)} - {formatBytes(file.fileSize)}
                </p>
              </div>
              <button 
                disabled 
                className="text-xs bg-gray-500 text-white font-semibold py-1 px-3 rounded-full cursor-not-allowed opacity-70" 
                title="Funcionalidade de download em breve"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm text-center py-4">Nenhum arquivo adicional foi enviado para este projeto.</p>
      )}
    </div>
  );
};

export default MinhasSubmissoes;
