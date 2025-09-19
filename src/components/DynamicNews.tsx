'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Clock, Twitter, Newspaper, Sparkles } from 'lucide-react';
import { newsService, type NewsItem } from '@/lib/news-service';

interface DynamicNewsProps {
  category?: string;
  limit?: number;
  showTwitter?: boolean;
}

export default function DynamicNews({ category, limit = 5, showTwitter = false }: DynamicNewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [twitterPosts, setTwitterPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        // Busca notícias principais
        const newsData = category 
          ? await newsService.getNewsByCategory(category)
          : await newsService.getTrendingNews(limit);
        
        setNews(newsData);
        
        // Busca posts do Twitter se habilitado
        if (showTwitter) {
          const tweets = await newsService.getTwitterPosts();
          setTwitterPosts(tweets);
        }
        
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
      } finally {
        setLoading(false);
      }
    };

    // Busca inicial
    fetchNews();

    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchNews, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [category, limit, showTwitter]);

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Bitcoin': 'bg-orange-500',
      'AI': 'bg-aurora-cyan',
      'ETH': 'bg-purple-500',
      'Solana': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'DeFi': 'bg-aurora-green',
      'NFT': 'bg-aurora-pink',
      'Web3': 'bg-blue-500',
      'Twitter': 'bg-blue-400',
    };
    return colors[cat] || 'bg-gray-500';
  };

  if (loading && news.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-dark rounded-2xl p-6 animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="h-6 bg-aurora-light rounded-full w-20"></div>
              <div className="h-4 bg-aurora-light rounded w-24"></div>
            </div>
            <div className="h-6 bg-aurora-light rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-aurora-light rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com última atualização */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Atualizado: {lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-aurora-cyan animate-pulse" />
          <span>AI-Powered News</span>
        </div>
      </div>

      {/* Posts do Twitter */}
      {showTwitter && twitterPosts.length > 0 && (
        <div className="glass-dark rounded-2xl p-4 border border-blue-400/30">
          <div className="flex items-center gap-2 mb-4">
            <Twitter className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Trending no X</h3>
          </div>
          <div className="space-y-3">
            {twitterPosts.slice(0, 3).map((tweet) => (
              <div key={tweet.id} className="border-l-2 border-blue-400/50 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-400 text-sm font-bold">{tweet.source}</span>
                  <span className="text-xs text-gray-500">
                    {newsService.formatTimeAgo(tweet.timestamp)}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{tweet.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notícias principais */}
      {news.map((item) => (
        <article key={item.id} className="glass-dark rounded-2xl p-6 hover:bg-aurora-light/5 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <span className={`${getCategoryColor(item.category)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
              {item.category}
            </span>
            <span className="text-sm text-gray-400">
              {newsService.formatTimeAgo(item.timestamp)}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2 hover:text-aurora-cyan transition-colors">
            {item.title}
          </h3>
          
          <p className="text-gray-400 mb-3">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Newspaper className="w-3 h-3" />
              {item.source}
            </span>
            {item.url && item.url !== '#' && (
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-aurora-cyan text-sm hover:underline"
              >
                Ler mais →
              </a>
            )}
          </div>
        </article>
      ))}

      {/* Rodapé */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-500">
          Notícias atualizadas em tempo real via AI • Fontes: CoinTelegraph, CoinDesk, X/Twitter, OpenAI
        </p>
      </div>
    </div>
  );
}