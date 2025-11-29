// src/app/investidores/page.tsx
import Link from 'next/link';
import React from 'react';

const InvestidoresPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Um Convite para Investidores Anjo</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Descubra por que a Zilion Force Comics Incubadora representa uma oportunidade estratégica única no crescente mercado audiovisual brasileiro.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Por Que a Zilion Force é um Investimento Anjo Estratégico?</h2>
            <p className="text-gray-300 leading-relaxed">
              A proposta da Zilion Force foi estruturada como um Plano Executivo de alto impacto que mitiga riscos jurídicos, demonstra profissionalismo na gestão e aponta para um mercado com grande potencial de valorização: o audiovisual.
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Nosso projeto é altamente atrativo para Investidores Anjo, pois atende aos três critérios fundamentais buscados em novos empreendimentos:
            </p>
          </div>
          
          <div className="space-y-8">
            {/* 1. Potencial de Alto Crescimento */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-semibold text-white">1. Potencial de Alto Crescimento (Alto Risco/Alta Recompensa)</h3>
              <p className="mt-2 text-gray-400">
                O foco em ser a <strong>"primeira incubadora brasileira especializada em PI de HQs para Audiovisual"</strong> estabelece um nicho de mercado pioneiro. Isso nos posiciona em um setor com potencial de spin-off para um estúdio de produção próprio, gerando retornos exponenciais.
              </p>
            </div>

            {/* 2. Segurança Jurídica */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-semibold text-white">2. Segurança Jurídica e Proteção de Ativos</h3>
              <p className="mt-2 text-gray-400">
                A <strong>"Estrutura Legal Inabalável"</strong> e o foco na Propriedade Intelectual (PI) protegida são cruciais. Investidores precisam da segurança de que o ativo principal (as HQs e seus personagens) está protegido e que a empresa possui capacidade legal para celebrar contratos, garantindo participação nos lucros futuros.
              </p>
            </div>

            {/* 3. Execução e Resultados Mensuráveis */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-semibold text-white">3. Execução e Resultados Mensuráveis</h3>
              <p className="mt-2 text-gray-400">
                A divisão do nosso plano em <strong>5 Camadas do Atlas</strong> (Estrutura Legal, Códice, Plataforma, etc.) e os <strong>Marcos de Validação</strong> com prazos definidos demonstram que não vendemos apenas uma ideia, mas um plano de negócios claro com metas verificáveis.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-semibold text-white">Faça Parte desta Jornada</h2>
            <p className="mt-4 text-lg text-gray-300">
              Convidamos investidores e parceiros institucionais a acompanhar nossa jornada e a se preparar para a abertura do Crivo do Atlas, que buscará as próximas grandes narrativas brasileiras para o audiovisual.
            </p>
            <Link
              href="/contato"
              className="mt-6 inline-block rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Entre em Contato
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default InvestidoresPage;
