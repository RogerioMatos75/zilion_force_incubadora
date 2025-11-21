const TermosPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Termos e Condições de Envio de Projeto</h1>
          <p className="mb-8 text-center text-gray-300">
            Ao submeter seu projeto à Zilion Force Comics Incubadora ("Incubadora"), você ("Criador") concorda integralmente com os seguintes termos.
          </p>

          <div className="space-y-6 text-gray-300">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Cláusula 1: Elegibilidade e Pré-requisitos</h2>
              <p>
                1.1. O Criador declara ser o único e exclusivo titular de todos os direitos de Propriedade Intelectual (PI) da obra (HQ) submetida, ou possuir autorização expressa de todos os co-titulares para representá-los neste processo.
                <br />
                1.2. É condição **obrigatória** para a submissão e análise do projeto a anexação do **comprovante de registro de direitos autorais da obra na Biblioteca Nacional** ou em órgão equivalente. Submissões sem esta comprovação não serão consideradas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Cláusula 2: Processo de Análise e Prazos</h2>
              <p>
                O Criador entende e concorda com o pipeline de avaliação inicial da Incubadora, que seguirá os seguintes prazos:
                <br />
                2.1. **Análise Preliminar ("Crivo do Atlas") - Prazo de 1 a 7 dias:** Após a submissão, nossa equipe realizará a primeira triagem, focada na verificação da documentação de PI, no alinhamento com a linha editorial da Incubadora e no potencial criativo e de mercado da obra.
                <br />
                2.2. **Comunicação e Próximos Passos - Prazo de 8 a 15 dias:** A Incubadora entrará em contato para comunicar o resultado da análise preliminar. Projetos pré-selecionados serão convidados para uma Mentoria Inicial. Projetos não selecionados receberão um feedback com a justificativa da decisão.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Cláusula 3: Confidencialidade</h2>
              <p>
                A Incubadora compromete-se a tratar todo o material submetido (sinopses, roteiros, artes, etc.) como estritamente confidencial. As informações só serão compartilhadas com a equipe de curadoria e mentores envolvidos no processo de avaliação, que estão igualmente sujeitos a dever de sigilo.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Cláusula 4: Propriedade Intelectual</h2>
              <p>
                O envio do projeto para análise **não implica qualquer cessão, licença ou transferência** de direitos da sua PI para a Incubadora. O Criador permanece como único titular de todos os seus direitos. A submissão concede à Incubadora apenas o direito de avaliar o material para a finalidade exclusiva de seleção para o programa de incubação.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Cláusula 5: Etapas Subsequentes</h2>
              <p>
                A aprovação na fase de Análise Preliminar dará início à fase de **Pré-Incubação**, com duração média de 1 a 3 meses. A participação nesta e nas fases subsequentes (Incubação e Pós-Incubação) será regida por um Contrato de Incubação específico, a ser discutido e assinado entre as partes, o qual detalhará todas as obrigações, participações e contrapartidas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Cláusula 6: Aceitação</h2>
              <p>
                Ao marcar a caixa "Eu li e aceito os Termos de Envio" na página de submissão e clicar em "Enviar", o Criador manifesta sua concordância plena e irrevogável com todos os termos aqui dispostos.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermosPage;
