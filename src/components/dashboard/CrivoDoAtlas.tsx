// src/components/dashboard/CrivoDoAtlas.tsx
'use client';

import React from 'react';

// Esta interface deve corresponder à estrutura que definimos no Firestore
interface CrivoStage {
  id: string;
  nome: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  pontuacao: number;
  feedback: string;
}

interface CrivoDoAtlasProps {
  crivoData: CrivoStage[];
}

// Componente para renderizar um ícone de status com base na string do status
const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
      case 'aprovado':
        return <span className="text-green-400" title="Aprovado">✅</span>;
      case 'rejeitado':
        return <span className="text-red-400" title="Ajustes Necessários">❌</span>;
      case 'pendente':
      default:
        return <span className="text-yellow-400" title="Pendente">⏳</span>;
    }
};

const CrivoDoAtlas: React.FC<CrivoDoAtlasProps> = ({ crivoData }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl border border-gray-700 mt-8">
      <h3 className="text-xl font-bold text-blue-400 mb-4">Progresso no Crivo do Atlas</h3>
      <div className="space-y-4">
        {crivoData && crivoData.length > 0 ? (
          crivoData.map((stage) => (
            <div key={stage.id} className="bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="text-2xl mr-4"><StatusIcon status={stage.status} /></div>
                  <div>
                    <p className="font-semibold text-gray-100">{stage.nome}</p>
                    <p className="text-xs text-gray-400">
                      Status: <span className="font-medium capitalize">{stage.status}</span> | Pontuação: {stage.pontuacao}
                    </p>
                  </div>
                </div>
              </div>
              {stage.feedback && (
                <div className="mt-3 pt-2 pl-10">
                  <p className="text-sm text-gray-300 border-l-2 border-gray-500 pl-3 italic">
                    {stage.feedback}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">O progresso no Crivo do Atlas aparecerá aqui.</p>
        )}
      </div>
    </div>
  );
};

export default CrivoDoAtlas;
