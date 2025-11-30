'use client';

import Link from 'next/link';
import { motion, cubicBezier } from 'framer-motion';

// Componentes de Ícone SVG Premium
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-6 text-zilion-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0l-2-2m2 2l2-2" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-6 text-zilion-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3.045 12.02 12.02 0 009-3.045c0-1.427-.234-2.812-.656-4.112M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-6 text-zilion-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: cubicBezier(0.19, 1, 0.22, 1) } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="bg-black text-white overflow-hidden">
      
      {/* Hero Section - Imersivo (Dark) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-4">
             <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-zilion-gold-400 text-xs font-bold tracking-widest uppercase mb-6">
               Incubadora de Propriedade Intelectual
             </span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-tight">
            <span className="text-white">Zilion</span>
            <span className="text-transparent bg-clip-text bg-gradient-gold">Force</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Transformamos sua HQ em um ativo global. A primeira incubadora do Brasil dedicada a escalar narrativas gráficas para o mercado audiovisual.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/submeter"
              className="group relative px-8 py-4 bg-zilion-gold-500 text-black font-bold text-sm uppercase tracking-widest rounded overflow-hidden hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              <span className="relative z-10">Submeter Projeto</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
            <Link 
              href="/criterios" 
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              Conheça os Critérios
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-zilion-gold-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Seção "Nossa Plataforma" - Clean (Light) */}
      <section className="py-32 bg-white text-black relative z-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Do Criador para o <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Mercado</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Uma infraestrutura completa para profissionalizar sua jornada.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { 
                icon: UploadIcon, 
                title: "Plataforma Simplificada", 
                desc: "Fluxo automatizado e intuitivo para envio de projetos, focado na experiência do usuário." 
              },
              { 
                icon: ShieldIcon, 
                title: "Proteção de PI", 
                desc: "Segurança jurídica desde o primeiro clique. Exigência de registro e termos claros." 
              },
              { 
                icon: RocketIcon, 
                title: "Visão de Escala", 
                desc: "Mentoria estratégica para transformar sua história em um universo multimídia." 
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="p-10 bg-gray-50 rounded-2xl border border-gray-100 hover:border-zilion-gold-200 hover:shadow-xl transition-all duration-300 group"
              >
                <feature.icon />
                <h4 className="text-xl font-bold mb-4 group-hover:text-zilion-gold-600 transition-colors">{feature.title}</h4>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção "Nosso Processo" - Dark (Imersivo) */}
      <section className="py-32 bg-black relative border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">O Caminho da <span className="text-transparent bg-clip-text bg-gradient-gold">Ascensão</span></h2>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0"></div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
            >
              {[
                { step: "01", title: "Submissão", desc: "Envio seguro e validado." },
                { step: "02", title: "Crivo do Atlas", desc: "Análise técnica e de mercado." },
                { step: "03", title: "Incubação", desc: "Desenvolvimento e venda." }
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex flex-col items-center text-center bg-black p-6">
                  <div className="w-20 h-20 rounded-full border border-zilion-gold-500/30 flex items-center justify-center bg-black mb-6 shadow-[0_0_20px_rgba(212,175,55,0.1)] group hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl font-bold text-zilion-gold-500">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Final - CTA */}
      <section className="py-24 bg-zilion-gold-500 text-black text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Pronto para o próximo nível?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto font-medium opacity-80">
              Junte-se à elite dos criadores de HQs do Brasil.
            </p>
            <Link
              href="/submeter"
              className="inline-block px-10 py-5 bg-black text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Iniciar Jornada
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
