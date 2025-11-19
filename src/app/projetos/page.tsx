const projects = [
  {
    title: 'Crônicas de Aethel',
    synopsis: 'Uma saga de fantasia épica onde um herói relutante deve unir reinos divididos contra uma antiga escuridão que ressurge.',
    status: 'Em Incubação',
    imageUrl: 'https://placehold.co/600x400/1f2937/9ca3af?text=Aethel',
  },
  {
    title: 'Cyber-Neon: 2088',
    synopsis: 'Em uma metrópole distópica, uma detetive descobre uma conspiração que ameaça a própria estrutura da realidade digital.',
    status: 'Em Incubação',
    imageUrl: 'https://placehold.co/600x400/1f2937/9ca3af?text=Cyber-Neon',
  },
  {
    title: 'O Último Guardião',
    synopsis: 'O último membro de uma ordem antiga precisa proteger um artefato místico de saqueadores em um mundo desolado.',
    status: 'Graduado',
    imageUrl: 'https://placehold.co/600x400/1f2937/9ca3af?text=Guardião',
  },
];

const ProjetosPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Vitrine de Projetos</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Conheça os projetos que estão sendo desenvolvidos e acelerados com o selo de qualidade da Zilion Force Incubadora.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
              <img className="w-full h-48 object-cover" src={project.imageUrl} alt={`Imagem do projeto ${project.title}`} />
              <div className="p-6">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${
                  project.status === 'Graduado' ? 'bg-green-500 text-green-900' : 'bg-blue-500 text-blue-100'
                }`}>
                  {project.status}
                </span>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h2>
                <p className="text-gray-400 text-sm">
                  {project.synopsis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjetosPage;
