'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// Tipo expandido para incluir todos os detalhes da submissão
interface SubmissionDetails {
  id: string;
  hqTitle: string;
  creatorName: string;
  creatorEmail?: string;
  synopsis: string;
  submissionDate: string;
  status: string;
  ipDocumentUrl: string;
}

export default function SubmissionDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [submission, setSubmission] = useState<SubmissionDetails | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user && id) {
      const fetchSubmissionDetails = async () => {
        try {
          setDataLoading(true);
          const response = await fetch(`/api/admin/submissions/${id}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar detalhes da submissão.');
          }
          const data = await response.json();
          setSubmission(data);
        } catch (err) {
          setError('Não foi possível carregar os detalhes da submissão.');
          console.error(err);
        } finally {
          setDataLoading(false);
        }
      };

      fetchSubmissionDetails();
    }
  }, [user, authLoading, router, id]);

  const handleUpdateStatus = async (newStatus: 'approved' | 'rejected' | 'review') => {
    if (!submission) return;
    setIsUpdating(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar o status.');
      }
      // Atualiza o estado local para refletir a mudança imediatamente
      setSubmission({ ...submission, status: newStatus });
    } catch (err) {
      setError('Ocorreu um erro ao atualizar o status.');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Carregando detalhes...</p></div>;
  }

  if (error && !submission) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-red-600">{error}</p></div>;
  }

  if (!submission) {
    return <div className="min-h-screen flex items-center justify-center"><p>Submissão não encontrada.</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-indigo-600 hover:text-indigo-900">&larr; Voltar para o Painel</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Detalhes da Submissão</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Análise do projeto "{submission.hqTitle}".</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {/* ...dl content... */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                    submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {submission.status}
                  </span>
                </dd>
              </div>
              {/* ...other dl content... */}
            </dl>
          </div>
        </div>

        {/* Seção de Ações */}
        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Ações</h3>
          {error && <p className="text-sm text-red-600 my-2">{error}</p>}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleUpdateStatus('approved')}
              disabled={isUpdating || submission.status === 'approved'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
            >
              Aprovar
            </button>
            <button
              onClick={() => handleUpdateStatus('rejected')}
              disabled={isUpdating || submission.status === 'rejected'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
            >
              Rejeitar
            </button>
            <button
              onClick={() => handleUpdateStatus('review')}
              disabled={isUpdating || submission.status === 'review'}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200"
            >
              Marcar como "Em Revisão"
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
