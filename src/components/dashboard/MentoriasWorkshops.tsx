// src/components/dashboard/MentoriasWorkshops.tsx
'use client';

import React, { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext'; // Importa o hook de autenticação

// Interface para os dados de uma reunião/evento
interface Reuniao {
  reuniaoId: string;
  tipo: string;
  data: Timestamp;
  confirmado: boolean;
  motivo: string;
}

// Props que o componente espera receber
interface MentoriasWorkshopsProps {
  reunioes: Reuniao[];
  submissionId: string;
}

const MentoriasWorkshops: React.FC<MentoriasWorkshopsProps> = ({ reunioes, submissionId }) => {
  const { user } = useAuth();
  const [loadingReuniaoId, setLoadingReuniaoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmarPresenca = async (reuniaoId: string) => {
    if (!user) {
      setError("Usuário não autenticado.");
      return;
    }

    setLoadingReuniaoId(reuniaoId);
    setError(null);

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/creator/confirmar-presenca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ submissionId, reuniaoId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Falha ao confirmar presença.");
      }
      
      // Sucesso! O onSnapshot na página do dashboard cuidará de atualizar a UI.
      
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingReuniaoId(null);
    }
  };
  
  // Ordena as reuniões pela data, da mais próxima para a mais distante
  const sortedReunioes = reunioes ? [...reunioes].sort((a, b) => a.data.toMillis() - b.data.toMillis()) : [];

  return (
    <div className="bg-zilion-surface border border-gray-800 p-6 rounded-lg shadow-lg hover:shadow-neon-cyan transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-zilion-cyan mb-4 drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
        Mentorias & Workshops
      </h3>
      
      {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

      <div className="space-y-4">
        {sortedReunioes.length > 0 ? sortedReunioes.map((reuniao) => (
          <div key={reuniao.reuniaoId} className="flex items-center justify-between bg-zilion-gray p-4 rounded border-l-4 border-zilion-purple">
            <div>
              <p className="font-bold text-white text-lg capitalize">{reuniao.tipo.replace(/_/g, ' ')}</p>
              <p className="text-sm text-gray-300">{reuniao.motivo}</p>
              <p className="text-xs text-blue-300 mt-1">
                {reuniao.data.toDate().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} às {reuniao.data.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              {reuniao.confirmado ? (
                <span className="px-4 py-2 bg-transparent border border-green-500 text-green-500 rounded font-semibold text-sm">
                  Confirmado
                </span>
              ) : (
                <button 
                  onClick={() => handleConfirmarPresenca(reuniao.reuniaoId)}
                  disabled={loadingReuniaoId === reuniao.reuniaoId}
                  className="px-4 py-2 bg-transparent border border-zilion-cyan text-zilion-cyan rounded hover:bg-zilion-cyan hover:text-black transition-colors font-semibold disabled:opacity-50 disabled:cursor-wait"
                >
                  {loadingReuniaoId === reuniao.reuniaoId ? 'Confirmando...' : 'Confirmar'}
                </button>
              )}
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-500 py-4">Nenhuma mentoria ou workshop agendado.</p>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm text-gray-400 hover:text-white underline">Ver agenda completa</button>
      </div>
    </div>
  );
};

export default MentoriasWorkshops;
