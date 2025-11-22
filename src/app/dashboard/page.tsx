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

const TableSkeleton = () => (
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
        {[...Array(3)].map((_, i) => (
          <tr key={i} className="border-b animate-pulse">
            <td className="py-3 px-4">
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </td>
            <td className="py-3 px-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </td>
            <td className="py-3 px-4">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </td>
            <td className="py-3 px-4 text-center">
              <div className="h-6 w-24 bg-gray-300 rounded-full mx-auto"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

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
          console.error("Dashboard: Falha ao buscar submissões", err);
          setError('Ocorreu um erro ao carregar seus projetos. Por favor, tente novamente mais tarde.');
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

  const getStatusClasses = (status?: string): string => {
    const defaultClasses = 'bg-gray-200 text-gray-800';
    if (!status) return defaultClasses;

    // Normaliza o status para minúsculas e remove sublinhados para a comparação
    const normalizedStatus = status.toLowerCase().replace(/_/g, '');

    switch (normalizedStatus) {
      case 'aprovado':
      case 'incubacao':
        return 'bg-green-200 text-green-800';
      case 'recebido':
        return 'bg-blue-200 text-blue-800';
      case 'emanalise':
      case 'review':
      case 'ajustesnecessarios':
        return 'bg-yellow-200 text-yellow-800';
      case 'rejeitado':
      case 'naoelegivelpipendente':
        return 'bg-red-200 text-red-800';
      case 'pending':
        return defaultClasses;
      default:
        return defaultClasses;
    }
  };

  // Renderiza o dashboard se o usuário estiver autenticado
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Meu Dashboard</h1>
      <p className="mb-6">Bem-vindo, {user.displayName || user.email}!</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Meus Projetos Submetidos</h2>
        {(() => {
          if (isFetching) {
            return <TableSkeleton />;
          }
          if (error) {
            return <p className="text-red-500">{error}</p>;
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
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(sub.statusDetalhado)}`}>
                          {(sub.statusDetalhado || 'PENDENTE').replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default DashboardPage;

