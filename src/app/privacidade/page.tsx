'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zilion-gold-500/5 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>

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
            <div className="absolute top-0 left-0 w-32 h-32 bg-zilion-gold-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-zilion-gold-300 to-zilion-gold-600">Privacidade</span>
            </h1>
            <p className="text-sm text-gray-500 mb-12 uppercase tracking-widest font-mono border-b border-white/10 pb-6">
              Em conformidade com a LGPD
            </p>

            <div className="space-y-12 text-gray-300 leading-relaxed">

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">1</span>
                  Tratamento dos Dados
                </h2>
                <p className="pl-12">
                  O tratamento de dados pessoais pela Zilion Force Incubadora destina-se ao exercício de suas atividades de seleção, mentoria e desenvolvimento de projetos, bem como para o cumprimento de obrigações legais.
                </p>
                <p className="pl-12 mt-4">
                  Comprometemo-nos a cumprir as normas previstas na Lei Geral de Proteção de Dados Pessoais (LGPD), e respeitar os princípios de finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">2</span>
                  Dados Coletados
                </h2>
                <div className="pl-12 space-y-4">
                  <p>
                    Coletamos os dados fornecidos por você no formulário de submissão, como nome, e-mail, e detalhes do projeto. O tratamento desses dados tem como finalidade a avaliação da sua proposta e a comunicação sobre o processo de incubação.
                  </p>
                  <p>
                    Cookies podem ser utilizados para o funcionamento correto do site. As informações eventualmente armazenadas em cookies que possam identificar um usuário também são consideradas dados pessoais e seguem esta política.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">3</span>
                  Seus Direitos como Titular
                </h2>
                <div className="pl-12 space-y-4">
                  <p>
                    Você tem o direito ao acesso facilitado às informações sobre o tratamento de seus dados, sua retificação, e, em certos casos, a limitação ou oposição ao tratamento, e a portabilidade.
                  </p>
                  <p>
                    Sem prejuízo de qualquer outra via de recurso administrativo ou judicial, você tem direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">4</span>
                  Segurança dos Dados
                </h2>
                <div className="pl-12 space-y-4">
                  <p>
                    A Zilion Force Incubadora se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.
                  </p>
                  <div className="bg-zilion-gold-900/20 border-l-2 border-zilion-gold-500 p-4 rounded-r-lg">
                    <p className="text-zilion-gold-200 text-sm font-medium">
                      A comunicação entre seu navegador e nossos servidores utiliza criptografia para garantir a segurança dos dados transmitidos.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zilion-gold-500 text-sm font-bold mr-4 border border-white/10">5</span>
                  Contato
                </h2>
                <p className="pl-12">
                  Para exercer seus direitos como titular de dados ou para esclarecer dúvidas sobre esta Política de Privacidade, entre em contato através da nossa página de Contato.
                </p>
              </section>
              
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
