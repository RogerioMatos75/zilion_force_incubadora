'use client';

import { useState } from 'react';
import { storage } from '@/lib/firebase/clientApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/context/AuthContext';
import CreatorAuth from '@/components/auth/CreatorAuth';
import { motion } from 'framer-motion';

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
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-white border border-zilion-gold-500/20 rounded-2xl shadow-xl"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Submissão Recebida!</h3>
        <p className="text-gray-600 mb-8 text-lg">{submissionResult.message}</p>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 inline-block shadow-inner">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Protocolo Atlas</p>
          <p className="text-2xl font-mono text-zilion-gold-600 font-bold tracking-wider">{submissionResult.protocol}</p>
        </div>
        <div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl text-sm"
          >
            Enviar Outro Projeto
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Título, Sinopse, Gênero, Portfólio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2">
          <label htmlFor="hqTitle" className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Título da Obra</label>
          <input id="hqTitle" name="hqTitle" type="text" required disabled={loading} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all placeholder-gray-400" placeholder="Ex: A Lenda de Zilion" />
        </div>
        <div className="col-span-2">
          <label htmlFor="synopsis" className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Sinopse</label>
          <textarea id="synopsis" name="synopsis" rows={4} required disabled={loading} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all placeholder-gray-400 resize-none" placeholder="Descreva sua história em poucas linhas..." />
        </div>
        <div>
          <label htmlFor="genre" className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Gênero</label>
          <input id="genre" name="genre" type="text" required disabled={loading} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all placeholder-gray-400" placeholder="Ex: Sci-Fi, Fantasia" />
        </div>
        <div>
          <label htmlFor="portfolioUrl" className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Link do Portfólio</label>
          <input id="portfolioUrl" name="portfolioUrl" type="url" disabled={loading} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all placeholder-gray-400" placeholder="https://..." />
        </div>
      </div>
      
      {/* Uploads */}
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-1 h-6 bg-zilion-gold-500 mr-3 rounded-full"></span>
          Arquivos do Projeto
        </h3>
        <div className="space-y-6">
          <div>
            <label htmlFor="hqSample" className="block text-sm font-medium text-gray-700 mb-2">Amostra da HQ (PDF obrigatório)</label>
            <div className="relative">
              <input id="hqSample" name="hqSample" type="file" required accept=".pdf" onChange={(e) => setHqSampleFile(e.target.files ? e.target.files[0] : null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 transition-all cursor-pointer border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div>
            <label htmlFor="ipDocument" className="block text-sm font-medium text-gray-700 mb-2">Comprovante de PI (Opcional no 1º envio)</label>
            <div className="relative">
              <input id="ipDocument" name="ipDocument" type="file" accept=".pdf,.png,.jpg" onChange={(e) => setIpDocumentFile(e.target.files ? e.target.files[0] : null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 transition-all cursor-pointer border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div className="flex items-center">
          <input id="originality" type="checkbox" required checked={originalityDeclared} onChange={(e) => setOriginalityDeclared(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-zilion-gold-500 focus:ring-zilion-gold-500" />
          <label htmlFor="originality" className="ml-3 block text-sm text-gray-600">Declaro que esta obra é original e de minha autoria.</label>
        </div>
        <div className="flex items-center">
          <input id="terms" type="checkbox" required checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-zilion-gold-500 focus:ring-zilion-gold-500" />
          <label htmlFor="terms" className="ml-3 block text-sm text-gray-600">Eu li e aceito os <a href="/termos" target="_blank" className="font-bold text-zilion-gold-600 hover:underline">Termos de Serviço</a> e a <a href="/privacidade" target="_blank" className="font-bold text-zilion-gold-600 hover:underline">Política de Privacidade</a>.</label>
        </div>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center font-medium">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full py-5 px-6 bg-zilion-gold-500 text-black font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-zilion-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
      >
        {loading ? 'Enviando...' : 'Enviar Projeto para Análise'}
      </button>
    </form>
  );
};

// Componente principal da página
export default function SubmeterPage() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><div className="text-zilion-gold-500 animate-pulse font-bold tracking-widest">CARREGANDO...</div></div>;
  }
  if (!user) {
    return <CreatorAuth />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      {/* Dark Hero Section for Header Visibility */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-black z-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6">
              Submeta seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-300 to-zilion-gold-600">Projeto</span>
            </h2>
            <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">
              O primeiro passo para transformar sua HQ em uma franquia global. Preencha os dados abaixo com atenção.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
            <SubmissionForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
