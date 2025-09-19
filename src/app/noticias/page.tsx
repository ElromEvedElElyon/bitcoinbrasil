import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

export default function Noticias() {
  const noticias = [
    {
      id: 1,
      titulo: "Bitcoin atinge nova máxima histórica",
      resumo: "O Bitcoin registrou uma valorização significativa nas últimas 24 horas, alcançando patamares nunca vistos no mercado brasileiro.",
      conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      data: "2024-01-15",
      tempo: "Há 2 horas",
      categoria: "Mercado"
    },
    {
      id: 2,
      titulo: "Ethereum 2.0: O que esperar da nova atualização",
      resumo: "A transição para o Ethereum 2.0 promete revolucionar a blockchain com melhor eficiência energética e velocidade.",
      conteudo: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      data: "2024-01-15",
      tempo: "Há 4 horas",
      categoria: "Tecnologia"
    },
    {
      id: 3,
      titulo: "Meme coins ganham força no mercado brasileiro",
      resumo: "Dogecoin e Shiba Inu lideram alta de meme coins no Brasil, atraindo novos investidores.",
      conteudo: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      data: "2024-01-15",
      tempo: "Há 6 horas",
      categoria: "Memes"
    },
    {
      id: 4,
      titulo: "Regulamentação cripto: Novidades do Banco Central",
      resumo: "Banco Central brasileiro anuncia novas diretrizes para operações com criptomoedas.",
      conteudo: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      data: "2024-01-14",
      tempo: "Há 1 dia",
      categoria: "Regulamentação"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-orange-600 hover:text-orange-700">
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </Link>
              <h1 className="text-2xl font-bold text-orange-600">Bitcoin Brasil</h1>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://yuotube.ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm"
              >
                YuoTube.ai <ExternalLink size={14} />
              </a>
              <a 
                href="https://standardbitcoin.io" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 flex items-center gap-2 text-sm"
              >
                Standard Bitcoin <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Últimas Notícias</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {noticia.categoria}
                  </span>
                  <div className="flex items-center ml-auto text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    {noticia.tempo}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{noticia.titulo}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{noticia.resumo}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{noticia.data}</span>
                  <Link 
                    href={`/noticias/${noticia.id}`} 
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    Ler notícia completa →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 font-medium">
            Carregar mais notícias
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h5 className="font-bold mb-4">Bitcoin Brasil</h5>
            <p className="text-gray-400 text-sm mb-4">
              Seu portal completo para notícias e análises do mercado crypto brasileiro.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://yuotube.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                YuoTube.ai
              </a>
              <a href="https://standardbitcoin.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Standard Bitcoin
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}