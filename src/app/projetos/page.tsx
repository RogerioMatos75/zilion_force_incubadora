'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Crônicas de Aethel',
    synopsis: 'Uma saga de fantasia épica onde um herói relutante deve unir reinos divididos contra uma antiga escuridão que ressurge.',
    status: 'Em Incubação',
    imageUrl: 'https://placehold.co/600x400/000000/D4AF37?text=Aethel',
  },
  {
    title: 'Cyber-Neon: 2088',
    synopsis: 'Em uma metrópole distópica, uma detetive descobre uma conspiração que ameaça a própria estrutura da realidade digital.',
    status: 'Em Incubação',
    imageUrl: 'https://placehold.co/600x400/000000/D4AF37?text=Cyber-Neon',
  },
  {
    title: 'O Último Guardião',
    synopsis: 'O último membro de uma ordem antiga precisa proteger um artefato místico de saqueadores em um mundo desolado.',
    status: 'Graduado',
    imageUrl: 'https://placehold.co/600x400/000000/D4AF37?text=Guardião',
  },
];

const ProjetosPage = () => {
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
            Vitrine de <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-300 to-zilion-gold-600">Projetos</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Conheça os projetos que estão sendo desenvolvidos e acelerados com o selo de qualidade da Zilion Force Incubadora.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-zilion-gold-500/50 transition-all duration-300 group"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                <img className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" src={project.imageUrl} alt={`Imagem do projeto ${project.title}`} />
                <div className="absolute top-4 right-4 z-20">
                    <span className={`inline-block px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${
                    project.status === 'Graduado' 
                        ? 'bg-zilion-gold-500 text-black border-zilion-gold-500' 
                        : 'bg-black/50 text-white border-white/30 backdrop-blur-md'
                    }`}>
                    {project.status}
                    </span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-zilion-gold-500 transition-colors duration-300">{project.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.synopsis}
                </p>
                <button className="text-xs font-bold uppercase tracking-widest text-white hover:text-zilion-gold-500 transition-colors flex items-center">
                    Saiba Mais <span className="ml-2">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjetosPage;
