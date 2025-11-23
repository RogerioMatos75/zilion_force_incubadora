'use client';

import { useState } from 'react';
import Link from 'next/link';

const PhaseSection = ({ title, duration, focus, children, isOpen, onToggle }) => (
  <div className="mb-8 border border-gray-700 rounded-lg">
    <button
      onClick={onToggle}
      className="w-full p-6 text-left bg-gray-800 hover:bg-gray-700 rounded-t-lg focus:outline-none"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-400">{title}</h2>
          <p className="text-gray-400 mt-1"><strong>Duração Média:</strong> {duration} | <strong>Foco:</strong> {focus}</p>
        </div>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </div>
    </button>
    {isOpen && (
      <div className="p-6 bg-gray-900 rounded-b-lg">
        <div className="relative border-l-2 border-blue-500 ml-4 pl-8 space-y-8">
          {children}
        </div>
      </div>
    )}
  </div>
);

const TimelineItem = ({ time, title, incubatorAction, creatorAction, deliverable }) => (
  <div className="relative">
    <div className="absolute -left-10 w-4 h-4 bg-blue-500 rounded-full mt-1.5"></div>
    <p className="text-sm font-semibold text-blue-300">{time}</p>
    <h3 className="text-xl font-bold mt-1">{title}</h3>
    {incubatorAction && <p className="mt-2 text-sm"><strong className="text-gray-300">Ação da Incubadora:</strong> <span className="text-gray-400">{incubatorAction}</span></p>}
    {creatorAction && <p className="mt-1 text-sm"><strong className="text-gray-300">Ação do Incubado:</strong> <span className="text-gray-400">{creatorAction}</span></p>}
    {deliverable && <p className="mt-1 text-sm"><strong className="text-gray-300">Entregável / Meta:</strong> <span className="text-gray-400">{deliverable}</span></p>}
  </div>
);

const PipelinePage = () => {
  const [openSection, setOpenSection] = useState('fase0');

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold">O Pipeline Completo da Incubação</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Nossa metodologia transparente, fase a fase. Entenda a jornada completa do seu projeto na Zilion Force.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FASE 0 */}
          <PhaseSection
            title="FASE 0: Pré-Incubação"
            duration="1 a 3 meses"
            focus="Validação e Proteção da PI"
            isOpen={openSection === 'fase0'}
            onToggle={() => handleToggle('fase0')}
          >
            <TimelineItem
              time="DIA 0"
              title="Submissão do Projeto no Terminal do Atlas"
              creatorAction="Preenche formulário online detalhado e anexa comprovante de registro de direitos autorais da HQ (obrigatório)."
              deliverable="Submissão completa recebida."
            />
            <TimelineItem
              time="DIAS 1-7"
              title="Análise Preliminar e 'Crivo do Atlas' de PI"
              incubatorAction="Equipe realiza a primeira triagem, verificando a documentação de PI, potencial criativo, alinhamento editorial e potencial de mercado."
              deliverable="Relatório de triagem inicial."
            />
            <TimelineItem
              time="DIAS 8-15"
              title="Primeira Mentoria (Conceito e PI)"
              incubatorAction="Reunião inicial com o criador para discussão aprofundada da HQ, personagens, lore e esclarecimento sobre a importância e lacunas no registro da PI."
              creatorAction="Preparar-se para a mentoria, apresentar a visão do projeto."
              deliverable="Minuta de Acordo de Confidencialidade (NDA) assinada e ata da mentoria."
            />
             <TimelineItem
              time="DIAS 16-30"
              title="Workshop 'Fundamentos da Adaptação Audiovisual'"
              incubatorAction="Oferecer workshop sobre adaptação de HQ para roteiro, pitch e mercado audiovisual brasileiro (leis, fomento, players)."
              creatorAction="Participar do workshop e revisar o conceito da HQ sob a ótica audiovisual."
              deliverable="Participação comprovada no workshop e versão aprimorada do pitch."
            />
            <TimelineItem
              time="MÊS 2-3"
              title="Validação de Mercado e Decisão de Pré-Incubação"
              incubatorAction="Realizar pesquisa de mercado e uma segunda rodada do 'Crivo do Atlas' para decidir sobre o avanço para a Incubação Plena."
              creatorAction="Apresentar um 'mini-plano de conceito' atualizado com argumentos de mercado."
              deliverable="Relatório final da Pré-Incubação e assinatura do Contrato de Incubação para os selecionados."
            />
          </PhaseSection>

          {/* FASE 1 */}
          <PhaseSection
            title="FASE 1: Incubação Plena"
            duration="6 a 12 meses"
            focus="Estruturação do Negócio e Produção"
            isOpen={openSection === 'fase1'}
            onToggle={() => handleToggle('fase1')}
          >
            <TimelineItem
              time="MÊS 1"
              title="Kick-off e Mapeamento de Equipe"
              incubatorAction="Reunião formal de kick-off, apresentação de mentores e introdução às ferramentas de gestão."
              creatorAction="Mapear necessidades de equipe (roteirista, artista, etc.) e iniciar recrutamento com apoio da incubadora."
              deliverable="Plano de trabalho detalhado do projeto para o período de incubação."
            />
            <TimelineItem
              time="MÊS 1-2"
              title="Mentoria em 'Gestão de PI na Prática' e 'Produção Executiva'"
              incubatorAction="Mentoria focada em contratos, direitos de imagem, licenças e registro de PBI na ANCINE. Curso sobre orçamento e editais."
              creatorAction="Regularizar contratos com equipe, elaborar plano de negócios e de produção executiva."
              deliverable="Registro da produtora como PBI na ANCINE e plano de negócios 1.0."
            />
            <TimelineItem
              time="MÊS 3-6"
              title="Desenvolvimento Criativo Aprofundado e Prototipagem"
              incubatorAction="Mentoria contínua para roteiro, direção de arte e construção de mundo."
              creatorAction="Produção de material demonstrativo (primeiros capítulos da HQ, storyboard animado, teaser, pitch deck)."
              deliverable="Protótipo ou 'piloto' da HQ/AV, pitch deck audiovisual completo."
            />
            <TimelineItem
              time="MÊS 7-9"
              title="Captação de Recursos e Acesso ao Fomento"
              incubatorAction="Mentoria e workshops sobre como preparar projetos para chamadas do FSA (ANCINE/BNDES), leis de incentivo e rodadas de investimento."
              creatorAction="Submeter projetos a editais, participar de rodadas de pitch, buscar investidores."
              deliverable="Projetos submetidos a pelo menos 2 editais/chamadas."
            />
             <TimelineItem
              time="MÊS 10-12"
              title="Análise de Viabilidade e Preparação para Mercado"
              incubatorAction="Revisão crítica do plano de negócios e de produção, análise de riscos e estratégias de entrada no mercado."
              creatorAction="Finalizar plano de negócios, ajustar projeções financeiras, preparar material para comercialização."
              deliverable="Plano de negócios final, plano de marketing e distribuição preliminar."
            />
          </PhaseSection>

          {/* FASE 2 */}
          <PhaseSection
            title="FASE 2: Pós-Incubação"
            duration="6 a 12 meses (pós-incubação)"
            focus="Comercialização e Escala"
            isOpen={openSection === 'fase2'}
            onToggle={() => handleToggle('fase2')}
          >
             <TimelineItem
              time="MÊS 1-3"
              title="Lançamento e Estratégia de Distribuição"
              incubatorAction="Apoio na negociação de contratos com plataformas de streaming, TV e cinemas. Consultoria em marketing de lançamento."
              creatorAction="Lançar a HQ e/ou adaptação audiovisual, executar o plano de marketing."
              deliverable="Contrato de distribuição/exibição assinado, campanha de marketing em andamento."
            />
            <TimelineItem
              time="MÊS 4-6"
              title="Gestão de Direitos e Licenciamento (Novas Janelas)"
              incubatorAction="Mentoria em estratégias de licenciamento de PI para outros produtos (merchandising, jogos, etc.) e expansão internacional."
              creatorAction="Explorar oportunidades de licenciamento, gerenciar direitos, buscar novos mercados."
              deliverable="Novas parcerias de licenciamento ou vendas internacionais."
            />
            <TimelineItem
              time="MÊS 7-9"
              title="Monitoramento e Otimização"
              incubatorAction="Acompanhamento do desempenho do projeto (audiência, receita, ROI), consultoria para otimização contínua."
              creatorAction="Analisar dados, implementar melhorias, planejar futuras temporadas/expansões."
              deliverable="Relatórios de performance, plano de otimização."
            />
            <TimelineItem
              time="MÊS 10-12"
              title="Graduação e Sustentabilidade"
              incubatorAction="Avaliação final do sucesso do projeto e da empresa incubada. Formalização da graduação."
              creatorAction="A empresa está consolidada e autossuficiente."
              deliverable="Empresa graduada com modelo de negócio sustentável e escalável. Sucesso no mercado e/ou Certificado de Produto Brasileiro (CPB) obtido."
            />
          </PhaseSection>
        </div>

        <div className="text-center mt-16">
          <Link href="/submeter" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Pronto para começar sua jornada? Submeta seu projeto
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PipelinePage;

