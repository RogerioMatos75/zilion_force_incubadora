'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Importa o hook de autenticação

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, signOut } = useAuth(); // Pega o usuário e a função de logout

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-blue-400">Zilion Force</Link>
        </div>
        
        <ul className="hidden md:flex items-center space-x-6">
          <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
          <li className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <Link href="/incubadora" className="hover:text-blue-400 flex items-center">
              Incubadora
            </Link>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 py-2 w-48 bg-gray-700 rounded-md shadow-xl">
                <li><Link href="/criterios" className="block px-4 py-2 text-sm hover:bg-blue-500">Critérios</Link></li>
                <li><Link href="/submeter" className="block px-4 py-2 text-sm hover:bg-blue-500">Submeter Projeto</Link></li>
                <li><Link href="/projetos" className="block px-4 py-2 text-sm hover:bg-blue-500">Projetos Incubados</Link></li>
              </ul>
            )}
          </li>
          <li><Link href="/sobre-nos" className="hover:text-blue-400">Quem Somos</Link></li>
          <li><Link href="/contato" className="hover:text-blue-400">Contato</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-300 hidden sm:block">{user.email}</span>
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold"
              >
                Sair
              </button>
            </>
          ) : (
            <Link href="/submeter" className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md">
              Login / Cadastro
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
