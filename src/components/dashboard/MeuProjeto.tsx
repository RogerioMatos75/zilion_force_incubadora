// src/components/dashboard/MeuProjeto.tsx
import React from 'react';
import { Timestamp } from 'firebase/firestore';

// Define a interface para uma única etapa do pipeline
interface PipelineStage {
  etapa: string;
  data: Timestamp;
}

// Define a interface para os dados da submissão que este componente espera
interface SubmissionData {
  hqTitle: string;
  etapaCerne: string;
  etapaPipeline: PipelineStage[];
}

interface MeuProjetoProps {
  submission: SubmissionData;
}

const MeuProjeto: React.FC<MeuProjetoProps> = ({ submission }) => {
  // Converte a data do Firebase para um formato legível
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'Data pendente';
    return timestamp.toDate().toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-zilion-surface text-white p-6 rounded-lg shadow-lg border border-gray-800 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-zilion-cyan/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zilion-cyan to-zilion-purple mb-2 drop-shadow-sm">
        {submission.hqTitle}
      </h3>
      <p className="text-lg mb-8 text-gray-300 flex items-center">
        Status Atual: 
        <span className="ml-3 font-bold px-4 py-1 bg-zilion-cyan/20 text-zilion-cyan border border-zilion-cyan rounded-full shadow-neon-cyan text-sm tracking-wider">
          {submission.etapaCerne.toUpperCase()}
        </span>
      </p>

      <h4 className="font-semibold mb-6 text-gray-400 uppercase tracking-widest text-sm border-b border-gray-800 pb-2">
        Linha do Tempo (Pipeline CERNE)
      </h4>
      
      {/* Container da Timeline */}
      <div className="relative pl-4 border-l-2 border-zilion-purple/50 ml-2">
        {submission.etapaPipeline.map((stage, index) => (
          <div key={index} className="mb-8 relative group">
            {/* Bolinha na timeline */}
            <div className="absolute -left-[21px] top-1 w-4 h-4 bg-zilion-bg rounded-full border-2 border-zilion-cyan group-hover:bg-zilion-cyan group-hover:shadow-neon-cyan transition-all duration-300"></div>
            
            <div className="ml-6 transition-transform duration-300 group-hover:translate-x-1">
              <p className="font-bold text-lg text-gray-100 group-hover:text-zilion-cyan transition-colors">
                {stage.etapa.replace(/_/g, ' ').toUpperCase()}
              </p>
              <p className="text-xs text-gray-500 font-mono">{formatDate(stage.data)}</p>
            </div>
          </div>
        ))}
        {/* Marcador de "Próximas Etapas" */}
         <div className="relative">
            <div className="absolute -left-[21px] top-1 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
            <div className="ml-6">
                <p className="font-bold text-md text-gray-600 tracking-wider">PRÓXIMAS ETAPAS</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MeuProjeto;
