import { motion } from 'framer-motion';

interface Feedback {
  id: number | string;
  autor: string;
  mensagem: string;
  data: string;
  tipo: 'positivo' | 'sugestao' | 'critica' | string;
}

interface FeedbackCuradoriaProps {
  feedbacks?: Feedback[];
}

const FeedbackCuradoria: React.FC<FeedbackCuradoriaProps> = ({ feedbacks }) => {
  const defaultFeedbacks = [
    { id: 1, autor: 'Curador Chefe', mensagem: 'Excelente desenvolvimento de personagem.', data: '2 dias atrás', tipo: 'positivo' },
    { id: 2, autor: 'Mentor de Arte', mensagem: 'A paleta de cores precisa de mais contraste.', data: '5 dias atrás', tipo: 'sugestao' },
  ];

  // Verifica se 'feedbacks' é um array e se o primeiro elemento é um objeto válido, não uma string.
  // Isso previne o erro quando a API retorna `['']`.
  const hasValidFeedbacks = Array.isArray(feedbacks) && feedbacks.length > 0 && typeof feedbacks[0] === 'object' && feedbacks[0] !== null;

  const feedbackList = hasValidFeedbacks ? (feedbacks as Feedback[]) : defaultFeedbacks;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="bg-white/10 p-2 rounded-lg mr-3 text-xl">💬</span>
        Feedback da Curadoria
      </h3>
      
      <div className="space-y-6 relative">
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-white/10"></div>
        
        {feedbackList.length === 0 ? (
            <p className="pl-10 text-sm text-gray-500 italic">Nenhum feedback recebido ainda.</p>
        ) : (
            feedbackList.map((feedback) => (
            <div key={feedback.id} className="relative pl-10">
                <div className={`absolute left-[13px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-black ${
                    feedback.tipo === 'positivo' ? 'bg-green-500' : 'bg-zilion-gold-500'
                }`}></div>
                
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-white">{feedback.autor}</span>
                        <span className="text-xs text-gray-500">{feedback.data}</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">"{feedback.mensagem}"</p>
                </div>
            </div>
            ))
        )}
      </div>
    </motion.div>
  );
};

export default FeedbackCuradoria;
