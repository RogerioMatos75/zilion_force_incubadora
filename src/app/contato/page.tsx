'use client';

import { useState, useEffect } from 'react';

const ContactPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Este efeito só roda no cliente, após a hidratação
    setIsClient(true);
  }, []);

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
              onClick={(e) => e.preventDefault()}
            >
              Enviar Mensagem
            </button>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-gray-400">Ou nos envie um e-mail diretamente em:</p>
            {isClient ? (
              <a href="mailto:admzilionforcecomics@gmail.com" className="text-blue-400 hover:underline">
                admzilionforcecomics@gmail.com
              </a>
            ) : (
              <div className="h-5 bg-gray-700 rounded-md w-48 mx-auto mt-1 animate-pulse"></div>
            )}
          </div>

          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400">Se preferir, fale conosco pelo WhatsApp:</p>
            {isClient ? (
              <a 
                href="https://wa.me/5511913613425" 
                className="text-blue-400 hover:underline inline-flex items-center justify-center mt-2"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 14.2c-.3-.1-1.8-1-2.1-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.5 0s-1.4-.5-2.6-1.6c-1-1-1.6-2.1-1.8-2.5-.2-.3 0-.5.2-.7 0-.1.2-.3.4-.4.1-.1.2-.3.3-.4s.1-.2 0-.4c-.1-.2-1-2.4-1.3-3.3-.3-.8-.7-1.1-.9-1.1s-.5 0-.7 0h-.3c-.2 0-.5.2-.7.6 0 .4-.8 2-.8 4s.8 4.6 1 4.9c.1.3 1.7 2.5 4 3.6.6.3 1 .4 1.3.5.5.1 1 .1 1.3-.1.4-.2 1.2-.5 1.4-.9.2-.5.2-1 .1-1.1s-.2-.2-.5-.4zM12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                +55 11 91361-3425
              </a>
            ) : (
              <div className="h-5 bg-gray-700 rounded-md w-40 mx-auto mt-1 animate-pulse"></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
