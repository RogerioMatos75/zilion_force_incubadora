// src/components/dashboard/UploadForm.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

interface UploadFormProps {
  submissionId: string;
  onUploadSuccess: () => void;
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
      const { signedUrl } = await signedUrlResponse.json();

      // Etapa 2: Fazer o upload do arquivo para o Google Cloud Storage
      setMessage('2/3: Enviando arquivo...');
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) throw new Error('Falha no upload para o storage.');

      // Etapa 3: Confirmar o upload no backend
      setMessage('3/3: Confirmando...');
      const confirmResponse = await fetch('/api/creator/confirm-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          submissionId: submissionId,
          fileName: file.name,
        }),
      });

      if (!confirmResponse.ok) throw new Error('Falha ao confirmar upload.');

      setStatus('success');
      setMessage('Upload realizado com sucesso!');
      setFile(null);
      onUploadSuccess();
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);

    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setMessage(error.message || 'Erro ao fazer upload.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="bg-white/10 p-2 rounded-lg mr-3 text-xl">📤</span>
        Enviar Atualização
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400
              file:mr-4 file:py-3 file:px-6
              file:rounded-full file:border-0
              file:text-sm file:font-bold file:uppercase file:tracking-wider
              file:bg-zilion-gold-500 file:text-black
              hover:file:bg-zilion-gold-400
              cursor:pointer focus:outline-none"
          />
        </div>
        
        {file && (
          <div className="bg-black/40 p-3 rounded-lg flex items-center justify-between border border-white/10">
            <span className="text-sm text-gray-300 truncate max-w-[200px]">{file.name}</span>
            <button 
              type="submit" 
              disabled={status === 'uploading'}
              className="text-xs font-bold text-zilion-gold-500 hover:text-zilion-gold-400 uppercase tracking-wider disabled:opacity-50"
            >
              {status === 'uploading' ? 'Enviando...' : 'Confirmar'}
            </button>
          </div>
        )}

        {message && (
          <p className={`text-xs ${status === 'error' ? 'text-red-400' : 'text-green-400'} mt-2`}>
            {message}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Formatos aceitos: PDF, JPG, PNG (Max 10MB).
        </p>
      </form>
    </motion.div>
  );
};

export default UploadForm;
