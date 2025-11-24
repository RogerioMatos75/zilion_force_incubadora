import React from 'react';

interface Documento {
  id: string;
  nome: string;
  dataAssinatura: string;
  url: string;
}

const MOCK_DOCS: Documento[] = [
  { id: '1', nome: 'Contrato de Incubação - Zilion Force', dataAssinatura: '2025-10-15', url: '#' },
  { id: '2', nome: 'NDA - Confidencialidade', dataAssinatura: '2025-10-15', url: '#' },
];

const DocumentosAssinados = () => {
  return (
    <div className="bg-zilion-surface border border-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="text-zilion-magenta mr-2">📜</span> Documentos Assinados
      </h3>
      
      <ul className="space-y-2">
        {MOCK_DOCS.map((doc) => (
          <li key={doc.id} className="flex items-center justify-between p-3 bg-zilion-gray rounded hover:bg-gray-800 transition-colors">
            <span className="text-gray-300">{doc.nome}</span>
            <a 
              href={doc.url} 
              className="text-sm text-zilion-cyan hover:underline flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Baixar PDF 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentosAssinados;
