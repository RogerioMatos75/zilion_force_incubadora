// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import MeuProjeto from '@/components/dashboard/MeuProjeto';
import MetricasPessoais from '@/components/dashboard/MetricasPessoais';
import UploadForm from '@/components/dashboard/UploadForm';
import MinhasSubmissoes from '@/components/dashboard/MinhasSubmissoes';
import CrivoDoAtlas from '@/components/dashboard/CrivoDoAtlas';
import FeedbackCuradoria from '@/components/dashboard/FeedbackCuradoria';
import MentoriasWorkshops from '@/components/dashboard/MentoriasWorkshops';
import Agenda from '@/components/dashboard/Agenda';
import DocumentosAssinados from '@/components/dashboard/DocumentosAssinados';
import GuidedTour from '@/components/dashboard/GuidedTour';
import SolicitarReuniao from '@/components/dashboard/SolicitarReuniao';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showTour, setShowTour] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/creator/submissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao carregar submissões');
      }

      const data = await response.json();
      setSubmissions(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setIsFetching(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      // Check if it's the first time user visits dashboard
      const hasSeenTour = localStorage.getItem('hasSeenTour');
      if (!hasSeenTour) {
        setShowTour(true);
      }
      fetchSubmissions();
    }
  }, [user, loading, router, fetchSubmissions]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zilion-gold-500 animate-pulse text-xl font-bold tracking-widest uppercase">Carregando Zilion Force...</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white pb-20 pt-24">
      <GuidedTour />
      {/* Header do Dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border-b border-white/10 py-10 mb-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Dashboard do <span className="text-zilion-gold-500">Criador</span>
          </h1>
          <p className="text-gray-400">
            Bem-vindo à incubadora, <span className="text-white font-semibold">{user.displayName || user.email}</span>.
          </p>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-6">
        {(() => {
          if (isFetching) {
            return <div className="text-center text-gray-500 py-20 animate-pulse">Sincronizando dados da incubadora...</div>;
          }
          if (error) {
            return <div className="text-center text-red-500 py-20 bg-red-900/10 rounded-lg border border-red-900/30">{error}</div>;
          }
          if (submissions.length === 0) {
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 p-12 rounded-2xl text-center max-w-2xl mx-auto mt-10 backdrop-blur-sm"
              >
                  <h2 className="text-3xl font-bold text-white mb-4">Nenhum Projeto Encontrado</h2>
                  <p className="text-gray-400 mb-8 text-lg">Você ainda não enviou nenhum projeto ou ele ainda não foi processado pela nossa equipe.</p>
                  <button onClick={() => router.push('/submeter')} className="px-8 py-4 bg-zilion-gold-500 text-black font-bold uppercase tracking-widest rounded hover:bg-zilion-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
                    Iniciar Nova Submissão
                  </button>
              </motion.div>
            );
          }
          
          const activeSubmission = submissions[0]; 

          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
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
            </motion.div>
          );
        })()}
      </div>
    </div>
  );
};