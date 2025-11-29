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

          {/* Nova Seção sobre a Importância da PI */}
          <div className="border-l-4 border-blue-500 pl-6 mb-12 bg-gray-700/20 p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">A Importância de Proteger Sua Obra e Personagens</h2>
            <p className="text-gray-300 mb-6">
              No universo das HQs, a proteção da Propriedade Intelectual (PI) é o alicerce para o sucesso. No Brasil, isso não é mera formalidade, mas uma estratégia essencial para comprovar autoria, evitar plágios e destravar oportunidades comerciais, como adaptações audiovisuais. Sem essa proteção, sua criação fica vulnerável, arriscando sua carreira e o potencial econômico do projeto.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Por Que Proteger Sua Obra?</h3>
            <p className="text-gray-400 mb-4">
              Uma HQ é uma obra intelectual protegida pela Lei 9.610/98 (Direitos Autorais). O registro na Fundação Biblioteca Nacional (BN) confere fé pública à sua autoria e data de criação, o que é vital para:
            </p>
            <ul className="space-y-3 list-disc list-inside mb-6">
              <li><strong>Comprovar Originalidade:</strong> Em um mercado saturado, o registro prova que sua HQ é sua, evitando fraudes e plágios.</li>
              <li><strong>Garantir Exclusividade:</strong> Com o registro, você controla a reprodução, distribuição e adaptação, abrindo portas para parcerias seguras, como as exigidas pela Zilion Force.</li>
              <li><strong>Facilitar Comercialização:</strong> Bancos, investidores e produtores (ex: ANCINE) priorizam projetos com PI protegida, pois isso mitiga riscos jurídicos e aumenta o valor de mercado.</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Protegendo Personagens: Marcas e Desenhos Industriais</h3>
            <p className="text-gray-400 mb-4">
              Personagens de HQs são mais que desenhos, são marcas com enorme potencial comercial. Registrá-los no Instituto Nacional da Propriedade Industrial (INPI) é fundamental para:
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li><strong>Evitar Cópias:</strong> O INPI concede exclusividade, protegendo nomes, logos e designs contra uso indevido em mercadorias, animações ou games.</li>
              <li><strong>Gerar Receita:</strong> Com proteção, você pode licenciar personagens para editoras e estúdios, criando royalties e expandindo seu universo.</li>
              <li><strong>Aumentar o Valor:</strong> Em incubadoras como a Zilion Force, personagens protegidos elevam o projeto, facilitando o fomento via FSA ou ProAC.</li>
            </ul>
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
