// src/components/admin/submission/GerenciarMetricas.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';

interface GerenciarMetricasProps {
  submissionId: string;
  // O '?' torna as props opcionais, já que podem não existir no início.
  initialDeadline?: Timestamp;
  initialVersao?: string;
}

const GerenciarMetricas: React.FC<GerenciarMetricasProps> = ({ submissionId, initialDeadline, initialVersao }) => {
  const [deadline, setDeadline] = useState('');
  const [versao, setVersao] = useState('');

  // Estados para feedback do usuário
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // useEffect para preencher o formulário quando os dados chegam
  useEffect(() => {
    // Converte o Timestamp do Firebase para o formato YYYY-MM-DD que o input[type=date] usa
    if (initialDeadline) {
      const date = initialDeadline.toDate();
      const formattedDate = date.toISOString().split('T')[0];
      setDeadline(formattedDate);
    }
    // Preenche a versão se ela existir
    if (initialVersao) {
      setVersao(initialVersao);
    }
  }, [initialDeadline, initialVersao]); // Roda o efeito quando as props mudarem

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          proximoDeadline: deadline, // Envia a data como string 'YYYY-MM-DD'
          versaoAtual: versao 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao salvar as métricas.');
      }

      setMessage('Métricas salvas com sucesso!');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-6 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Gerenciar Métricas do Projeto</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Próximo Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isSaving}
            />
          </div>
          <div>
            <label htmlFor="versao" className="block text-sm font-medium text-gray-700">
              Versão Atual do Projeto
            </label>
            <input
              type="text"
              id="versao"
              value={versao}
              onChange={(e) => setVersao(e.target.value)}
              placeholder="Ex: v1.2, v2.0 (Release Candidate)"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isSaving}
            />
          </div>

          {/* Mensagens de Feedback */}
          {message && <p className="text-sm text-green-600">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {isSaving ? 'Salvando...' : 'Salvar Métricas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GerenciarMetricas;
