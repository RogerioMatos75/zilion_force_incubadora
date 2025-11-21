// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Definindo um tipo para as submissões para melhor type-safety
interface Submission {
  id: string;
  hqTitle: string;
  statusDetalhado: string;
  submissionDate: string;
  protocoloAtlas: string;
}

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para proteger a rota
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Efeito para buscar os dados do usuário
  useEffect(() => {
    if (user) {
      const fetchSubmissions = async () => {
        setIsFetching(true);
        setError(null);
        try {
          const token = await user.getIdToken();
          const response = await fetch('/api/creator/submissions', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha ao buscar os projetos.');
          }

          const data = await response.json();
          setSubmissions(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsFetching(false);
        }
      };

      fetchSubmissions();
    }
  }, [user]); // Roda sempre que o objeto user mudar

  // Exibe uma mensagem de carregamento geral enquanto a autenticação é verificada
  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  const renderContent = () => {
    if (isFetching) {
      return <p>Carregando projetos...</p>;
    }
    if (error) {
      return <p className="text-red-500">Erro: {error}</p>;
    }
    if (submissions.length === 0) {
      return <p>Você ainda não enviou nenhum projeto.</p>;
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm">Título da HQ</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Protocolo</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Data de Envio</th>
              <th className="text-center py-3 px-4 font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{sub.hqTitle}</td>
                <td className="py-3 px-4 font-mono text-xs">{sub.protocoloAtlas}</td>
                <td className="py-3 px-4">{new Date(sub.submissionDate).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    sub.statusDetalhado === 'recebido' ? 'bg-blue-200 text-blue-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {sub.statusDetalhado.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Renderiza o dashboard se o usuário estiver autenticado
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Meu Dashboard</h1>
      <p className="mb-6">Bem-vindo, {user.displayName || user.email}!</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Meus Projetos Submetidos</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;

