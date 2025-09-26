// Schema.org Structured Data Component for Bitcoin Brasil
// This component adds JSON-LD structured data without changing the UI

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bitcoin Brasil",
  "alternateName": "Bitcoin Brasil - Portal de Notícias Crypto",
  "url": "https://bitcoinbrasil.org",
  "description": "Seu portal definitivo para notícias sobre Bitcoin, criptomoedas, AI agents e o futuro das finanças digitais.",
  "inLanguage": ["pt-BR", "en", "es", "fr", "de", "it", "ja"],
  "publisher": {
    "@type": "Organization",
    "name": "Bitcoin Brasil",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bitcoinbrasil.org/logo.png",
      "width": 512,
      "height": 512
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://bitcoinbrasil.org/buscar?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "sameAs": [
    "https://twitter.com/bitcoinbrasil",
    "https://t.me/bitcoinbrasil",
    "https://github.com/StandardBitcoin10/bitcoinbrasil"
  ]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bitcoin Brasil",
  "url": "https://bitcoinbrasil.org",
  "logo": "https://bitcoinbrasil.org/logo.png",
  "description": "Portal líder em notícias sobre Bitcoin, criptomoedas, AI agents e memes crypto no Brasil.",
  "foundingDate": "2024",
  "founders": [
    {
      "@type": "Person",
      "name": "Bitcoin Brasil Team"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressLocality": "São Paulo"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contato@bitcoinbrasil.org",
    "availableLanguage": ["Portuguese", "English", "Spanish"]
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 10
  }
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const articleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": article.title,
  "image": article.image || "https://bitcoinbrasil.org/default-article.jpg",
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate || article.publishedDate,
  "author": {
    "@type": "Person",
    "name": article.author || "Bitcoin Brasil Team",
    "url": "https://bitcoinbrasil.org/autor/" + (article.authorSlug || "team")
  },
  "publisher": {
    "@type": "Organization",
    "name": "Bitcoin Brasil",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bitcoinbrasil.org/logo.png"
    }
  },
  "description": article.excerpt,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  },
  "keywords": article.keywords || "bitcoin, criptomoedas, blockchain, brasil",
  "articleSection": article.category || "Notícias",
  "inLanguage": "pt-BR"
});

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é Bitcoin Brasil?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bitcoin Brasil é o principal portal de notícias sobre Bitcoin, criptomoedas, AI agents e memes crypto, com mais de 1.2M de usuários e 1,001 artigos publicados."
      }
    },
    {
      "@type": "Question",
      "name": "Como comprar STBTCx Token?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Você pode comprar STBTCx Token diretamente em nossa plataforma clicando no botão 'Comprar Agora' na página inicial ou acessando a seção dedicada ao token."
      }
    },
    {
      "@type": "Question",
      "name": "Bitcoin Brasil é confiável?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, Bitcoin Brasil é uma plataforma confiável com SSL seguro, verificação Google, e uma comunidade de mais de 1.2 milhões de usuários ativos."
      }
    },
    {
      "@type": "Question",
      "name": "Quais idiomas estão disponíveis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bitcoin Brasil oferece suporte para 7 idiomas incluindo Português, Inglês, Espanhol, Francês, Alemão, Italiano e Japonês."
      }
    }
  ]
};

export const cryptoSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "STBTCx Token",
  "description": "Token oficial da plataforma Bitcoin Brasil construído na rede Solana",
  "url": "https://bitcoinbrasil.org/stbtcx",
  "provider": {
    "@type": "Organization",
    "name": "Bitcoin Brasil",
    "url": "https://bitcoinbrasil.org"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "Variable",
    "priceCurrency": "USD",
    "url": "https://bitcoinbrasil.org/stbtcx/comprar"
  },
  "category": "Cryptocurrency",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Blockchain",
      "value": "Solana"
    },
    {
      "@type": "PropertyValue",
      "name": "Token Type",
      "value": "Utility Token"
    }
  ]
};

// Helper function to inject structured data into page head
export const injectStructuredData = (schema) => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
  }
};

// Component to be used in Next.js pages
import Head from 'next/head';

export const StructuredDataHead = ({ schemas = [] }) => {
  return (
    <Head>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
};

const StructuredDataExports = {
  websiteSchema,
  organizationSchema,
  breadcrumbSchema,
  articleSchema,
  faqSchema,
  cryptoSchema,
  injectStructuredData,
  StructuredDataHead
};

export default StructuredDataExports;