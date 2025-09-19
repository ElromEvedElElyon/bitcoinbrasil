import Header from "@/components/Header";
import Link from "next/link";
import { TrendingUp, Brain, Users, ChartBar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-standard-dark">
      <Header />

      {/* Hero Section */}
      <div className="gradient-standard text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl font-bold mb-6">
                Bitcoin Brasil
              </h1>
              <p className="text-xl mb-8">
                Seu portal definitivo para notícias sobre Bitcoin, criptomoedas, AI agents e o futuro das finanças digitais.
              </p>
              <div className="flex space-x-4">
                <Link href="/noticias" className="bg-white text-standard-orange px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Ler Notícias
                </Link>
                <Link href="/mercado" className="bg-standard-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity border border-standard-orange">
                  Ver Mercado
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="gradient-standard rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">STBTCx Token</h3>
                <p className="mb-4">A revolução das memecoins na Solana</p>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://yuotube.ai" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 rounded p-3 hover:bg-white/30 transition-colors"
                  >
                    <div className="font-semibold">YuoTube.ai</div>
                    <div className="text-sm opacity-90">Plataforma AI</div>
                  </a>
                  <a 
                    href="https://standardbitcoin.io" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 rounded p-3 hover:bg-white/30 transition-colors"
                  >
                    <div className="font-semibold">Standard Bitcoin</div>
                    <div className="text-sm opacity-90">Dashboard Analytics</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured News */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-2 border-standard-orange">
              <h2 className="text-2xl font-bold mb-6 text-standard-orange flex items-center">
                <TrendingUp className="mr-2" />
                Notícias em Destaque
              </h2>
              <div className="space-y-4">
                <article className="border-b pb-4">
                  <Link href="/noticias" className="group">
                    <h3 className="text-xl font-semibold group-hover:text-standard-orange transition-colors">
                      Bitcoin atinge nova máxima histórica em 2025
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Análise completa do movimento de preços e o que esperar para os próximos meses...
                    </p>
                    <span className="text-sm text-gray-500">Há 2 horas</span>
                  </Link>
                </article>
                <article className="border-b pb-4">
                  <Link href="/noticias" className="group">
                    <h3 className="text-xl font-semibold group-hover:text-standard-orange transition-colors">
                      AI Agents revolucionam trading de criptomoedas
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Como a inteligência artificial está transformando o mercado crypto...
                    </p>
                    <span className="text-sm text-gray-500">Há 5 horas</span>
                  </Link>
                </article>
              </div>
              <Link href="/noticias" className="text-standard-orange hover:underline block mt-4">
                Ver todas as notícias →
              </Link>
            </section>

            {/* Market Data */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-2 border-standard-orange">
              <h2 className="text-2xl font-bold mb-6 text-standard-orange flex items-center">
                <ChartBar className="mr-2" />
                Mercado Crypto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-4 text-white">
                  <h4 className="font-semibold">Bitcoin</h4>
                  <p className="text-2xl font-bold">$98,450</p>
                  <p className="text-sm">+5.3% (24h)</p>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-4 text-white">
                  <h4 className="font-semibold">Ethereum</h4>
                  <p className="text-2xl font-bold">$3,890</p>
                  <p className="text-sm">+3.2% (24h)</p>
                </div>
                <div className="gradient-standard rounded-lg p-4 text-white">
                  <h4 className="font-semibold">Solana</h4>
                  <p className="text-2xl font-bold">$185</p>
                  <p className="text-sm">+8.7% (24h)</p>
                </div>
              </div>
              <Link href="/mercado" className="text-standard-orange hover:underline block mt-4">
                Análise completa do mercado →
              </Link>
            </section>

            {/* AI Agents */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-2 border-standard-orange">
              <h2 className="text-2xl font-bold mb-6 text-standard-orange flex items-center">
                <Brain className="mr-2" />
                AI Agents
              </h2>
              <p className="text-gray-600 mb-4">
                Descubra como agentes de inteligência artificial estão revolucionando o trading de criptomoedas.
              </p>
              <Link href="/ai-agents" className="text-standard-orange hover:underline">
                Explorar AI Agents →
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Community Memes */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-standard-orange">
              <div className="flex items-center mb-4">
                <Users className="text-standard-orange mr-2" size={20} />
                <h4 className="font-bold">Memes da Comunidade</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm">&quot;HODL até a lua! 🚀&quot;</p>
                  <span className="text-xs text-gray-500">@cryptobrasil</span>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm">&quot;Bitcoin é o futuro do dinheiro 💰&quot;</p>
                  <span className="text-xs text-gray-500">@bitcoinmaxi</span>
                </div>
              </div>
              <Link href="/memes" className="text-standard-orange hover:underline block mt-4">
                Ver mais memes →
              </Link>
            </div>

            {/* Authority Sites */}
            <div className="gradient-standard rounded-xl p-6 text-white">
              <h4 className="font-bold mb-4">Sites de Referência</h4>
              <div className="space-y-3">
                <a 
                  href="https://yuotube.ai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/20 rounded p-3 hover:bg-white/30 transition-colors"
                >
                  <div className="font-semibold">YuoTube.ai</div>
                  <div className="text-sm opacity-90">Plataforma AI completa</div>
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
      <footer className="bg-standard-dark text-white py-8 border-t-2 border-standard-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold mb-4 text-standard-orange">Bitcoin Brasil</h5>
              <p className="text-gray-400 text-sm">
                Seu portal completo para notícias e análises do mercado crypto brasileiro.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Seções</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="/noticias" className="text-gray-400 hover:text-standard-orange">Notícias</Link></li>
                <li><Link href="/mercado" className="text-gray-400 hover:text-standard-orange">Mercado</Link></li>
                <li><Link href="/ai-agents" className="text-gray-400 hover:text-standard-orange">AI Agents</Link></li>
                <li><Link href="/memes" className="text-gray-400 hover:text-standard-orange">Memes</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Sites Parceiros</h6>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://yuotube.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-standard-orange">
                    YuoTube.ai
                  </a>
                </li>
                <li>
                  <a href="https://standardbitcoin.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-standard-orange">
                    Standard Bitcoin
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Comunidade</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-standard-orange">Twitter/X</a></li>
                <li><a href="#" className="text-gray-400 hover:text-standard-orange">Telegram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-standard-orange">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-standard-orange/30 text-center text-gray-400 text-sm">
            © 2025 Bitcoin Brasil. Todos os direitos reservados. | Powered by AI
          </div>
        </div>
      </footer>
    </div>
  );
}