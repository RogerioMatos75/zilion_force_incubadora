import ContactForm from "@/components/contato/ContactForm";

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
          <ContactForm />
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
