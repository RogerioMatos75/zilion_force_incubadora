const ContactPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Contato</h1>
        <p className="mb-8 text-lg text-gray-300 text-center">
          Tem alguma dúvida ou proposta de parceria? Entre em contato conosco.
        </p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Envie uma mensagem</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">Nome</label>
              <input type="text" id="name" name="name" className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2">Mensagem</label>
              <textarea id="message" name="message" rows={5} className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-md transition duration-300"
              onClick={(e) => e.preventDefault()} // Ação de envio desabilitada por enquanto
            >
              Enviar Mensagem
            </button>
          </form>
          <div className="text-center mt-8">
            <p className="text-gray-400">Ou nos envie um e-mail diretamente em:</p>
            <a href="mailto:admzilionforcecomics@gmail.com" className="text-blue-400 hover:underline">
              admzilionforcecomics@gmail.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
