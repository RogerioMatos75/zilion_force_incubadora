'use client';

import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Rogerio Matos',
    role: 'Idealizador do Universo Zilion Force Comics',
    bio: 'Guiando a visão estratégica da incubadora, com especialidade em Propriedade Intelectual e entretenimento.',
    imageUrl: '/foto 3x4 Rogerio.jpg',
  },
  {
    name: 'Gilmar Santos',
    role: 'Co-Fundador Administrativo',
    bio: 'Responsável pelo "Crivo do Atlas", garantindo que apenas os projetos com maior potencial de mercado e qualidade sejam selecionados.',
    imageUrl: '/foto 3x4 Gilmar.jpg',
  },
];

const mentors = [
    { name: 'Mentor Jurídico', role: 'Especialista em Direitos Autorais', bio: 'Focado em proteger e maximizar o valor da sua PI.', imageUrl: '/Mentores.png' },
    { name: 'Mentor de Roteiro', role: 'Roteirista Premiado', bio: 'Ajuda a refinar narrativas e a adaptar histórias de HQs para o formato de roteiro.', imageUrl: '/Mentores.png' },
    { name: 'Mentor de Mercado', role: 'Produtor Executivo', bio: 'Conecta os projetos incubados com os principais players do mercado.', imageUrl: '/Mentores.png' },
]

const SobreNosPage = () => {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none"></div>
      
      <main className="container mx-auto px-6 py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            Sobre a <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-300 to-zilion-gold-600">Zilion Force</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Conheça nossa missão, visão e a equipe dedicada a transformar sua visão em realidade.
          </p>
        </motion.div>

        {/* Seção Institucional */}
        <div className="max-w-5xl mx-auto mb-24 space-y-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-zilion-gold-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:bg-zilion-gold-500/20 transition-colors duration-700"></div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="text-zilion-gold-500 mr-3">✦</span> A Incubadora
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Este projeto é o lançamento oficial e a estruturação da <strong className="text-white">ZILION FORCE COMICS & INCUBADORA</strong>, a primeira incubadora brasileira especializada em Propriedade Intelectual (PI) de HQs para Audiovisual. O Plano de Fundação Completo consolida todos os documentos e processos construídos em um Códice Operacional único, pronto para implementação imediata nas 5 Camadas do Crivo do Atlas. O objetivo é estabelecer a Zilion Force como uma entidade juridicamente sólida, com governança clara e capacidade operacional e criativa para se tornar referência nacional em 24 meses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black border border-white/10 p-8 rounded-xl hover:border-zilion-gold-500/50 transition-colors duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-8 bg-zilion-gold-500 mr-3 rounded-full"></span> Nossa Missão
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Guiar criadores de Histórias em Quadrinhos na jornada curatorial de adaptação de sua PI para o setor audiovisual, atuando como mediadores entre artistas emergentes, instituições culturais e públicos brasileiros, promovendo debates sobre identidade, memória e diversidade.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black border border-white/10 p-8 rounded-xl hover:border-zilion-gold-500/50 transition-colors duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-8 bg-zilion-gold-500 mr-3 rounded-full"></span> Nossa Visão
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Ser o hub curatorial referência no Brasil para transformar HQs em narrativas audiovisuais impactantes, redefinindo espaços expositivos e promovendo inclusão cultural em um país de rica diversidade e vastas desigualdades.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 tracking-tight"
          >
            Liderança
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center hover:border-zilion-gold-500/30 transition-all duration-300 group"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-zilion-gold-500/30 group-hover:border-zilion-gold-500 transition-colors duration-500"></div>
                  <img className="w-full h-full rounded-full object-cover p-1" src={member.imageUrl} alt={`Foto de ${member.name}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-zilion-gold-500 font-bold uppercase tracking-widest text-xs mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 tracking-tight"
          >
            Corpo de Mentores
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mentors.map((mentor, index) => (
              <motion.div 
                key={mentor.name} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black border border-white/10 p-8 rounded-xl text-center hover:bg-white/5 transition-colors duration-300"
              >
                <img className="w-24 h-24 rounded-full mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all" src={mentor.imageUrl} alt={`Foto de ${mentor.name}`} />
                <h3 className="text-lg font-bold text-white mb-1">{mentor.name}</h3>
                <p className="text-zilion-gold-500 text-xs uppercase tracking-widest font-bold mb-3">{mentor.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{mentor.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SobreNosPage;
