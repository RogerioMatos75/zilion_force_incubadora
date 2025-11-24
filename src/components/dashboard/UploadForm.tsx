// src/components/dashboard/UploadForm.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface UploadFormProps {
  submissionId: string;
  onUploadSuccess: () => void; // Callback para notificar o pai (ex: para exibir uma mensagem)
}

const UploadForm: React.FC<UploadFormProps> = ({ submissionId, onUploadSuccess }) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) {
      setMessage('Por favor, selecione um arquivo.');
      return;
    }

    setStatus('uploading');
    setMessage('Iniciando upload...');

    try {
      const token = await user.getIdToken();

      // Etapa 1: Obter a URL assinada do nosso backend
      setMessage('1/3: Preparando upload seguro...');
      const signedUrlResponse = await fetch('/api/creator/upload-atualizacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          submissionId: submissionId,
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!signedUrlResponse.ok) throw new Error('Falha ao preparar o upload.');
      const { signedUrl, filePath } = await signedUrlResponse.json();

      // Etapa 2: Fazer o upload do arquivo para o Google Cloud Storage
      setMessage('2/3: Enviando arquivo... (Isso pode demorar dependendo do tamanho)');
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) throw new Error('Falha no upload do arquivo para o Storage.');

      // Etapa 3: Confirmar o upload com nosso backend para salvar o registro no Firestore
      setMessage('3/3: Finalizando e registrando o arquivo...');
      const confirmResponse = await fetch('/api/creator/confirm-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          submissionId: submissionId,
          fileName: file.name,
          filePath: filePath,
          fileType: file.type,
          fileSize: file.size,
        }),
      });
      
      if (!confirmResponse.ok) throw new Error('Falha ao registrar o arquivo no banco de dados.');

      setStatus('success');
      setMessage(`Arquivo '${file.name}' enviado com sucesso!`);
      setFile(null);
      if(onUploadSuccess) onUploadSuccess();

    } catch (err: any) {
      console.error("Erro no processo de upload:", err);
      setStatus('error');
      setMessage(`Erro: ${err.message}`);
    }
  };

  return (
    <div className="bg-zilion-surface text-white p-6 rounded-lg shadow-lg border border-gray-800 mt-8">
        <h3 className="text-xl font-bold text-zilion-cyan mb-4 flex items-center">
          <span className="mr-2 text-2xl">📤</span> Upload de Atualizações
        </h3>
        <p className="text-sm text-gray-400 mb-6">Envie novas versões da sua HQ, roteiro, ou outros documentos relevantes para o projeto.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-zilion-cyan/20 file:text-zilion-cyan file:border file:border-zilion-cyan
                        hover:file:bg-zilion-cyan hover:file:text-black hover:file:shadow-neon-cyan
                        transition-all duration-300 cursor-pointer"
                    disabled={status === 'uploading'}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-zilion-cyan to-zilion-purple text-black font-bold py-3 px-4 rounded-lg 
                disabled:opacity-50 disabled:cursor-not-allowed 
                hover:shadow-neon-cyan hover:scale-[1.01] transition-all duration-300 uppercase tracking-widest"
                disabled={!file || status === 'uploading'}
            >
                {status === 'uploading' ? 'Enviando...' : 'Enviar Arquivo'}
            </button>
        </form>
        {message && (
            <div className={`mt-4 p-3 rounded text-sm text-center border ${
                status === 'error' ? 'bg-red-900/20 border-red-500 text-red-400' : 
                status === 'success' ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-gray-800 border-gray-600 text-gray-300'
            }`}>
                {message}
            </div>
        )}
    </div>
  );
};

export default UploadForm;
