import React, { useState } from 'react';
import { db } from '@/lib/firebase/clientApp';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

const SolicitarReuniao = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSolicitacao = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'solicitacoes_reuniao'), {
        creatorId: user.uid,
        creatorName: user.displayName || user.email,
        creatorEmail: user.email,
        dataSolicitacao: serverTimestamp(),
        status: 'pendente'
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Erro ao solicitar reunião:", error);
      alert("Erro ao solicitar reunião. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-zilion-surface to-black border border-zilion-cyan/30 p-6 rounded-lg text-center">
      <h3 className="text-xl font-bold text-white mb-2">Precisa de ajuda?</h3>
      <p className="text-gray-400 mb-4 text-sm">Solicite uma reunião rápida com a equipe de curadoria.</p>
      
      {success ? (
        <div className="p-3 bg-green-900/50 text-green-400 rounded border border-green-500">
          Solicitação enviada com sucesso! Entraremos em contato.
        </div>
      ) : (
        <button 
          onClick={handleSolicitacao}
          disabled={loading}
          className="w-full py-3 bg-zilion-cyan/10 border border-zilion-cyan text-zilion-cyan font-bold rounded hover:bg-zilion-cyan hover:text-black hover:shadow-neon-cyan transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Solicitar Reunião'}
        </button>
      )}
    </div>
  );
};

export default SolicitarReuniao;
