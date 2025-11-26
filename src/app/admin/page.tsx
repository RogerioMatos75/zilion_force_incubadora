'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Importar o Link
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/clientApp';

// Define um tipo para os dados da submissão que virão da API
interface Submission {
  id: string;
  hqTitle: string;
  creatorName: string;
  submissionDate: string;
  status: string;
}

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth(); // Renomeia o 'loading' do AuthContext
  const router = useRouter();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redireciona se o usuário não estiver logado
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    
    // Se o usuário estiver autenticado, busca os dados
    if (user) {
      const fetchSubmissions = async () => {
        try {
          setDataLoading(true);
          
          // Obter o token do usuário logado
          const token = await user.getIdToken();

          // Fazer a chamada à API incluindo o token de autorização
          const response = await fetch('/api/admin/submissions', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Falha ao buscar dados da API.');
          }
          const data = await response.json();
          setSubmissions(data);
        } catch (err) {
          setError('Não foi possível carregar as submissões.');
          console.error(err);
        } finally {
          setDataLoading(false);
        }
      };

      fetchSubmissions();
    }
  }, [user, authLoading, router]);

  // Exibe um estado de carregamento geral
  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Verificando autenticação...</p></div>;
  }

  // Renderiza o painel se o usuário estiver logado
  if (user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center"><h1 className="text-xl font-bold">Conta Administrativa</h1></div>
              <div className="flex items-center">
                <p className="text-sm text-gray-600 mr-4">Logado como: {user.email}</p>
                <button onClick={() => signOut(auth)} className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Sair</button>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Submissões de Projetos</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              {dataLoading ? (
                <p className="p-4 text-center">Carregando submissões...</p>
              ) : error ? (
                <p className="p-4 text-center text-red-600">{error}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título da HQ</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criador</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {submissions.length > 0 ? (
                        submissions.map((submission) => (
                          <tr key={submission.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.hqTitle}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.creatorName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(submission.submissionDate).toLocaleDateString('pt-BR')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {submission.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link href={`/admin/submission/${submission.id}`} className="text-indigo-600 hover:text-indigo-900">
                                Ver Detalhes
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Nenhuma submissão encontrada.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
