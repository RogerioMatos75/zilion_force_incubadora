// src/components/dashboard/Agenda.tsx
'use client';

import React from 'react';
import { Timestamp } from 'firebase/firestore';

interface Reuniao {
  reuniaoId: string;
  tipo: string;
  data: Timestamp;
  confirmado: boolean;
  motivo: string;
}

interface AgendaProps {
  reunioes: Reuniao[];
  submissionId: string;
}

const Agenda: React.FC<AgendaProps> = ({ reunioes, submissionId }) => {
  
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'Data a definir';
    // Formato mais completo para datas de eventos
    return timestamp.toDate().toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' });
  };

  const handleConfirmarPresenca = (reuniaoId: string) => {
    // Ação temporária. No futuro, isso chamará nossa API.
    console.log(`Confirmando presença para reunião ${reuniaoId} da submissão ${submissionId}`);
    alert(`(Funcionalidade em Desenvolvimento) A confirmação para a reunião ${reuniaoId} seria enviada para a API.`);
  };

  // Ordena as reuniões pela data, da mais próxima para a mais distante
  const sortedReunioes = reunioes ? [...reunioes].sort((a, b) => a.data.toMillis() - b.data.toMillis()) : [];

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl border border-gray-700 mt-8">
      <h3 className="text-xl font-bold text-blue-400 mb-4">Mentorias & Workshops</h3>
      <div className="space-y-4">
        {sortedReunioes.length > 0 ? (
          sortedReunioes.map((reuniao) => (
            <div key={reuniao.reuniaoId} className="bg-gray-700 p-4 rounded-md flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <p className="font-bold text-gray-100 capitalize">{reuniao.tipo.replace(/_/g, ' ')}</p>
                <p className="text-sm text-gray-300">{reuniao.motivo}</p>
                <p className="text-xs text-blue-300 mt-1">{formatDate(reuniao.data)}</p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0">
                {reuniao.confirmado ? (
                  <span className="px-3 py-1 text-xs font-bold text-green-900 bg-green-300 rounded-full">Presença Confirmada</span>
                ) : (
                  <button 
                    onClick={() => handleConfirmarPresenca(reuniao.reuniaoId)}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full text-xs transition-colors"
                  >
                    Confirmar Presença
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">Nenhuma mentoria ou workshop agendado no momento.</p>
        )}
      </div>
    </div>
  );
};

export default Agenda;
