"use client";

const ContactForm = () => {
  // Futuramente, aqui podemos adicionar o estado para os campos
  // e a lógica de envio do formulário.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de envio do formulário aqui
    alert("Formulário enviado! (funcionalidade a ser implementada)");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      >
        Enviar Mensagem
      </button>
    </form>
  );
};

export default ContactForm;
