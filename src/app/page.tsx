'use client';

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CryptoTicker from "@/components/CryptoTicker";
import Link from "next/link";
import { TrendingUp, Brain, Users, BarChart3, Sparkles, Zap, Globe, Shield, Rocket, Star } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-aurora-darker">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-aurora opacity-30 absolute inset-0"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-cyan blur-[150px] opacity-20 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-purple blur-[150px] opacity-20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-aurora-pink blur-[150px] opacity-10 rounded-full"></div>
      </div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section with Aurora Theme */}
        <div className="relative overflow-hidden">
          <div className="gradient-aurora-subtle py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
                    <Sparkles className="w-4 h-4 text-aurora-cyan" />
                    <span className="text-sm font-medium text-white">Portal #1 de Crypto no Brasil</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl font-bold">
                    <span className="text-aurora">Bitcoin Brasil</span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Seu portal definitivo para notícias sobre Bitcoin, criptomoedas, AI agents e o futuro das finanças digitais.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link href="/noticias" className="btn-aurora inline-flex items-center gap-2 group">
                      <Zap className="w-5 h-5 group-hover:animate-pulse" />
                      Explorar Notícias
                    </Link>
                    <Link href="/mercado" className="btn-glass inline-flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Mercado ao Vivo
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-6 pt-4">
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

                {/* Interactive Card */}
                <div className="md:w-1/2 flex justify-center">
                  <div className="card-aurora p-8 text-white max-w-md w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">STBTCx Token</h3>
                      <Rocket className="w-8 h-8 text-aurora-cyan animate-pulse" />
                    </div>
                    
                    <p className="mb-6 text-gray-300">
                      A revolução das memecoins na Solana. Junte-se à comunidade que está transformando o futuro das finanças descentralizadas.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <a 
                        href="https://yuotube.ai" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass rounded-2xl p-4 hover:bg-white/20 transition-all group"
                      >
                        <div className="font-semibold mb-1 group-hover:text-aurora-cyan transition-colors">
                          YuoTube.ai
                        </div>
                        <div className="text-sm text-gray-400">Plataforma AI</div>
                      </a>
                      <a 
                        href="https://standardbitcoin.io" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass rounded-2xl p-4 hover:bg-white/20 transition-all group"
                      >
                        <div className="font-semibold mb-1 group-hover:text-aurora-purple transition-colors">
                          Standard Bitcoin
                        </div>
                        <div className="text-sm text-gray-400">Dashboard</div>
                      </a>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Powered by Solana</span>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-aurora-green rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-aurora-cyan rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-aurora-purple rounded-full animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Featured News */}
              <section className="card-aurora">
                <div className="gradient-aurora p-6 rounded-t-3xl">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <TrendingUp className="w-6 h-6" />
                    Notícias em Destaque
                  </h2>
                </div>
                
                <div className="p-6 space-y-6">
                  {[
                    {
                      title: "Bitcoin atinge nova máxima histórica em 2025",
                      description: "Análise completa do movimento de preços e o que esperar para os próximos meses com a adoção institucional crescente...",
                      time: "Há 2 horas",
                      tag: "URGENTE",
                      tagColor: "bg-aurora-pink"
                    },
                    {
                      title: "AI Agents revolucionam trading de criptomoedas",
                      description: "Como a inteligência artificial está transformando o mercado crypto com estratégias automatizadas avançadas...",
                      time: "Há 5 horas",
                      tag: "AI",
                      tagColor: "bg-aurora-cyan"
                    },
                    {
                      title: "Ethereum 3.0: Nova atualização promete velocidade 100x maior",
                      description: "Vitalik Buterin anuncia roadmap revolucionário para a rede Ethereum com sharding e zero-knowledge proofs...",
                      time: "Há 8 horas",
                      tag: "ETH",
                      tagColor: "bg-aurora-purple"
                    },
                    {
                      title: "Brasil lidera adoção de Bitcoin na América Latina",
                      description: "Relatório mostra crescimento de 300% no volume de transações em 2024...",
                      time: "Há 12 horas",
                      tag: "BRASIL",
                      tagColor: "bg-aurora-green"
                    }
                  ].map((news, index) => (
                    <article key={index} className="glass-dark rounded-2xl p-6 hover:scale-[1.01] transition-transform">
                      <Link href="/noticias" className="group">
                        <div className="flex items-start justify-between mb-3">
                          <span className={`${news.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {news.tag}
                          </span>
                          <span className="text-sm text-gray-400">{news.time}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-aurora-cyan transition-colors mb-2">
                          {news.title}
                        </h3>
                        <p className="text-gray-400 line-clamp-2">
                          {news.description}
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
                
                <div className="p-6 border-t border-gray-700">
                  <Link href="/noticias" className="flex items-center justify-center gap-2 text-aurora-cyan hover:text-aurora-purple transition-colors font-medium">
                    Ver todas as notícias
                    <TrendingUp className="w-4 h-4" />
                  </Link>
                </div>
              </section>

              {/* AI Agents Section */}
              <section className="card-aurora">
                <div className="gradient-aurora p-6 rounded-t-3xl">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Brain className="w-6 h-6" />
                    AI Agents & Automação
                  </h2>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6">
                    Explore o futuro do trading automatizado com AI agents avançados.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: "ChatGPT", status: "Online", color: "text-aurora-green" },
                      { name: "Gemini", status: "Beta", color: "text-aurora-cyan" },
                      { name: "Claude", status: "Premium", color: "text-aurora-purple" }
                    ].map((agent) => (
                      <div key={agent.name} className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                        <div className="text-lg font-bold text-white mb-1">{agent.name}</div>
                        <div className={`text-sm font-medium ${agent.color}`}>{agent.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar with Crypto Ticker */}
            <div className="space-y-8">
              {mounted && <CryptoTicker />}
              
              {/* Quick Stats */}
              <div className="card-aurora p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-aurora-cyan" />
                  Comunidade Global
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Usuários Ativos</span>
                    <span className="text-white font-bold">1.2M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Artigos Publicados</span>
                    <span className="text-white font-bold">1,001</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI Agents</span>
                    <span className="text-white font-bold">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Idiomas</span>
                    <span className="text-white font-bold">7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}