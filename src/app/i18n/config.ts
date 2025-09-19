export const languages = ['pt', 'en', 'es', 'fr', 'de', 'zh', 'ja'] as const;
export type Language = typeof languages[number];

export const defaultLanguage: Language = 'pt';

export const languageNames: Record<Language, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文',
  ja: '日本語'
};

export const languageFlags: Record<Language, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  zh: '🇨🇳',
  ja: '🇯🇵'
};

export const translations: Record<Language, Record<string, string>> = {
  pt: {
    title: 'Bitcoin Brasil',
    subtitle: 'Portal de Autoridade em Crypto e IA',
    news: 'Notícias',
    market: 'Mercado',
    aiAgents: 'Agentes IA',
    education: 'Educação',
    defi: 'DeFi',
    nft: 'NFTs',
    mining: 'Mineração',
    readMore: 'Ler mais',
  },
  en: {
    title: 'Bitcoin Brasil',
    subtitle: 'Authority Portal for Crypto and AI',
    news: 'News',
    market: 'Market',
    aiAgents: 'AI Agents',
    education: 'Education',
    defi: 'DeFi',
    nft: 'NFTs',
    mining: 'Mining',
    readMore: 'Read more',
  },
  es: {
    title: 'Bitcoin Brasil',
    subtitle: 'Portal de Autoridad en Crypto e IA',
    news: 'Noticias',
    market: 'Mercado',
    aiAgents: 'Agentes IA',
    education: 'Educación',
    defi: 'DeFi',
    nft: 'NFTs',
    mining: 'Minería',
    readMore: 'Leer más',
  },
  fr: {
    title: 'Bitcoin Brasil',
    subtitle: 'Portail d\'Autorité Crypto et IA',
    news: 'Actualités',
    market: 'Marché',
    aiAgents: 'Agents IA',
    education: 'Éducation',
    defi: 'DeFi',
    nft: 'NFTs',
    mining: 'Minage',
    readMore: 'Lire plus',
  },
  de: {
    title: 'Bitcoin Brasil',
    subtitle: 'Autoritätsportal für Krypto und KI',
    news: 'Nachrichten',
    market: 'Markt',
    aiAgents: 'KI-Agenten',
    education: 'Bildung',
    defi: 'DeFi',
    nft: 'NFTs',
    mining: 'Mining',
    readMore: 'Mehr lesen',
  },
  zh: {
    title: 'Bitcoin Brasil',
    subtitle: '加密货币和人工智能权威门户',
    news: '新闻',
    market: '市场',
    aiAgents: 'AI代理',
    education: '教育',
    defi: 'DeFi',
    nft: 'NFTs',
    mining: '挖矿',
    readMore: '阅读更多',
  },
  ja: {
    title: 'Bitcoin Brasil',
    subtitle: '暗号通貨とAIの権威ポータル',
    news: 'ニュース',
    market: '市場',
    aiAgents: 'AIエージェント',
    education: '教育',
    defi: 'DeFi',
    nft: 'NFTs',
    mining: 'マイニング',
    readMore: '続きを読む',
  },
};