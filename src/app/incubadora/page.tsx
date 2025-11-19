import Link from 'next/link';

const ComoFuncionaPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">O Ciclo de Vida de um Projeto na Zilion Force</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Nossa metodologia é dividida em três fases claras, projetadas para levar sua propriedade intelectual do conceito à prontidão para o mercado audiovisual.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Pré-Incubação */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-semibold text-blue-400 mb-3">Fase 1: Pré-Incubação</h2>
            <p className="text-gray-400 mb-1 font-medium">Duração: 1-3 meses</p>
            <p className="text-gray-300 flex-grow">
              O foco desta fase é a validação e o fortalecimento da sua Propriedade Intelectual. Realizamos uma análise jurídica completa, auxiliamos no registro de direitos autorais e definimos a estratégia de desenvolvimento da obra para maximizar seu potencial.
            </p>
          </div>

          {/* Card 2: Incubação */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-semibold text-blue-400 mb-3">Fase 2: Incubação</h2>
            <p className="text-gray-400 mb-1 font-medium">Duração: 6-12 meses</p>
            <p className="text-gray-300 flex-grow">
              Com a PI solidificada, entramos na fase de desenvolvimento do produto. Oferecemos mentorias com especialistas em roteiro, arte e mercado editorial. O objetivo é produzir um material de alta qualidade (como uma edição piloto da HQ) e um pitch robusto para o mercado audiovisual.
            </p>
          </div>

          {/* Card 3: Pós-Incubação */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-semibold text-blue-400 mb-3">Fase 3: Pós-Incubação</h2>
            <p className="text-gray-400 mb-1 font-medium">Duração: Contínua</p>
            <p className="text-gray-300 flex-grow">
              Após a "graduação", seu projeto entra em nossa vitrine de licenciamento. Atuamos ativamente na conexão com produtoras, estúdios e investidores do setor audiovisual, buscando as melhores oportunidades de negócio para sua obra.
            </p>
          </div>

        </div>

        <div className="text-center mt-16">
          <Link href="/criterios" className="text-lg font-semibold text-blue-300 hover:text-white">
            Veja se seu projeto atende aos nossos critérios <span aria-hidden="true">→</span>
          </Link>
        </div>

      </main>
    </div>
  );
};

export default ComoFuncionaPage;
