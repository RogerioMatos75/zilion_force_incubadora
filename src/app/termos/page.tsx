'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermosDeServicoPage() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-zilion-gold-500/5 rounded-full blur-[120px] -ml-32 -mt-32 pointer-events-none"></div>

      <main className="container mx-auto px-6 py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-12">
            <Link href="/submeter" className="text-zilion-gold-500 hover:text-zilion-gold-400 font-bold uppercase tracking-widest text-xs flex items-center transition-colors">
              <span className="mr-2 text-lg">&larr;</span> Voltar para Submissão
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-zilion-gold-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              Termos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-300 to-zilion-gold-600">Uso</span>
            </h1>
            <p className="text-sm text-gray-500 mb-12 uppercase tracking-widest font-mono border-b border-white/10 pb-6">
              Última atualização: Novembro 2025
            </p>

            <div className="space-y-12 text-gray-300 leading-relaxed">
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">1</span>
                  Aceitação dos Termos
                </h2>
                <p className="pl-12">
                  Ao utilizar os serviços da Zilion Force Incubadora, especialmente ao submeter um projeto, você confirma que leu, compreendeu e concorda em ficar vinculado a estes Termos de Uso. Sua submissão constitui um acordo legalmente vinculativo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">2</span>
                  Propriedade Intelectual e Responsabilidades
                </h2>
                <div className="pl-12 space-y-4">
                  <p>
                    Você se responsabiliza pela precisão e veracidade dos dados informados no formulário de submissão e reconhece que a inconsistência destes poderá implicar a impossibilidade de avaliação do seu projeto.
                  </p>
                  <p>
                    Você se compromete a fornecer somente seus dados pessoais e informações sobre obras das quais detém plenos direitos de propriedade intelectual. Você declara que a obra submetida é original e não infringe direitos de terceiros.
                  </p>
                  <p>
                    Você é responsável pela reparação de todos e quaisquer danos, diretos ou indiretos, que sejam causados à Zilion Force Incubadora ou a terceiros, em virtude do descumprimento do disposto neste Termo de Uso ou de qualquer ato ilícito praticado.
                  </p>
                  <div className="bg-zilion-gold-900/20 border-l-2 border-zilion-gold-500 p-4 rounded-r-lg">
                    <p className="text-zilion-gold-200 text-sm font-medium">
                      A Zilion Force Incubadora não reivindica qualquer direito de propriedade sobre sua obra durante o processo de avaliação. Os termos de uma eventual parceria ou incubação serão definidos em contrato específico, caso seu projeto seja selecionado.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">3</span>
                  Confidencialidade
                </h2>
                <div className="pl-12 space-y-4">
                  <p>
                    A Zilion Force Incubadora se compromete a preservar a funcionalidade do serviço, tratando todas as informações e materiais submetidos com estrita confidencialidade. O acesso ao seu material será limitado à equipe de curadoria e mentores, que estão sujeitos a acordos de confidencialidade.
                  </p>
                  <p>
                    Em nenhuma hipótese, a Zilion Force Incubadora será responsável pela instalação no seu equipamento ou de terceiros, de códigos maliciosos (vírus, etc.) em decorrência da sua navegação na Internet.
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">4</span>
                  Foro
                </h2>
                <p className="pl-12">
                  Quaisquer disputas ou controvérsias procedentes de quaisquer atos praticados na utilização dos serviços da incubadora, inclusive com relação ao descumprimento destes Termos de Uso, serão processadas pelo foro da Comarca de São Paulo, Brasil.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">5</span>
                  Mudanças nos Termos
                </h2>
                <p className="pl-12">
                  A Zilion Force Incubadora se reserva o direito de modificar estes termos a qualquer momento. Recomenda-se que esta página seja acessada periodicamente. Qualquer alteração passará a vigorar a partir da data de sua publicação.
                </p>
              </section>

            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}