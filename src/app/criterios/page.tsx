'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const CriteriosPage = () => {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5 z-0"></div>
      
      <main className="container mx-auto px-6 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Critérios de <span className="text-zilion-gold-500">Seleção</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            A excelência é o nosso padrão. Conheça os requisitos para fazer parte da elite da Zilion Force.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-md border-l-4 border-zilion-gold-500 p-8 rounded-r-xl shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            <h2 className="text-2xl font-bold text-zilion-gold-500 mb-4 flex items-center gap-3">
              <span className="text-3xl">⚠️</span> Requisito Obrigatório: Propriedade Intelectual
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              O critério mais importante para a elegibilidade do seu projeto é a comprovação de Propriedade Intelectual (PI). É indispensável que o criador apresente o <strong className="text-white">comprovante de registro de direitos autorais da obra</strong>, emitido por um órgão competente como a <strong className="text-white">Biblioteca Nacional</strong>.
            </p>
            <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">
              Submissões sem este comprovante não seguirão para a fase de avaliação.
            </p>
          </motion.div>

          {/* Nova Seção sobre a Importância da PI */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">A Importância de Proteger Sua Obra</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              No universo das HQs, a proteção da Propriedade Intelectual (PI) é o alicerce para o sucesso. No Brasil, isso não é mera formalidade, mas uma estratégia essencial para comprovar autoria, evitar plágios e destravar oportunidades comerciais.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-zilion-gold-500 mb-3">Por Que Proteger?</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><span className="text-zilion-gold-500">✓</span> <strong>Comprovar Originalidade:</strong> Evita fraudes e plágios.</li>
                  <li className="flex items-start gap-2"><span className="text-zilion-gold-500">✓</span> <strong>Garantir Exclusividade:</strong> Controle total sobre adaptações.</li>
                  <li className="flex items-start gap-2"><span className="text-zilion-gold-500">✓</span> <strong>Facilitar Comercialização:</strong> Essencial para investidores.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zilion-gold-500 mb-3">Protegendo Personagens</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><span className="text-zilion-gold-500">✓</span> <strong>Evitar Cópias:</strong> Proteção de marcas e designs.</li>
                  <li className="flex items-start gap-2"><span className="text-zilion-gold-500">✓</span> <strong>Gerar Receita:</strong> Licenciamento e royalties.</li>
                  <li className="flex items-start gap-2"><span className="text-zilion-gold-500">✓</span> <strong>Aumentar Valor:</strong> Facilita fomento via leis de incentivo.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Outros Critérios de Avaliação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Originalidade", desc: "Histórias únicas com forte potencial de adaptação para o mercado audiovisual." },
                { title: "Qualidade Técnica", desc: "Excelência no roteiro, arte e narrativa apresentados na amostra." },
                { title: "Visão de Mercado", desc: "Compreensão do público-alvo e do potencial comercial da obra." },
                { title: "Comprometimento", desc: "Capacidade de execução e dedicação da equipe ou criador." }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-black border border-white/10 rounded-lg hover:border-zilion-gold-500/50 transition-colors group">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-zilion-gold-500 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="text-center pt-10">
            <Link
              href="/submeter"
              className="inline-block px-10 py-5 bg-zilion-gold-500 text-black font-bold text-sm uppercase tracking-widest rounded hover:bg-zilion-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              Estou Ciente, Submeter meu Projeto
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CriteriosPage;
