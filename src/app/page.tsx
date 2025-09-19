import Link from "next/link";
import { TrendingUp, Users, Zap, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-orange-600">Bitcoin Brasil</h1>
              <span className="text-sm text-gray-600">Portal Crypto Nacional</span>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-orange-600">Início</Link>
              <Link href="/noticias" className="text-gray-700 hover:text-orange-600">Notícias</Link>
              <Link href="/mercado" className="text-gray-700 hover:text-orange-600">Mercado</Link>
              <Link href="/ai-agents" className="text-gray-700 hover:text-orange-600">AI Agents</Link>
              <Link href="/memes" className="text-gray-700 hover:text-orange-600">Memes</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fique por dentro do mundo Bitcoin
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Notícias, análises e memes do mercado crypto brasileiro
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://yuotube.ai" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 flex items-center gap-2"
            >
              Visite YuoTube.ai <ExternalLink size={16} />
            </a>
            <a 
              href="https://standardbitcoin.io" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 flex items-center gap-2"
            >
              Standard Bitcoin <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - News Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Últimas Notícias</h3>
            
            {/* Featured News */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">Bitcoin atinge nova máxima histórica</h4>
                <p className="text-gray-600 mb-4">
                  O Bitcoin registrou uma valorização significativa nas últimas 24 horas, 
                  alcançando patamares nunca vistos no mercado brasileiro...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Há 2 horas</span>
                  <Link href="/noticias/bitcoin-maxima" className="text-orange-600 hover:underline">
                    Ler mais
                  </Link>
                </div>
              </div>
            </div>

            {/* News List */}
            <div className="space-y-4">
              {[
                "Ethereum 2.0: O que esperar da nova atualização",
                "Meme coins ganham força no mercado brasileiro",
                "Regulamentação cripto: Novidades do Banco Central",
                "NFTs e arte digital: Tendências para 2024"
              ].map((title, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-semibold mb-2">{title}</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Há {index + 3} horas</span>
                    <Link href={`/noticias/${index}`} className="text-orange-600 hover:underline text-sm">
                      Ler mais
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Crypto Market Data */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="text-green-500 mr-2" size={20} />
                <h4 className="font-bold">Mercado Crypto</h4>
              </div>
              <div className="space-y-3">
                {[
                  { coin: "Bitcoin", price: "R$ 286.420", change: "+5.2%" },
                  { coin: "Ethereum", price: "R$ 18.650", change: "+3.1%" },
                  { coin: "Cardano", price: "R$ 2.45", change: "-1.2%" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{item.coin}</span>
                    <div className="text-right">
                      <div className="font-semibold">{item.price}</div>
                      <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Agents Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Zap className="text-blue-500 mr-2" size={20} />
                <h4 className="font-bold">AI Agents</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Descubra os agentes de IA que estão revolucionando o trading de criptomoedas.
              </p>
              <Link href="/ai-agents" className="text-blue-600 hover:underline">
                Explorar AI Agents →
              </Link>
            </div>

            {/* Community/Memes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Users className="text-purple-500 mr-2" size={20} />
                <h4 className="font-bold">Memes da Comunidade</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm">"HODL até a lua! 🚀"</p>
                  <span className="text-xs text-gray-500">@cryptobrasil</span>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm">"Bitcoin é o futuro do dinheiro 💰"</p>
                  <span className="text-xs text-gray-500">@bitcoinmaxi</span>
                </div>
              </div>
              <Link href="/memes" className="text-purple-600 hover:underline block mt-4">
                Ver mais memes →
              </Link>
            </div>

            {/* Authority Sites */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md p-6 text-white">
              <h4 className="font-bold mb-4">Sites Parceiros</h4>
              <div className="space-y-3">
                <a 
                  href="https://yuotube.ai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/20 rounded p-3 hover:bg-white/30 transition-colors"
                >
                  <div className="font-semibold">YuoTube.ai</div>
                  <div className="text-sm opacity-90">IA para criadores de conteúdo</div>
                </a>
                <a 
                  href="https://standardbitcoin.io" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/20 rounded p-3 hover:bg-white/30 transition-colors"
                >
                  <div className="font-semibold">Standard Bitcoin</div>
                  <div className="text-sm opacity-90">Protocolo Bitcoin padrão</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold mb-4">Bitcoin Brasil</h5>
              <p className="text-gray-400 text-sm">
                Seu portal completo para notícias e análises do mercado crypto brasileiro.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Seções</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="/noticias" className="text-gray-400 hover:text-white">Notícias</Link></li>
                <li><Link href="/mercado" className="text-gray-400 hover:text-white">Mercado</Link></li>
                <li><Link href="/ai-agents" className="text-gray-400 hover:text-white">AI Agents</Link></li>
                <li><Link href="/memes" className="text-gray-400 hover:text-white">Memes</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Parceiros</h6>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://yuotube.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    YuoTube.ai
                  </a>
                </li>
                <li>
                  <a href="https://standardbitcoin.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    Standard Bitcoin
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Contato</h6>
              <p className="text-gray-400 text-sm">
                contato@bitcoinbrasil.com.br
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            © 2024 Bitcoin Brasil. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}