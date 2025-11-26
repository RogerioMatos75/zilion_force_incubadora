import React from 'react';
import { Timestamp } from 'firebase/firestore';

interface Documento {
  nome: string;
  url: string;
  dataAssinatura: Timestamp;
}

interface DocumentosAssinadosProps {
  documentos: Documento[];
}

const DocumentosAssinados: React.FC<DocumentosAssinadosProps> = ({ documentos }) => {
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'Data inválida';
    return timestamp.toDate().toLocaleDateString('pt-BR');
  };

  const sortedDocs = [...(documentos || [])].sort((a, b) => {
    const timeA = a.dataAssinatura ? a.dataAssinatura.toMillis() : 0;
    const timeB = b.dataAssinatura ? b.dataAssinatura.toMillis() : 0;
    return timeB - timeA;
  });

  return (
    <div className="bg-zilion-surface border border-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="text-zilion-magenta mr-2">📜</span> Documentos Assinados
      </h3>
      
      {sortedDocs && sortedDocs.length > 0 ? (
        <ul className="space-y-2">
          {sortedDocs.map((doc, index) => (
            <li key={index} className="flex items-center justify-between p-3 bg-zilion-gray rounded hover:bg-gray-800 transition-colors">
              <div>
                <span className="text-gray-300">{doc.nome}</span>
                <p className="text-xs text-gray-400">Assinado em: {formatDate(doc.dataAssinatura)}</p>
              </div>
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
      ) : (
        <p className="text-gray-400 text-sm text-center py-4">Nenhum documento assinado encontrado para este projeto.</p>
      )}
    </div>
  );
};

export default DocumentosAssinados;
