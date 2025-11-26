import React from 'react';
import { Timestamp } from 'firebase/firestore';

interface MetricasPessoaisProps {
  proximoDeadline?: Timestamp;
  versaoAtual?: string;
}

const MetricasPessoais: React.FC<MetricasPessoaisProps> = ({ proximoDeadline, versaoAtual }) => {

  const calculateDaysRemaining = (deadline?: Timestamp): string => {
    if (!deadline) return 'N/A';
    
    const today = new Date();
    const deadlineDate = deadline.toDate();
    const differenceInTime = deadlineDate.getTime() - today.getTime();
    
    if (differenceInTime < 0) {
      return 'Atrasado';
    }

    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    if (differenceInDays === 0) {
      return 'Hoje!';
    }
    if (differenceInDays === 1) {
      return '1 Dia';
    }

    return `${differenceInDays} Dias`;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-zilion-surface p-4 rounded border border-gray-800 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-widest">Próximo Deadline</p>
        <p className="text-2xl font-bold text-white mt-1">
          {calculateDaysRemaining(proximoDeadline)}
        </p>
      </div>
      <div className="bg-zilion-surface p-4 rounded border border-gray-800 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-widest">Versão Atual</p>
        <p className="text-2xl font-bold text-zilion-magenta mt-1">
          {versaoAtual || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default MetricasPessoais;
