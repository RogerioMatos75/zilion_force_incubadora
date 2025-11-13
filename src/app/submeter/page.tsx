'use client';

import { useState } from 'react';
import { db, storage } from '@/lib/firebase/clientApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SubmeterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!file) {
      setError('Por favor, selecione o documento de PI.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const hqTitle = formData.get('hqTitle') as string;
      const creatorName = formData.get('creatorName') as string;
      const synopsis = formData.get('synopsis') as string;

      // 1. Upload do arquivo para o Firebase Storage
      // Nota: A regra de segurança que escrevemos espera um ID de usuário.
      // Como este formulário é público, usaremos um caminho mais simples por enquanto.
      // As regras de segurança precisarão ser ajustadas para permitir esta escrita pública.
      const fileRef = ref(storage, `submissions/${Date.now()}-${file.name}`);
      const uploadResult = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // 2. Salvar os dados da submissão no Firestore
      await addDoc(collection(db, 'submissions'), {
        creatorName,
        hqTitle,
        synopsis,
        ipDocumentUrl: downloadURL,
        submissionDate: serverTimestamp(),
        status: 'pending',
      });

      setSuccess(true);
      (e.target as HTMLFormElement).reset();

    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao enviar o projeto. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Submeta seu Projeto de HQ
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Preencha os campos abaixo para iniciar o processo de incubação.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success ? (
            <div className="text-center">
              <h3 className="text-lg font-medium text-green-800">Projeto Enviado com Sucesso!</h3>
              <p className="mt-2 text-sm text-gray-600">
                Sua submissão foi recebida. Entraremos em contato em breve.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar Outro Projeto
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos do formulário... */}
              <div>
                <label htmlFor="creatorName" className="block text-sm font-medium text-gray-700">
                  Seu Nome Completo
                </label>
                <div className="mt-1">
                  <input id="creatorName" name="creatorName" type="text" required disabled={loading} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50" />
                </div>
              </div>
              <div>
                <label htmlFor="hqTitle" className="block text-sm font-medium text-gray-700">
                  Título da Obra (HQ)
                </label>
                <div className="mt-1">
                  <input id="hqTitle" name="hqTitle" type="text" required disabled={loading} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50" />
                </div>
              </div>
              <div>
                <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">
                  Sinopse
                </label>
                <div className="mt-1">
                  <textarea id="synopsis" name="synopsis" rows={4} required disabled={loading} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50" />
                </div>
              </div>
              <div>
                <label htmlFor="ipDocument" className="block text-sm font-medium text-gray-700">
                  Documento de Comprovação de PI (PDF, PNG, JPG)
                </label>
                <div className="mt-1">
                  <input id="ipDocument" name="ipDocument" type="file" required disabled={loading} accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50" />
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                  {loading ? 'Enviando...' : 'Enviar Projeto'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
