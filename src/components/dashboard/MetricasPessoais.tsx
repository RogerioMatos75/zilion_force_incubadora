import { motion } from 'framer-motion';

interface MetricasPessoaisProps {
  proximoDeadline?: string;
  versaoAtual?: string;
}

const MetricasPessoais: React.FC<MetricasPessoaisProps> = ({ proximoDeadline = "20/07/2024", versaoAtual = "v1.2.0" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Próximo Deadline</h3>
            <span className="text-xl">⏳</span>
        </div>
        <p className="text-3xl font-bold text-white mb-1">{proximoDeadline}</p>
        <p className="text-xs text-zilion-gold-500">Faltam 15 dias</p>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Versão Atual</h3>
            <span className="text-xl">🚀</span>
        </div>
        <p className="text-3xl font-bold text-white mb-1">{versaoAtual}</p>
        <p className="text-xs text-green-400">Em dia com o cronograma</p>
      </div>
    </motion.div>
  );
};

export default MetricasPessoais;
