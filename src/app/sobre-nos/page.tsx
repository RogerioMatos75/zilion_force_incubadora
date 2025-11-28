const teamMembers = [
  {
    name: 'Rogerio Matos',
    role: 'Idealizador do Universo Zilion Force Comics',
    bio: 'Guiando a visão estratégica da incubadora, com especialidade em Propriedade Intelectual e entretenimento.',
    imageUrl: '/foto 3x4 Rogerio.jpg',
  },
  {
    name: 'Gilmar Santos',
    role: 'Co-Fundador Administrativo',
    bio: 'Responsável pelo "Crivo do Atlas", garantindo que apenas os projetos com maior potencial de mercado e qualidade sejam selecionados.',
    imageUrl: '/foto 3x4 Gilmar.jpg',
  },
];

const mentors = [
    { name: 'Mentor Jurídico', role: 'Especialista em Direitos Autorais', bio: 'Focado em proteger e maximizar o valor da sua PI.', imageUrl: '/Mentores.png' },
    { name: 'Mentor de Roteiro', role: 'Roteirista Premiado', bio: 'Ajuda a refinar narrativas e a adaptar histórias de HQs para o formato de roteiro.', imageUrl: '/Mentores.png' },
    { name: 'Mentor de Mercado', role: 'Produtor Executivo', bio: 'Conecta os projetos incubados com os principais players do mercado.', imageUrl: '/Mentores.png' },
]

const SobreNosPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Nossa Equipe e Mentores</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">A força por trás da Zilion Force. Especialistas dedicados a transformar sua visão em realidade.</p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-400">Liderança</h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <img className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-blue-400" src={member.imageUrl} alt={`Foto de ${member.name}`} />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-300">{member.role}</p>
                <p className="mt-2 text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-400">Corpo de Mentores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <img className="w-24 h-24 rounded-full mx-auto mb-4" src={mentor.imageUrl} alt={`Foto de ${mentor.name}`} />
                <h3 className="text-lg font-bold">{mentor.name}</h3>
                <p className="text-blue-300 text-sm">{mentor.role}</p>
                <p className="mt-2 text-gray-400 text-xs">{mentor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SobreNosPage;
