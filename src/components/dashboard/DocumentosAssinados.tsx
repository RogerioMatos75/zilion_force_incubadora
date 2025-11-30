import { motion } from 'framer-motion';

interface Documento {
  id: number | string;
  nome: string;
  data: string;
  status: string;
  url?: string;
}

interface DocumentosAssinadosProps {
  documentos?: Documento[];
}

const DocumentosAssinados: React.FC<DocumentosAssinadosProps> = ({ documentos }) => {
  const defaultDocs = [
    { id: 1, nome: 'Contrato de Incubação', data: '2023-10-01', status: 'Assinado' },
    { id: 2, nome: 'Termo de Confidencialidade', data: '2023-10-01', status: 'Assinado' },
  ];

  // Previne erros se a API retornar dados malformados (ex: [''])
  const hasValidDocs = Array.isArray(documentos) && documentos.length > 0 && typeof documentos[0] === 'object' && documentos[0] !== null;

  const docs = hasValidDocs ? (documentos as Documento[]) : defaultDocs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="bg-white/10 p-2 rounded-lg mr-3 text-xl">📜</span>
        Documentos
      </h3>
      
      <div className="space-y-3">
        {docs.length === 0 ? (
             <p className="text-sm text-gray-500 italic">Nenhum documento assinado.</p>
        ) : (
            docs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                    <span className="text-xl group-hover:scale-110 transition-transform">📄</span>
                    <div>
                        <p className="text-sm font-bold text-white">{doc.nome}</p>
                        <p className="text-xs text-gray-400">{doc.data}</p>
                    </div>
                </div>
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider bg-green-900/30 px-2 py-1 rounded-full border border-green-900/50">
                    {doc.status}
                </span>
            </div>
            ))
        )}
      </div>
    </motion.div>
  );
};

export default DocumentosAssinados;
