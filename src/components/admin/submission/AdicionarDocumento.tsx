// src/components/admin/submission/AdicionarDocumento.tsx
'use client';

import React, { useState } from 'react';

interface AdicionarDocumentoProps {
  submissionId: string;
}

const AdicionarDocumento: React.FC<AdicionarDocumentoProps> = ({ submissionId }) => {
  const [documento, setDocumento] = useState<File | null>(null);
  const [nomeDocumento, setNomeDocumento] = useState('');

  // Estados para feedback do usuário
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documento || !nomeDocumento) {
      setError('Por favor, preencha o nome e selecione o arquivo do documento.');
      return;
    }

    setIsUploading(true);
    setStatusMessage('');
    setError('');

    try {
      // Etapa 1: Obter a URL assinada da nossa nova API
      setStatusMessage('1/3: Gerando link de upload seguro...');
      const signedUrlResponse = await fetch('/api/admin/generate-signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: documento.name,
          fileType: documento.type,
          submissionId: submissionId,
        }),
      });

      if (!signedUrlResponse.ok) {
        throw new Error('Falha ao preparar o upload seguro.');
      }
      const { signedUrl, filePath } = await signedUrlResponse.json();

      // Etapa 2: Fazer o upload do arquivo diretamente para o Google Cloud Storage
      setStatusMessage('2/3: Enviando arquivo para o servidor...');
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': documento.type },
        body: documento,
      });

      if (!uploadResponse.ok) {
        throw new Error('Ocorreu um erro durante o upload do arquivo.');
      }

      // Etapa 3: Salvar os metadados do arquivo no Firestore
      setStatusMessage('3/3: Registrando o documento no projeto...');
      
      // Constrói a URL pública do arquivo
      const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;

      const confirmResponse = await fetch(`/api/admin/submissions/${submissionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newSignedDocument: {
            nome: nomeDocumento,
            url: publicUrl,
            dataAssinatura: new Date().toISOString(), // O backend converterá para Timestamp
          },
        }),
      });

      if (!confirmResponse.ok) {
        // Este erro é esperado até implementarmos o próximo passo do nosso plano
        throw new Error('Falha ao registrar o documento no banco de dados.');
      }

      setStatusMessage('Documento adicionado com sucesso!');
      // Limpa o formulário
      setDocumento(null);
      setNomeDocumento('');

    } catch (err: any) {
      console.error("Erro no processo de upload do documento:", err);
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumento(e.target.files[0]);
    }
  };

  return (
    <div className="mt-6 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Adicionar Documento Assinado</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div>
            <label htmlFor="doc-nome" className="block text-sm font-medium text-gray-700">
              Nome do Documento
            </label>
            <input
              type="text"
              id="doc-nome"
              value={nomeDocumento}
              onChange={(e) => setNomeDocumento(e.target.value)}
              placeholder="Ex: Contrato de Incubação, Acordo de Confidencialidade"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isUploading}
            />
          </div>
          <div>
            <label htmlFor="doc-file" className="block text-sm font-medium text-gray-700">
              Arquivo PDF
            </label>
            <input
              type="file"
              id="doc-file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-bold file:uppercase
                          file:bg-zilion-gold-500 file:text-black
                          hover:file:bg-zilion-gold-400"
              disabled={isUploading}
            />
          </div>

          {/* Mensagens de Feedback */}
          {statusMessage && <p className="text-sm text-green-600">{statusMessage}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold uppercase tracking-widest rounded-md shadow-sm text-black bg-zilion-gold-500 hover:bg-zilion-gold-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:bg-gray-400 transition-all duration-300"
            >
              {isUploading ? 'Enviando...' : 'Adicionar Documento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarDocumento;
