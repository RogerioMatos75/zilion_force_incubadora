import { motion } from 'framer-motion';
import { useState } from 'react';

interface Reuniao {
  reuniaoId: number | string; // Alterado de 'id' para 'reuniaoId'
  titulo: string;
  data: string;
  instrutor: string;
  confirmado: boolean;
}

interface MentoriasWorkshopsProps {
  reunioes?: Reuniao[];
  submissionId?: string;
}

const MentoriasWorkshops: React.FC<MentoriasWorkshopsProps> = ({ reunioes, submissionId }) => {
  const [confirming, setConfirming] = useState<number | string | null>(null);

  const defaultEventos = [
    { reuniaoId: 'default_1', titulo: 'Workshop de Roteiro', data: '2023-11-20', instrutor: 'Alan Moore (IA)', confirmado: false },
    { reuniaoId: 'default_2', titulo: 'Mentoria de Arte', data: '2023-11-25', instrutor: 'Alex Ross (IA)', confirmado: true },
  ];

  const hasValidReunioes = Array.isArray(reunioes) && reunioes.length > 0 && typeof reunioes[0] === 'object' && reunioes[0] !== null;

  const eventos = hasValidReunioes ? (reunioes as Reuniao[]) : defaultEventos;

  const handleConfirm = (reuniaoId: number | string) => { // Alterado para reuniaoId
    setConfirming(reuniaoId); // Alterado para reuniaoId
    // TODO: Implement actual confirmation logic using submissionId
    setTimeout(() => {
        setConfirming(null);
        alert('Presença confirmada!');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="bg-white/10 p-2 rounded-lg mr-3 text-xl">🎓</span>
        Mentorias e Workshops
      </h3>
      
      <div className="space-y-4">
        {eventos.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Nenhuma mentoria agendada.</p>
        ) : (
            eventos.map((evento) => (
            <div key={evento.reuniaoId} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 hover:bg-white/5 transition-all duration-300">
                <div>
                <h4 className="font-bold text-white">{evento.titulo}</h4>
                <p className="text-sm text-gray-400">
                    {evento.data} • <span className="text-zilion-gold-500">{evento.instrutor}</span>
                </p>
                </div>
                
                {evento.confirmado ? (
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded-full border border-green-900/50">
                        Confirmado
                    </span>
                ) : (
                    <button 
                        onClick={() => handleConfirm(evento.reuniaoId)} // Alterado para reuniaoId
                        disabled={confirming === evento.reuniaoId} // Alterado para reuniaoId
                        className="px-4 py-2 bg-zilion-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-zilion-gold-400 transition-colors disabled:opacity-50"
                    >
                        {confirming === evento.reuniaoId ? '...' : 'Confirmar'}
                    </button>
                )}
            </div>
            ))
        )}
      </div>
    </motion.div>
  );
};

export default MentoriasWorkshops;
