'use client';

import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink, RefreshCw, Twitter, Brain, Bitcoin, Newspaper } from "lucide-react";
import DynamicNews from '@/components/DynamicNews';
import { useState } from 'react';

export default function Noticias() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const categories = [
    { name: 'Todas', value: undefined, icon: Newspaper, color: 'bg-gray-600' },
    { name: 'Bitcoin', value: 'Bitcoin', icon: Bitcoin, color: 'bg-orange-500' },
    { name: 'AI', value: 'AI', icon: Brain, color: 'bg-aurora-cyan' },
    { name: 'Twitter/X', value: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
    { name: 'Ethereum', value: 'ETH', color: 'bg-purple-500' },
    { name: 'Solana', value: 'Solana', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'DeFi', value: 'DeFi', color: 'bg-aurora-green' },
  ];

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
              <div className="flex items-center space-x-4">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 text-aurora-cyan hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Voltar</span>
                </Link>
                <h1 className="text-2xl font-bold text-white">Bitcoin Brasil</h1>
              </div>
              <div className="flex space-x-4">
                <a 
                  href="https://yuotube.ai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-aurora text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  YuoTube.ai <ExternalLink size={14} />
                </a>
                <a 
                  href="https://standardbitcoin.io" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-aurora-light text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm border border-aurora-purple flex items-center gap-2"
                >
                  Standard Bitcoin <ExternalLink size={14} />
                </a>
                <a 
                  href="https://pump.fun/coin/386JZJtkvf43yoNawAHmHHeEhZWUTZ4UuJJtxC9fpump" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-aurora-pink text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm border border-aurora-cyan flex items-center gap-2"
                >
                  STBTCx Token <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Notícias em Tempo Real
            </h2>
            <p className="text-gray-400">
              Atualizações ao vivo de Bitcoin, Criptomoedas e Inteligência Artificial • Setembro 2025
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? `${cat.color} text-white`
                    : 'glass text-gray-300 hover:text-white'
                }`}
              >
                {cat.icon && <cat.icon className="inline w-4 h-4 mr-1" />}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Live Update Banner */}
          <div className="glass-dark rounded-2xl p-4 mb-8 border border-aurora-cyan/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-aurora-green rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-aurora-green rounded-full"></div>
                </div>
                <span className="text-white font-medium">
                  Sistema de notícias com AI atualizado em tempo real
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auto-refresh: 5 min</span>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main News Column */}
            <div className="lg:col-span-2">
              <div className="card-aurora">
                <div className="gradient-aurora p-6 rounded-t-3xl">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedCategory ? `Notícias de ${selectedCategory}` : 'Últimas Notícias'}
                  </h3>
                </div>
                <div className="p-6">
                  <DynamicNews 
                    category={selectedCategory} 
                    limit={10} 
                    showTwitter={!selectedCategory || selectedCategory === 'Twitter'}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Analysis Box */}
              <div className="card-aurora p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-aurora-cyan" />
                  <h3 className="text-lg font-bold text-white">Análise AI</h3>
                </div>
                <div className="space-y-3">
                  <div className="glass-dark rounded-lg p-3">
                    <p className="text-sm text-gray-300">
                      <span className="text-aurora-green font-bold">Sentimento:</span> Bullish 📈
                    </p>
                  </div>
                  <div className="glass-dark rounded-lg p-3">
                    <p className="text-sm text-gray-300">
                      <span className="text-aurora-cyan font-bold">Tendência:</span> Alta de 15% prevista
                    </p>
                  </div>
                  <div className="glass-dark rounded-lg p-3">
                    <p className="text-sm text-gray-300">
                      <span className="text-aurora-pink font-bold">Volume:</span> Acima da média
                    </p>
                  </div>
                </div>
              </div>

              {/* Trending Topics */}
              <div className="card-aurora p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Trending no X</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-blue-400 font-bold">#Bitcoin</span>
                    <span className="text-gray-400 ml-2">1.2M posts</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-400 font-bold">#GPT5</span>
                    <span className="text-gray-400 ml-2">856K posts</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-400 font-bold">#Ethereum</span>
                    <span className="text-gray-400 ml-2">623K posts</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-400 font-bold">#STBTCx</span>
                    <span className="text-gray-400 ml-2">412K posts</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-400 font-bold">#AIAgents</span>
                    <span className="text-gray-400 ml-2">387K posts</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card-aurora p-6">
                <h3 className="text-lg font-bold text-white mb-4">Links Rápidos</h3>
                <div className="space-y-3">
                  <a 
                    href="https://yuotube.ai" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-aurora w-full text-center block"
                  >
                    YuoTube.ai
                  </a>
                  <a 
                    href="https://standardbitcoin.io" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass w-full text-center block"
                  >
                    Standard Bitcoin
                  </a>
                  <a 
                    href="https://pump.fun/coin/386JZJtkvf43yoNawAHmHHeEhZWUTZ4UuJJtxC9fpump" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-aurora-pink text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm w-full text-center block"
                  >
                    Comprar STBTCx
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-aurora-dark border-t-2 border-aurora-cyan py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h5 className="font-bold mb-4 text-white">Bitcoin Brasil</h5>
              <p className="text-gray-400 text-sm mb-4">
                Portal de notícias crypto com AI • Atualizado em tempo real • Setembro 2025
              </p>
              <div className="flex justify-center space-x-6">
                <span className="text-gray-500 text-xs">
                  Powered by Claude 4.1, GPT-5, and real-time data feeds
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}