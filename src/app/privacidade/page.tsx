import Link from 'next/link';

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/submeter" className="text-blue-400 hover:text-blue-300">&larr; Voltar</Link>
          </div>
          <h1 className="text-4xl font-bold mb-6">Política de Privacidade</h1>
          <p className="text-sm text-gray-500 mb-8">[Texto adaptado a partir do modelo disponibilizado pelo gov.br, em conformidade com a LGPD]</p>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">

            <h2 className="text-2xl font-semibold">1. Tratamento dos Dados</h2>
            <p>O tratamento de dados pessoais pela Zilion Force Incubadora destina-se ao exercício de suas atividades de seleção, mentoria e desenvolvimento de projetos, bem como para o cumprimento de obrigações legais.</p>
            <p>Comprometemo-nos a cumprir as normas previstas na Lei Geral de Proteção de Dados Pessoais (LGPD), e respeitar os princípios de finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.</p>

            <h2 className="text-2xl font-semibold mt-6">2. Dados Coletados</h2>
            <p>Coletamos os dados fornecidos por você no formulário de submissão, como nome, e-mail, e detalhes do projeto. O tratamento desses dados tem como finalidade a avaliação da sua proposta e a comunicação sobre o processo de incubação.</p>
            <p>Cookies podem ser utilizados para o funcionamento correto do site. As informações eventualmente armazenadas em cookies que possam identificar um usuário também são consideradas dados pessoais e seguem esta política.</p>

            <h2 className="text-2xl font-semibold mt-6">3. Seus Direitos como Titular dos Dados</h2>
            <p>Você tem o direito ao acesso facilitado às informações sobre o tratamento de seus dados, sua retificação, e, em certos casos, a limitação ou oposição ao tratamento, e a portabilidade.</p>
            <p>Sem prejuízo de qualquer outra via de recurso administrativo ou judicial, você tem direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</p>

            <h2 className="text-2xl font-semibold mt-6">4. Segurança dos Dados</h2>
            <p>A Zilion Force Incubadora se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.</p>
            <p>A comunicação entre seu navegador e nossos servidores utiliza criptografia para garantir a segurança dos dados transmitidos.</p>

            <h2 className="text-2xl font-semibold mt-6">5. Contato</h2>
            <p>Para exercer seus direitos como titular de dados ou para esclarecer dúvidas sobre esta Política de Privacidade, entre em contato através da nossa página de Contato.</p>
            
          </div>
        </div>
      </main>
    </div>
  );
}
