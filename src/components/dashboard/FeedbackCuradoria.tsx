import React from 'react';
import { Timestamp } from 'firebase/firestore';

interface Feedback {
  data: Timestamp;
  autor: string;
  mensagem: string;
  tipo: 'Aprovação' | 'Correção' | 'Sugestão' | 'Informação';
}

interface FeedbackCuradoriaProps {
  feedbacks: Feedback[];
}

const FeedbackCuradoria: React.FC<FeedbackCuradoriaProps> = ({ feedbacks }) => {
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'Data inválida';
    return timestamp.toDate().toLocaleDateString('pt-BR');
  };

  const sortedFeedbacks = [...(feedbacks || [])].sort((a, b) => b.data.toMillis() - a.data.toMillis());

  const getDotColor = (tipo: Feedback['tipo']) => {
    switch (tipo) {
      case 'Aprovação': return 'bg-green-500';
      case 'Correção': return 'bg-red-500';
      case 'Sugestão': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getTagColor = (tipo: Feedback['tipo']) => {
    switch (tipo) {
      case 'Aprovação': return 'bg-green-900 text-green-300';
      case 'Correção': return 'bg-red-900 text-red-300';
      case 'Sugestão': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-blue-900 text-blue-300';
    }
  };

  return (
    <div className="bg-zilion-surface border border-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6">Feedback da Curadoria</h3>
      
      {sortedFeedbacks && sortedFeedbacks.length > 0 ? (
        <div className="space-y-6 relative pl-4 border-l border-gray-700">
          {sortedFeedbacks.map((fb, index) => (
            <div key={index} className="relative">
              <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${getDotColor(fb.tipo)}`}></div>
              
              <div className="bg-zilion-gray p-4 rounded border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-gray-400">{fb.autor}</span>
                  <span className="text-xs text-gray-500">{formatDate(fb.data)}</span>
                </div>
                <p className="text-gray-300 text-sm">{fb.mensagem}</p>
                <span className={`text-xs mt-2 inline-block px-2 py-0.5 rounded ${getTagColor(fb.tipo)}`}>
                  {fb.tipo}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm text-center py-4">Nenhum feedback da curadoria recebido ainda.</p>
      )}
    </div>
  );
};

export default FeedbackCuradoria;
