// Custom Document for Bitcoin Brasil with SEO optimizations
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://api.bitcoinbrasil.org" />
        
        {/* PWA Configuration */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="google1ca7b8433f634990" />
        
        {/* Bing Site Verification (optional) */}
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        
        {/* Default meta tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="x-apple-disable-message-reformatting" />
        
        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* Open Graph default image */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Bitcoin Brasil RSS Feed" href="/feed.xml" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Bitcoin Brasil",
              "url": "https://bitcoinbrasil.org",
              "logo": "https://bitcoinbrasil.org/logo.png",
              "sameAs": [
                "https://twitter.com/bitcoinbrasil",
                "https://t.me/bitcoinbrasil",
                "https://github.com/StandardBitcoin10/bitcoinbrasil"
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Accessibility skip link */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Pular para o conteúdo principal
        </a>
      </body>
    </Html>
  );
}