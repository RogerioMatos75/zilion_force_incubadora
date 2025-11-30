'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const InvestidoresPage = () => {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zilion-gold-500/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>
      
      <main className="container mx-auto px-6 py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            Investimento <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-300 to-zilion-gold-600">Anjo</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed">
            Descubra por que a Zilion Force Comics Incubadora representa uma oportunidade estratégica única no crescente mercado audiovisual brasileiro.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zilion-gold-500 to-transparent opacity-50"></div>
            <h2 className="text-3xl font-bold text-white mb-6">Estratégia de Alto Impacto</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              A proposta da Zilion Force foi estruturada como um Plano Executivo de alto impacto que mitiga riscos jurídicos, demonstra profissionalismo na gestão e aponta para um mercado com grande potencial de valorização: o audiovisual. Nosso projeto atende aos três critérios fundamentais buscados em novos empreendimentos:
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 1. Potencial de Alto Crescimento */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-black border border-white/10 p-8 rounded-xl hover:border-zilion-gold-500/50 transition-all duration-300 group"
            >
              <div className="text-zilion-gold-500 text-4xl font-bold mb-4 opacity-50 group-hover:opacity-100 transition-opacity">01</div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-zilion-gold-500 transition-colors">Alto Crescimento</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                O foco em ser a <strong>"primeira incubadora brasileira especializada em PI de HQs para Audiovisual"</strong> estabelece um nicho pioneiro com potencial de spin-off para um estúdio próprio.
              </p>
            </motion.div>

            {/* 2. Segurança Jurídica */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-black border border-white/10 p-8 rounded-xl hover:border-zilion-gold-500/50 transition-all duration-300 group"
            >
              <div className="text-zilion-gold-500 text-4xl font-bold mb-4 opacity-50 group-hover:opacity-100 transition-opacity">02</div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-zilion-gold-500 transition-colors">Segurança Jurídica</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A <strong>"Estrutura Legal Inabalável"</strong> e o foco na PI protegida garantem que o ativo principal (as HQs) esteja seguro, permitindo contratos sólidos e participação nos lucros.
              </p>
            </motion.div>

            {/* 3. Execução e Resultados Mensuráveis */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-black border border-white/10 p-8 rounded-xl hover:border-zilion-gold-500/50 transition-all duration-300 group"
            >
              <div className="text-zilion-gold-500 text-4xl font-bold mb-4 opacity-50 group-hover:opacity-100 transition-opacity">03</div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-zilion-gold-500 transition-colors">Execução Mensurável</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                As <strong>5 Camadas do Atlas</strong> e os Marcos de Validação demonstram um plano de negócios claro, com metas verificáveis e prazos definidos, indo além de apenas uma ideia.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-16 border-t border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Faça Parte desta Jornada</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Convidamos investidores e parceiros institucionais a acompanhar nossa jornada e a se preparar para a abertura do Crivo do Atlas.
            </p>
            <Link
              href="https://zilion-force-comics-incu-4q7dru7.gamma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-zilion-gold-500 text-black font-bold uppercase tracking-widest rounded hover:bg-zilion-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Pitch Deck
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default InvestidoresPage;
