// Meta Tags Component for Bitcoin Brasil
// Handles all SEO meta tags including canonical URLs

import Head from 'next/head';

const MetaTags = ({ 
  title = 'Bitcoin Brasil - Notícias Crypto, AI Agents e Memes',
  description = 'Seu portal completo de notícias sobre Bitcoin, criptomoedas, AI agents e memes crypto. Mais de 1.2M de usuários e 1,001 artigos.',
  keywords = 'bitcoin, criptomoedas, blockchain, ai agents, memes crypto, stbtcx, solana, brasil, notícias crypto, mercado bitcoin',
  author = 'Bitcoin Brasil',
  image = 'https://bitcoinbrasil.org/og-image.jpg',
  url = 'https://bitcoinbrasil.org',
  type = 'website',
  locale = 'pt_BR',
  alternateLocales = ['en_US', 'es_ES'],
  twitterHandle = '@bitcoinbrasil',
  publishedDate = null,
  modifiedDate = null,
  canonical = null,
  noindex = false,
  nofollow = false
}) => {
  
  const canonicalUrl = canonical || url;
  const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate Languages */}
      {alternateLocales.map(locale => (
        <link 
          key={locale}
          rel="alternate" 
          hrefLang={locale.replace('_', '-').toLowerCase()} 
          href={`${url}/${locale.split('_')[0].toLowerCase()}`} 
        />
      ))}
      
      {/* Robots Meta */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Bitcoin Brasil" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Article Meta Tags (for news pages) */}
      {publishedDate && (
        <>
          <meta property="article:published_time" content={publishedDate} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Cryptocurrency" />
          <meta property="article:tag" content={keywords} />
        </>
      )}
      {modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Bitcoin Brasil" />
      
      {/* Google Site Verification */}
      <meta name="google-site-verification" content="google1ca7b8433f634990" />
      
      {/* Preconnect to optimize loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title="Bitcoin Brasil RSS Feed" href="/feed.xml" />
      
      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
    </Head>
  );
};

// Specific meta tags for different page types
export const HomePageMeta = () => (
  <MetaTags 
    title="Bitcoin Brasil - Portal #1 de Notícias Crypto e AI Agents"
    description="Acompanhe as últimas notícias sobre Bitcoin, criptomoedas, AI agents e memes crypto. Mais de 1.2M de usuários confiam em nossa plataforma."
    canonical="https://bitcoinbrasil.org"
  />
);

export const NewsPageMeta = ({ article }) => (
  <MetaTags 
    title={`${article.title} | Bitcoin Brasil`}
    description={article.excerpt}
    keywords={article.tags?.join(', ')}
    image={article.featuredImage}
    url={`https://bitcoinbrasil.org/noticias/${article.slug}`}
    canonical={`https://bitcoinbrasil.org/noticias/${article.slug}`}
    type="article"
    publishedDate={article.publishedDate}
    modifiedDate={article.modifiedDate}
    author={article.author}
  />
);

export const CategoryPageMeta = ({ category }) => (
  <MetaTags 
    title={`${category.name} - Notícias e Análises | Bitcoin Brasil`}
    description={`Últimas notícias e análises sobre ${category.name}. Mantenha-se atualizado com Bitcoin Brasil.`}
    canonical={`https://bitcoinbrasil.org/categoria/${category.slug}`}
  />
);

export const MarketPageMeta = () => (
  <MetaTags 
    title="Mercado Crypto ao Vivo - Preços e Gráficos | Bitcoin Brasil"
    description="Acompanhe os preços de Bitcoin e criptomoedas em tempo real. Gráficos, análises e ferramentas para traders."
    canonical="https://bitcoinbrasil.org/mercado"
  />
);

export default MetaTags;