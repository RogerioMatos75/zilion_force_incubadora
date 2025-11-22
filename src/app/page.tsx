import Link from 'next/link';

// Componentes de Ícone SVG para a seção de features
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0l-2-2m2 2l2-2" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3.045 12.02 12.02 0 009-3.045c0-1.427-.234-2.812-.656-4.112M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);


export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block">Zilion Force Incubadora</span>
            <span className="block text-blue-400 text-3xl mt-2">A Primeira Incubadora de PI de HQs do Brasil</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Nossa missão é transformar sua Propriedade Intelectual de Quadrinhos em um ativo valioso para o mercado Audiovisual. Oferecemos assessoria jurídica especializada e mentoria para levar seu projeto ao próximo nível.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/submeter"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Submeta seu Projeto
            </Link>
            <Link href="/criterios" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
              Conheça os critérios <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Seção "Nossa Plataforma" */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-2">Do Criador para o Mercado</h2>
          <h3 className="text-2xl mb-12 text-gray-400">Tudo que você precisa para dar o próximo passo com segurança.</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 bg-gray-900 rounded-lg">
              <UploadIcon />
              <h4 className="text-xl font-bold mb-3">Plataforma Simplificada</h4>
              <p className="text-gray-400">Nosso sistema online automatiza e simplifica o envio do seu projeto, garantindo que sua ideia chegue até nós de forma rápida e organizada.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <ShieldIcon />
              <h4 className="text-xl font-bold mb-3">Proteção para sua PI</h4>
              <p className="text-gray-400">Com um fluxo que exige registro de PI e aceite de termos, sua propriedade intelectual está protegida desde o primeiro contato em um ambiente seguro.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <RocketIcon />
              <h4 className="text-xl font-bold mb-3">Visão de Escala</h4>
              <p className="text-gray-400">Nossa missão é encontrar HQs com potencial para se tornarem universos audiovisuais. Oferecemos a infraestrutura para escalar sua criação.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção "Como Funciona" */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Nosso Processo</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-xl font-bold">1</div>
              <p className="text-lg">Submissão Segura</p>
            </div>
            <div className="text-blue-400 text-2xl hidden md:block">→</div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-xl font-bold">2</div>
              <p className="text-lg">Análise do Crivo do Atlas</p>
            </div>
            <div className="text-blue-400 text-2xl hidden md:block">→</div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-xl font-bold">3</div>
              <p className="text-lg">Incubação e Desenvolvimento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção "Destaque em PI" */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-4">Pioneiros na Transformação de HQs em PI Audiovisual</h2>
          <p className="text-lg text-gray-400">
            A Zilion Force Incubadora não é apenas uma vitrine. Somos a primeira plataforma do país dedicada a identificar, proteger e escalar suas histórias em quadrinhos como Propriedades Intelectuais robustas para cinema, TV, games e novas mídias. Nosso foco é construir valor duradouro para sua criação.
          </p>
        </div>
      </section>
    </div>
  );
}
