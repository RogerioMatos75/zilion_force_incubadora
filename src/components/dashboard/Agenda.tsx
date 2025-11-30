import { motion } from 'framer-motion';

const Agenda = () => {
  const events = [
    { id: 1, title: 'Reunião de Kick-off', date: '2023-11-22', time: '14:00', type: 'meeting' },
    { id: 2, title: 'Entrega de Esboços', date: '2023-11-25', time: '23:59', type: 'deadline' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="bg-white/10 p-2 rounded-lg mr-3 text-xl">📅</span>
        Próximos Compromissos
      </h3>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-white/5 hover:bg-white/5 transition-all duration-300">
            <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl font-bold ${
                event.type === 'meeting' ? 'bg-zilion-gold-900/30 text-zilion-gold-400 border border-zilion-gold-900/50' : 'bg-red-900/30 text-red-400 border border-red-900/50'
            }`}>
                <span className="text-xs uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-lg">{new Date(event.date).getDate()}</span>
            </div>
            
            <div>
                <h4 className="font-bold text-white">{event.title}</h4>
                <p className="text-sm text-gray-400 flex items-center mt-1">
                    <span className="mr-2">⏰</span> {event.time}
                </p>
            </div>
          </div>
        ))}
        
        <button className="w-full py-3 mt-2 border border-dashed border-white/20 rounded-xl text-gray-400 font-medium hover:bg-white/5 hover:text-zilion-gold-500 transition-colors flex items-center justify-center gap-2">
            <span>+</span> Adicionar Lembrete
        </button>
      </div>
    </motion.div>
  );
};

export default Agenda;
