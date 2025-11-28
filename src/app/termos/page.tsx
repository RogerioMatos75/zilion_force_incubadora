import Link from 'next/link';

export default function TermosDeServicoPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/submeter" className="text-blue-400 hover:text-blue-300">&larr; Voltar</Link>
          </div>
          <h1 className="text-4xl font-bold mb-6">Termos de Uso</h1>
          <p className="text-sm text-gray-500 mb-8">[Texto adaptado a partir do modelo disponibilizado pelo gov.br]</p>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
            
            <h2 className="text-2xl font-semibold">1. Aceitação dos Termos</h2>
            <p>Ao utilizar os serviços da Zilion Force Incubadora, especialmente ao submeter um projeto, você confirma que leu, compreendeu e concorda em ficar vinculado a estes Termos de Uso. Sua submissão constitui um acordo legalmente vinculativo.</p>

            <h2 className="text-2xl font-semibold mt-6">2. Propriedade Intelectual e Responsabilidades</h2>
            <p>Você se responsabiliza pela precisão e veracidade dos dados informados no formulário de submissão e reconhece que a inconsistência destes poderá implicar a impossibilidade de avaliação do seu projeto.</p>
            <p>Você se compromete a fornecer somente seus dados pessoais e informações sobre obras das quais detém plenos direitos de propriedade intelectual. Você declara que a obra submetida é original e não infringe direitos de terceiros.</p>
            <p>Você é responsável pela reparação de todos e quaisquer danos, diretos ou indiretos, que sejam causados à Zilion Force Incubadora ou a terceiros, em virtude do descumprimento do disposto neste Termo de Uso ou de qualquer ato ilícito praticado.</p>
            <p>A Zilion Force Incubadora não reivindica qualquer direito de propriedade sobre sua obra durante o processo de avaliação. Os termos de uma eventual parceria ou incubação serão definidos em contrato específico, caso seu projeto seja selecionado.</p>

            <h2 className="text-2xl font-semibold mt-6">3. Confidencialidade</h2>
            <p>A Zilion Force Incubadora se compromete a preservar a funcionalidade do serviço, tratando todas as informações e materiais submetidos com estrita confidencialidade. O acesso ao seu material será limitado à equipe de curadoria e mentores, que estão sujeitos a acordos de confidencialidade.</p>
            <p>Em nenhuma hipótese, a Zilion Force Incubadora será responsável pela instalação no seu equipamento ou de terceiros, de códigos maliciosos (vírus, etc.) em decorrência da sua navegação na Internet.</p>
            
            <h2 className="text-2xl font-semibold mt-6">4. Foro</h2>
            <p>Quaisquer disputas ou controvérsias procedentes de quaisquer atos praticados na utilização dos serviços da incubadora, inclusive com relação ao descumprimento destes Termos de Uso, serão processadas pelo foro da Comarca de [Inserir Cidade/Estado], Brasil.</p>

            <h2 className="text-2xl font-semibold mt-6">5. Mudanças nos Termos de Uso</h2>
            <p>A Zilion Force Incubadora se reserva o direito de modificar estes termos a qualquer momento. Recomenda-se que esta página seja acessada periodicamente. Qualquer alteração passará a vigorar a partir da data de sua publicação.</p>

          </div>
        </div>
      </main>
    </div>
  );
}