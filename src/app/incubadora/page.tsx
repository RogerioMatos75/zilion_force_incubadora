'use client';

import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Tipos ---
type PhaseSectionProps = {
  title: string;
  duration: string;
  focus: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

type TimelineItemProps = {
  time: string;
  title: string;
  incubatorAction?: string;
  creatorAction?: string;
  deliverable?: string;
};

// --- Componentes Reestilizados ---

const PhaseSection = ({ title, duration, focus, children, isOpen, onToggle }: PhaseSectionProps) => (
  <motion.div 
    layout 
    className="mb-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
  >
    <motion.button
      layout
      onClick={onToggle}
      className="w-full p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-zilion-gold-500">{title}</h2>
          <p className="text-gray-400 mt-2 text-sm">
            <span className="font-semibold text-gray-300">Duração:</span> {duration} | <span className="font-semibold text-gray-300">Foco:</span> {focus}
          </p>
        </div>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-zilion-gold-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </motion.span>
      </div>
    </motion.button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="p-6 md:p-8 border-t border-white/10">
            <div className="relative border-l-2 border-zilion-gold-500/30 ml-4 pl-8 space-y-10">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const TimelineItem = ({ time, title, incubatorAction, creatorAction, deliverable }: TimelineItemProps) => (
  <div className="relative">
    <div className="absolute -left-[38px] w-5 h-5 bg-zilion-gold-500 rounded-full mt-1 border-4 border-black box-content"></div>
    <p className="text-sm font-semibold text-zilion-gold-400 uppercase tracking-wider">{time}</p>
    <h3 className="text-xl font-bold mt-2 text-white">{title}</h3>
    {incubatorAction && <p className="mt-3 text-sm text-gray-400"><strong className="text-gray-200">Ação da Incubadora:</strong> {incubatorAction}</p>}
    {creatorAction && <p className="mt-1 text-sm text-gray-400"><strong className="text-gray-200">Ação do Incubado:</strong> {creatorAction}</p>}
    {deliverable && <p className="mt-3 font-medium text-sm text-gray-300"><strong className="text-zilion-gold-500">Entregável / Meta:</strong> {deliverable}</p>}
  </div>
);

// --- Página Principal Refatorada ---
const PipelinePage = () => {
  const [openSection, setOpenSection] = useState<string | null>('fase0');

  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-black text-white">
      <main className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Cabeçalho */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-400 to-zilion-gold-600">Pipeline</span> da Incubação
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
            Nossa metodologia transparente, fase a fase. Entenda a jornada completa do seu projeto na Zilion Force.
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="max-w-4xl mx-auto">
          <PhaseSection
            title="FASE 0: PRÉ-INCUBAÇÃO"
            duration="1 a 3 meses"
            focus="Validação e Proteção da PI"
            isOpen={openSection === 'fase0'}
            onToggle={() => handleToggle('fase0')}
          >
            <TimelineItem time="DIA 0" title="Submissão do Projeto" creatorAction="Preenche formulário detalhado e anexa comprovante de registro de direitos autorais." deliverable="Submissão completa recebida." />
            <TimelineItem time="DIAS 1-7" title="Análise Preliminar 'Crivo do Atlas'" incubatorAction="Triagem de documentação de PI, potencial criativo e alinhamento editorial." deliverable="Relatório de triagem inicial." />
            <TimelineItem time="DIAS 8-15" title="Mentoria de Conceito e PI" incubatorAction="Reunião com criador para discussão da HQ, lore e lacunas no registro da PI." deliverable="NDA assinado e ata da mentoria." />
            <TimelineItem time="DIAS 16-30" title="Workshop 'Fundamentos da Adaptação'" incubatorAction="Workshop sobre adaptação de HQ para roteiro audiovisual e mercado." deliverable="Participação comprovada e pitch aprimorado." />
            <TimelineItem time="MÊS 2-3" title="Decisão de Pré-Incubação" incubatorAction="Pesquisa de mercado e segunda rodada do 'Crivo do Atlas' para decisão final." deliverable="Contrato de Incubação assinado pelos selecionados." />
          </PhaseSection>

          <PhaseSection
            title="FASE 1: INCUBAÇÃO PLENA"
            duration="6 a 12 meses"
            focus="Estruturação do Negócio e Produção"
            isOpen={openSection === 'fase1'}
            onToggle={() => handleToggle('fase1')}
          >
            <TimelineItem time="MÊS 1" title="Kick-off e Mapeamento de Equipe" incubatorAction="Reunião formal, apresentação de mentores e ferramentas." deliverable="Plano de trabalho detalhado do projeto." />
            <TimelineItem time="MÊS 1-2" title="Mentoria em Gestão e Produção" incubatorAction="Foco em contratos, direitos, licenças e registro PBI na ANCINE." deliverable="Registro da produtora como PBI na ANCINE." />
            <TimelineItem time="MÊS 3-6" title="Desenvolvimento e Prototipagem" creatorAction="Produção de material demonstrativo (teaser, pitch deck, storyboard)." deliverable="Protótipo ou 'piloto' do projeto e pitch deck completo." />
            <TimelineItem time="MÊS 7-9" title="Captação de Recursos" incubatorAction="Mentoria sobre como preparar projetos para chamadas do FSA e leis de incentivo." deliverable="Projetos submetidos a pelo menos 2 editais." />
            <TimelineItem time="MÊS 10-12" title="Preparação para Mercado" incubatorAction="Revisão crítica do plano de negócios e estratégias de entrada no mercado." deliverable="Plano de negócios e marketing finalizados." />
          </PhaseSection>

          <PhaseSection
            title="FASE 2: PÓS-INCUBAÇÃO"
            duration="6 a 12 meses"
            focus="Comercialização e Escala"
            isOpen={openSection === 'fase2'}
            onToggle={() => handleToggle('fase2')}
          >
            <TimelineItem time="MÊS 1-3" title="Lançamento e Distribuição" incubatorAction="Apoio na negociação de contratos com plataformas de streaming, TV, etc." deliverable="Contrato de distribuição/exibição assinado." />
            <TimelineItem time="MÊS 4-6" title="Gestão de Direitos e Licenciamento" incubatorAction="Mentoria em estratégias de licenciamento para outros produtos e expansão internacional." deliverable="Novas parcerias de licenciamento." />
            <TimelineItem time="MÊS 7-9" title="Monitoramento e Otimização" incubatorAction="Acompanhamento do desempenho do projeto (audiência, receita, ROI)." deliverable="Relatórios de performance e plano de otimização." />
            <TimelineItem time="MÊS 10-12" title="Graduação e Sustentabilidade" incubatorAction="Avaliação final do sucesso do projeto e da empresa incubada." deliverable="Empresa graduada com modelo de negócio sustentável." />
          </PhaseSection>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-20">
            <Link href="/submeter" className="group relative inline-block px-8 py-4 bg-zilion-gold-500 text-black font-bold text-sm uppercase tracking-widest rounded overflow-hidden hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300">
                <span className="relative z-10">Submeter Projeto Agora</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
        </div>

        {/* Seção de Detalhes Estratégicos Reestilizada */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto mt-24"
        >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-zilion-gold-500 mb-8 text-center">Nossa Estratégia e Metas</h2>
                
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Coluna Esquerda */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Nossos Objetivos</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
                                <li>Estrutura Legal robusta e governança clara.</li>
                                <li>Códice Operacional para consistência do ecossistema.</li>
                                <li>Hub Operacional Online com vitrine e submissão.</li>
                                <li>Padronização de conteúdo para estabelecer autoridade.</li>
                                <li>Consolidar 10 projetos e 2 pilotos até 2026.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Marcos do Projeto</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
                                <li>Estrutura Legal: Certidão da Junta Comercial e INPI.</li>
                                <li>Códice do Atlas: Versão 1.0 aprovada.</li>
                                <li>Plataforma Central: Site no ar com NDA automático.</li>
                                <li>Forja de conteúdo: 3 meses de publicação consistente.</li>
                                <li>Plano de Dispersão: Junho de 2026, com 1º piloto filmado.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Coluna Direita */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-3">As 5 Camadas do Atlas</h3>
                        <p className="text-gray-400 mb-4 text-sm">Foco em execução em até 90 dias para a estrutura básica:</p>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><strong>PROTOCOLO DE FUNDAÇÃO:</strong> Validação de Contrato Social e marca no INPI.</li>
                            <li><strong>CÓDICE DO ATLAS:</strong> Consolidação de todos os documentos mestres.</li>
                            <li><strong>O TERMINAL:</strong> Estruturação do site com sistema de submissão.</li>
                            <li><strong>A LINHA DE MONTAGEM:</strong> Definição de pipeline de produção de conteúdo.</li>
                            <li><strong>A REDE NEURAL NARRATIVA:</strong> Estratégia de expansão com foco em parcerias.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PipelinePage;
