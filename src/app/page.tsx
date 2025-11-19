import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="text-center max-w-4xl">
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
  );
}
