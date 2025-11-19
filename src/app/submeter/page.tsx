'use client';

import { useState } from 'react';
import { storage } from '@/lib/firebase/clientApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/context/AuthContext';
import CreatorAuth from '@/components/auth/CreatorAuth';

// Componente para o formulário
const SubmissionForm = () => {
  const { user } = useAuth();
  // Estados para os arquivos
  const [ipDocumentFile, setIpDocumentFile] = useState<File | null>(null);
  const [hqSampleFile, setHqSampleFile] = useState<File | null>(null);
  
  // Estados para os checkboxes
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [originalityDeclared, setOriginalityDeclared] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para a tela de sucesso
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string; protocol: string; }>({ success: false, message: '', protocol: '' });

  // Função para fazer upload de um arquivo e retornar a URL
  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!hqSampleFile) {
      setError('A amostra da HQ (PDF) é obrigatória.');
      return;
    }
    if (!termsAccepted || !originalityDeclared) {
      setError('Você deve aceitar os Termos de Envio e declarar a originalidade da obra.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Upload dos arquivos em paralelo para mais eficiência
      const uploadPromises: Promise<string | null>[] = [
        hqSampleFile ? uploadFile(hqSampleFile, `submissions/${user!.uid}/${Date.now()}-${hqSampleFile.name}`) : Promise.resolve(null),
        ipDocumentFile ? uploadFile(ipDocumentFile, `submissions/${user!.uid}/${Date.now()}-${ipDocumentFile.name}`) : Promise.resolve(null),
      ];
      const [hqSampleUrl, ipDocumentUrl] = await Promise.all(uploadPromises);

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: user!.displayName || user!.email!,
          creatorEmail: user!.email!,
          creatorUid: user!.uid,
          hqTitle: formData.get('hqTitle') as string,
          synopsis: formData.get('synopsis') as string,
          genre: formData.get('genre') as string,
          portfolioUrl: formData.get('portfolioUrl') as string,
          hqSampleUrl,
          ipDocumentUrl,
          termsAccepted,
          originalityDeclared,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Falha ao enviar submissão.');

      setSubmissionResult({ success: true, message: result.message, protocol: result.protocoloAtlas });

    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao enviar o projeto.');
    } finally {
      setLoading(false);
    }
  };

  if (submissionResult.success) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-medium text-green-800">Submissão Recebida!</h3>
        <p className="mt-2 text-sm text-gray-600">{submissionResult.message}</p>
        <p className="mt-4 text-sm text-gray-800 font-bold">Protocolo Atlas: <span className="font-mono p-1 bg-gray-200 rounded">{submissionResult.protocol}</span></p>
        <button onClick={() => window.location.reload()} className="mt-6 w-full flex justify-center py-2 px-4 border rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Enviar Outro Projeto
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título, Sinopse, Gênero, Portfólio */}
      <div>
        <label htmlFor="hqTitle" className="block text-sm font-medium text-gray-700">Título da Obra</label>
        <input id="hqTitle" name="hqTitle" type="text" required disabled={loading} className="mt-1 block w-full px-3 py-2 border rounded-md" />
      </div>
      <div>
        <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">Sinopse</label>
        <textarea id="synopsis" name="synopsis" rows={4} required disabled={loading} className="mt-1 block w-full px-3 py-2 border rounded-md" />
      </div>
      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Gênero</label>
        <input id="genre" name="genre" type="text" required disabled={loading} className="mt-1 block w-full px-3 py-2 border rounded-md" />
      </div>
      <div>
        <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">Link do Portfólio</label>
        <input id="portfolioUrl" name="portfolioUrl" type="url" disabled={loading} className="mt-1 block w-full px-3 py-2 border rounded-md" />
      </div>
      
      {/* Uploads */}
      <div>
        <label htmlFor="hqSample" className="block text-sm font-medium text-gray-700">Amostra da HQ (PDF obrigatório)</label>
        <input id="hqSample" name="hqSample" type="file" required accept=".pdf" onChange={(e) => setHqSampleFile(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm" />
      </div>
      <div>
        <label htmlFor="ipDocument" className="block text-sm font-medium text-gray-700">Comprovante de PI (Opcional no 1º envio)</label>
        <input id="ipDocument" name="ipDocument" type="file" accept=".pdf,.png,.jpg" onChange={(e) => setIpDocumentFile(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm" />
      </div>

      {/* Checkboxes */}
      <div className="flex items-center"><input id="originality" type="checkbox" required checked={originalityDeclared} onChange={(e) => setOriginalityDeclared(e.target.checked)} className="h-4 w-4" /><label htmlFor="originality" className="ml-2 block text-sm">Declaro que esta obra é original.</label></div>
      <div className="flex items-center"><input id="terms" type="checkbox" required checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4" /><label htmlFor="terms" className="ml-2 block text-sm">Eu li e aceito os <a href="/termos" target="_blank" className="font-medium text-indigo-600">Termos de Envio</a>.</label></div>
      
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400">{loading ? 'Enviando...' : 'Enviar Projeto'}</button>
    </form>
  );
};

// Componente principal da página
export default function SubmeterPage() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Carregando...</p></div>;
  }
  if (!user) {
    return <CreatorAuth />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Submeta seu Projeto de HQ</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Bem-vindo, {user.displayName || user.email}! Preencha os campos abaixo.</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SubmissionForm />
        </div>
      </div>
    </div>
  );
}
