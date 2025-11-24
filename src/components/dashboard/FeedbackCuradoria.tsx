import React from 'react';

interface Feedback {
  id: string;
  data: string;
  autor: string;
  mensagem: string;
  tipo: 'Aprovação' | 'Correção' | 'Sugestão';
}

const MOCK_FEEDBACKS: Feedback[] = [
  { id: '1', data: '2025-11-20', autor: 'Curadoria Atlas', mensagem: 'O roteiro do capítulo 1 está excelente. Apenas revise o diálogo da página 5.', tipo: 'Sugestão' },
  { id: '2', data: '2025-11-15', autor: 'Curadoria Atlas', mensagem: 'Concept art dos personagens principais aprovada!', tipo: 'Aprovação' },
];

const FeedbackCuradoria = () => {
  return (
    <div className="bg-zilion-surface border border-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6">Feedback da Curadoria</h3>
      
      <div className="space-y-6 relative pl-4 border-l border-gray-700">
        {MOCK_FEEDBACKS.map((fb) => (
          <div key={fb.id} className="relative">
            <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${fb.tipo === 'Aprovação' ? 'bg-green-500' : fb.tipo === 'Correção' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
            
            <div className="bg-zilion-gray p-4 rounded border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-gray-400">{fb.autor}</span>
                <span className="text-xs text-gray-500">{new Date(fb.data).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-300 text-sm">{fb.mensagem}</p>
              <span className={`text-xs mt-2 inline-block px-2 py-0.5 rounded ${fb.tipo === 'Aprovação' ? 'bg-green-900 text-green-300' : fb.tipo === 'Correção' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                {fb.tipo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackCuradoria;
