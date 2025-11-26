// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/clientApp';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';

// Importando todos os componentes do dashboard
import MeuProjeto from '@/components/dashboard/MeuProjeto';
import UploadForm from '@/components/dashboard/UploadForm';
import MinhasSubmissoes from '@/components/dashboard/MinhasSubmissoes';
import CrivoDoAtlas from '@/components/dashboard/CrivoDoAtlas';
import MentoriasWorkshops from '@/components/dashboard/MentoriasWorkshops';
import DocumentosAssinados from '@/components/dashboard/DocumentosAssinados';
import FeedbackCuradoria from '@/components/dashboard/FeedbackCuradoria';
import MetricasPessoais from '@/components/dashboard/MetricasPessoais';
import SolicitarReuniao from '@/components/dashboard/SolicitarReuniao';
import GuidedTour from '@/components/dashboard/GuidedTour';

// Interface completa da Submissão, agora incluindo todos os campos
interface Submission {
  id: string;
  hqTitle: string;
  statusDetalhado: string;
  submissionDate: string;
  protocoloAtlas: string;
  etapaCerne: string;
  etapaPipeline: any[];
  fileHistory: any[];
  crivoDoAtlas: any[];
  reunioes: any[];
  documentosAssinados: any[];
  feedbacks: any[];
  proximoDeadline?: Timestamp;
  versaoAtual?: string;
}

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para proteger a rota contra usuários não logados
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Efeito para buscar os dados do usuário em tempo real
  useEffect(() => {
    if (!user) return;

    setIsFetching(true);
    const submissionsRef = collection(db, 'submissions');
    const q = query(submissionsRef, where('creatorUid', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userSubmissions: Submission[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const submissionDate = data.submissionDate instanceof Timestamp 
          ? data.submissionDate.toDate().toISOString() 
          : new Date().toISOString();

        userSubmissions.push({
          id: doc.id,
          hqTitle: data.hqTitle || 'N/A',
          statusDetalhado: data.statusDetalhado || 'N/A',
          submissionDate: submissionDate,
          protocoloAtlas: data.protocoloAtlas || 'N/A',
          etapaCerne: data.etapaCerne || 'indefinido',
          etapaPipeline: data.etapaPipeline || [],
          fileHistory: data.fileHistory || [],
          crivoDoAtlas: data.crivoDoAtlas || [],
          reunioes: data.reunioes || [],
          documentosAssinados: data.documentosAssinados || [],
          feedbacks: data.feedbacks || [],
          proximoDeadline: data.proximoDeadline,
          versaoAtual: data.versaoAtual,
        });
      });
      
      setSubmissions(userSubmissions);
      setIsFetching(false);
      setError(null);
    }, (err) => {
      console.error("Dashboard: Erro no listener do Firestore:", err);
      setError('Ocorreu um erro ao carregar seus projetos em tempo real.');
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-zilion-bg flex items-center justify-center">
        <div className="text-zilion-cyan animate-pulse text-xl font-bold">Carregando Zilion Force...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zilion-bg text-white pb-20">
      <GuidedTour />
      {/* Header */}
      <div className="bg-zilion-surface border-b border-gray-800 py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Dashboard do Criador
          </h1>
          <p className="text-gray-400">
            Bem-vindo à incubadora, <span className="text-zilion-cyan font-semibold">{user.displayName || user.email}</span>.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {(() => {
          if (isFetching) {
            return <div className="text-center text-gray-500 py-20">Carregando seus dados...</div>;
          }
          if (error) {
            return <div className="text-center text-red-500 py-20">{error}</div>;
          }
          if (submissions.length === 0) {
            return (
              <div className="bg-zilion-surface border border-gray-800 p-10 rounded-lg text-center max-w-2xl mx-auto mt-10">
                  <h2 className="text-2xl font-bold text-white mb-4">Nenhum Projeto Encontrado</h2>
                  <p className="text-gray-400 mb-6">Você ainda não enviou nenhum projeto ou ele ainda não foi processado pela nossa equipe.</p>
                  <button onClick={() => router.push('/submeter')} className="px-6 py-3 bg-zilion-cyan text-black font-bold rounded hover:shadow-neon-cyan transition-all">
                    Iniciar Nova Submissão
                  </button>
              </div>
            );
          }
          
          const activeSubmission = submissions[0]; 

          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Project Info */}
              <div className="lg:col-span-2 space-y-8">
                <MeuProjeto submission={activeSubmission} />
                <FeedbackCuradoria feedbacks={activeSubmission.feedbacks} />
                <UploadForm submissionId={activeSubmission.id} onUploadSuccess={() => console.log(`Upload para ${activeSubmission.id} concluído.`)} />
                <MinhasSubmissoes fileHistory={activeSubmission.fileHistory} />
              </div>

              {/* Right Column - Sidebar / Tools */}
              <div className="space-y-8">
                <MetricasPessoais proximoDeadline={activeSubmission.proximoDeadline} versaoAtual={activeSubmission.versaoAtual} />
                <SolicitarReuniao />
                <CrivoDoAtlas crivoData={activeSubmission.crivoDoAtlas} />
                <MentoriasWorkshops reunioes={activeSubmission.reunioes} submissionId={activeSubmission.id} />
                <DocumentosAssinados documentos={activeSubmission.documentosAssinados} />
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default DashboardPage;