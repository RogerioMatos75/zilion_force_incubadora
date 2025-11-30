import { motion } from 'framer-motion';

const SolicitarReuniao = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="bg-gradient-to-br from-zilion-gold-900/40 to-black p-8 rounded-2xl shadow-lg border border-zilion-gold-500/30 text-center relative overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2">Precisa de Ajuda?</h3>
        <p className="text-sm text-gray-300 mb-6">Agende uma reunião com nossos especialistas.</p>
        
        <a 
          href="https://b24-k8lm26.bitrix24.com.br/~QvJQS"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block py-3 bg-transparent border border-zilion-gold-500 text-zilion-gold-500 font-bold uppercase tracking-widest rounded hover:bg-zilion-gold-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        >
            Solicitar Reunião
        </a>
      </div>
    </motion.div>
  );
};

export default SolicitarReuniao;
