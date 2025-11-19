import Link from 'next/link';

const CriteriosPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Critérios de Seleção</h1>
        <p className="mb-12 text-lg text-gray-300 text-center max-w-3xl mx-auto">
          Para garantir a excelência e a segurança jurídica dos projetos, a Incubadora Zilion Force adota os seguintes critérios de seleção.
        </p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          
          <div className="border-l-4 border-red-500 pl-6 mb-8 bg-gray-700/20 p-4 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-red-400">Requisito Obrigatório: Propriedade Intelectual</h2>
            <p className="mt-2 text-gray-300">
              O critério mais importante para a elegibilidade do seu projeto é a comprovação de Propriedade Intelectual (PI). É indispensável que o criador apresente o <strong>comprovante de registro de direitos autorais da obra</strong>, emitido por um órgão competente como a <strong>Biblioteca Nacional</strong>.
            </p>
            <p className="mt-2 text-gray-400">
              Submissões sem este comprovante não seguirão para a fase de avaliação.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Outros Critérios de Avaliação</h2>
          <ul className="list-disc list-inside space-y-4 text-gray-300">
            <li>
              <strong>Originalidade e Potencial da Obra:</strong> Buscamos histórias únicas com forte potencial de adaptação para o mercado audiovisual.
            </li>
            <li>
              <strong>Qualidade da Amostra:</strong> A qualidade do roteiro, arte e narrativa apresentados na amostra da HQ será avaliada.
            </li>
            <li>
              <strong>Visão de Mercado:</strong> O criador deve demonstrar uma compreensão básica do público-alvo e do potencial comercial de sua obra.
            </li>
            <li>
              <strong>Dedicação da Equipe:</strong> Avaliamos o comprometimento e a capacidade de execução da equipe ou do criador individual.
            </li>
          </ul>

          <div className="text-center mt-10">
            <Link
              href="/submeter"
              className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
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
