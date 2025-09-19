import Link from "next/link";
import { TrendingUp, Brain, Users, BarChart3, Sparkles, Zap, Globe, Shield, Rocket, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-aurora-darker">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-aurora opacity-30 absolute inset-0"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-cyan blur-[150px] opacity-20 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-purple blur-[150px] opacity-20 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-aurora-dark shadow-lg border-b-2 border-aurora-cyan">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-white">Bitcoin Brasil</h1>
              <div className="flex space-x-4">
                <a 
                  href="https://yuotube.ai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-aurora text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  YuoTube.ai
                </a>
                <a 
                  href="https://standardbitcoin.io" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-aurora-light text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm border border-aurora-purple"
                >
                  Standard Bitcoin
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="gradient-aurora-subtle py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-aurora-cyan" />
                <span className="text-sm font-medium text-white">Portal #1 de Crypto no Brasil</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-aurora">Bitcoin Brasil</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Seu portal definitivo para notícias sobre Bitcoin, criptomoedas, AI agents e o futuro das finanças digitais.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/noticias" className="btn-aurora inline-flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Explorar Notícias
                </Link>
                <Link href="/mercado" className="btn-glass inline-flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Mercado ao Vivo
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 justify-center mt-12">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-aurora-green" />
                  <span>SSL Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Globe className="w-4 h-4 text-aurora-blue" />
                  <span>7 Idiomas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Star className="w-4 h-4 text-aurora-pink" />
                  <span>1000+ Artigos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured News */}
            <div className="lg:col-span-2">
              <div className="card-aurora">
                <div className="gradient-aurora p-6 rounded-t-3xl">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <TrendingUp className="w-6 h-6" />
                    Notícias em Destaque
                  </h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <article className="glass-dark rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="bg-aurora-pink text-white text-xs font-bold px-3 py-1 rounded-full">
                        URGENTE
                      </span>
                      <span className="text-sm text-gray-400">Há 2 horas</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Bitcoin atinge nova máxima histórica em 2025
                    </h3>
                    <p className="text-gray-400">
                      Análise completa do movimento de preços e o que esperar para os próximos meses...
                    </p>
                  </article>

                  <article className="glass-dark rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="bg-aurora-cyan text-white text-xs font-bold px-3 py-1 rounded-full">
                        AI
                      </span>
                      <span className="text-sm text-gray-400">Há 5 horas</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      AI Agents revolucionam trading de criptomoedas
                    </h3>
                    <p className="text-gray-400">
                      Como a inteligência artificial está transformando o mercado crypto...
                    </p>
                  </article>

                  <article className="glass-dark rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="bg-aurora-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                        ETH
                      </span>
                      <span className="text-sm text-gray-400">Há 8 horas</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Ethereum 3.0: Nova atualização promete velocidade 100x maior
                    </h3>
                    <p className="text-gray-400">
                      Vitalik Buterin anuncia roadmap revolucionário para a rede Ethereum...
                    </p>
                  </article>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Crypto Prices */}
              <div className="card-aurora p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">
                  Mercado Crypto
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bitcoin</span>
                    <span className="text-white font-bold">$95,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Ethereum</span>
                    <span className="text-white font-bold">$3,567</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Solana</span>
                    <span className="text-white font-bold">$187</span>
                  </div>
                </div>
              </div>

              {/* STBTCx Card */}
              <div className="card-aurora p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">STBTCx Token</h3>
                  <Rocket className="w-6 h-6 text-aurora-cyan animate-pulse" />
                </div>
                <p className="text-gray-300 mb-4">
                  A revolução das memecoins na Solana.
                </p>
                <a 
                  href="https://pump.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-aurora w-full text-center block"
                >
                  Comprar Agora
                </a>
              </div>

              {/* Community Stats */}
              <div className="card-aurora p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-aurora-cyan" />
                  Comunidade
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Usuários</span>
                    <span className="text-white font-bold">1.2M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Artigos</span>
                    <span className="text-white font-bold">1,001</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI Agents</span>
                    <span className="text-white font-bold">7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-aurora-dark border-t border-gray-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-400">
              <p className="mb-2">© 2025 Bitcoin Brasil - Todos os direitos reservados</p>
              <p className="text-sm">Portal de notícias sobre Bitcoin, Criptomoedas e AI Agents</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}