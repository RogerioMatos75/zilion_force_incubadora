// src/components/admin/submission/EnviarFeedback.tsx
'use client';

import React, { useState } from 'react';

interface EnviarFeedbackProps {
  submissionId: string;
}

const EnviarFeedback: React.FC<EnviarFeedbackProps> = ({ submissionId }) => {
  const [mensagem, setMensagem] = useState('');
  const [tipo, setTipo] = useState('Sugestão');
  
  // Estados para feedback do usuário
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensagem) {
        setError('A mensagem não pode estar vazia.');
        return;
    }

    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          newFeedback: { mensagem, tipo } 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao enviar o feedback.');
      }

      setMessage('Feedback enviado com sucesso!');
      // Limpa o formulário após o envio
      setMensagem('');
      setTipo('Sugestão');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-6 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Enviar Feedback para o Criador</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div>
            <label htmlFor="feedback-tipo" className="block text-sm font-medium text-gray-700">
              Tipo de Feedback
            </label>
            <select
              id="feedback-tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              disabled={isSaving}
            >
              <option>Sugestão</option>
              <option>Correção</option>
              <option>Aprovação</option>
              <option>Informação</option>
            </select>
          </div>
          <div>
            <label htmlFor="feedback-mensagem" className="block text-sm font-medium text-gray-700">
              Mensagem
            </label>
            <textarea
              id="feedback-mensagem"
              rows={5}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Escreva seu feedback detalhado aqui..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold uppercase tracking-widest rounded-md shadow-sm text-black bg-zilion-gold-500 hover:bg-zilion-gold-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:bg-gray-400 transition-all duration-300"
            >
              {isSaving ? 'Enviando...' : 'Enviar Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnviarFeedback;
