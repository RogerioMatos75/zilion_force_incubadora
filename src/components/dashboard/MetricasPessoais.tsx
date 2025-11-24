import React from 'react';

const MetricasPessoais = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-zilion-surface p-4 rounded border border-gray-800 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-widest">Próximo Deadline</p>
        <p className="text-2xl font-bold text-white mt-1">5 Dias</p>
      </div>
      <div className="bg-zilion-surface p-4 rounded border border-gray-800 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-widest">Versão Atual</p>
        <p className="text-2xl font-bold text-zilion-magenta mt-1">v1.2</p>
      </div>
    </div>
  );
};

export default MetricasPessoais;
