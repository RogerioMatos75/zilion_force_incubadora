'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Timestamp } from 'firebase/firestore';
import EnviarFeedback from '@/components/admin/submission/EnviarFeedback';
import GerenciarMetricas from '@/components/admin/submission/GerenciarMetricas';
import AdicionarDocumento from '@/components/admin/submission/AdicionarDocumento';

// Tipo expandido para incluir os novos campos do pipeline
interface SubmissionDetails {
  id: string;
  hqTitle: string;
  creatorName: string;
  creatorEmail?: string;
  synopsis: string;
  submissionDate: string;
  status: string; // Manter para compatibilidade/referência, mas focar em etapaPipeline
  etapaPipeline: string;
  feedbackAnalise?: string;
  pontuacao?: number;
  ipDocumentUrl?: string;
  hqSampleUrl?: string;
  proximoDeadline?: Timestamp;
  versaoAtual?: string;
}

// Etapas do Pipeline para o seletor
const pipelineStages = [
  { id: 'recebido', label: 'Submissão Recebida' },
  { id: 'analise_preliminar', label: "Análise Preliminar (Crivo do Atlas)" },
  { id: 'mentoria_inicial', label: 'Mentoria Inicial (Conceito e PI)' },
  { id: 'workshop_fundamentos', label: 'Workshop de Fundamentos' },
  { id: 'validacao_mercado', label: 'Validação de Mercado' },
  { id: 'incubacao_plena', label: 'INCUBACAO PLENA' },
  { id: 'pos_incubacao', label: 'PÓS-INCUBAÇÃO' },
  { id: 'rejeitado', label: 'Rejeitado' },
  { id: 'graduado', label: 'Graduado' },
];

export default function SubmissionDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [submission, setSubmission] = useState<SubmissionDetails | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para o formulário de gerenciamento
  const [etapa, setEtapa] = useState('');
  const [feedback, setFeedback] = useState('');
  const [pontuacao, setPontuacao] = useState<number | string>('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
      return;
    }
    if (user && id) {
      const fetchSubmissionDetails = async () => {
        try {
          setDataLoading(true);
          const token = await user.getIdToken(); // Obtém o token de autenticação
          const response = await fetch(`/api/admin/submissions/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`, // Adiciona o cabeçalho
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Sessão inválida. Por favor, faça login novamente.');
            }
            throw new Error('Falha ao buscar detalhes da submissão.');
          }
          
          const data: SubmissionDetails = await response.json();
          setSubmission(data);
          // Inicializa os estados do formulário com os dados carregados
          setEtapa(data.etapaPipeline || 'recebido');
          setFeedback(data.feedbackAnalise || '');
          setPontuacao(data.pontuacao || '');

        } catch (err: any) {
          setError(err.message || 'Não foi possível carregar os detalhes da submissão.');
        } finally {
          setDataLoading(false);
        }
      };
      fetchSubmissionDetails();
    }
  }, [user, authLoading, router, id]);

  const handlePipelineUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!submission) return;

    setIsUpdating(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          etapaPipeline: etapa,
          feedbackAnalise: feedback,
          pontuacao: Number(pontuacao),
          status: etapa, // Atualiza o status legado para consistência
        }),
      });

      if (!response.ok) throw new Error('Falha ao atualizar o pipeline.');
      
      const updatedSubmission = await response.json();
      setSubmission(updatedSubmission); // Atualiza o estado local para refletir a mudança
      
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao atualizar.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Carregando detalhes...</p></div>;
  }
  if (!submission) {
    return <div className="min-h-screen flex items-center justify-center"><p>{error || 'Submissão não encontrada.'}</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navegação */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-zilion-gold-600 hover:text-zilion-gold-500 font-bold uppercase tracking-wider text-xs flex items-center">
                <span className="mr-2 text-lg">&larr;</span> Voltar para o Painel
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Detalhes da Submissão */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
           {/* ... (código para exibir os detalhes da submissão como dl/dt/dd pode ser mantido aqui) ... */}
           <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Detalhes da Submissão</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Análise do projeto "{submission.hqTitle}".</p>
          </div>
        </div>

        {/* Painel de Gerenciamento do Pipeline */}
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Painel de Gerenciamento do Pipeline</h3>
            {error && <p className="text-sm text-red-600 my-2">{error}</p>}
            
            <form onSubmit={handlePipelineUpdate} className="mt-4 space-y-6">
              <div>
                <label htmlFor="etapaPipeline" className="block text-sm font-medium text-gray-700">Etapa Atual do Pipeline</label>
                <select
                  id="etapaPipeline"
                  value={etapa}
                  onChange={(e) => setEtapa(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {pipelineStages.map((stage) => (
                    <option key={stage.id} value={stage.id}>{stage.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="feedbackAnalise" className="block text-sm font-medium text-gray-700">Feedback da Análise / Comentários</label>
                <textarea
                  id="feedbackAnalise"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label htmlFor="pontuacao" className="block text-sm font-medium text-gray-700">Pontuação (0-100)</label>
                <input
                  type="number"
                  id="pontuacao"
                  value={pontuacao}
                  onChange={(e) => setPontuacao(e.target.value)}
                  min="0"
                  max="100"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold uppercase tracking-widest rounded-md shadow-sm text-black bg-zilion-gold-500 hover:bg-zilion-gold-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:bg-gray-400 transition-all duration-300"
                >
                  {isUpdating ? 'Salvando...' : 'Salvar Atualizações'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <EnviarFeedback submissionId={submission.id} />

        <GerenciarMetricas 
          submissionId={submission.id}
          initialDeadline={submission.proximoDeadline} 
          initialVersao={submission.versaoAtual} 
        />

        <AdicionarDocumento submissionId={submission.id} />
      </main>
    </div>
  );
}

