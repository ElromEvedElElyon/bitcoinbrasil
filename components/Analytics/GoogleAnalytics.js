// Google Analytics and Tag Manager Component for Bitcoin Brasil
// Handles all tracking and analytics without changing UI

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = 'G-BITCOINBR25'; // Replace with your actual GA4 ID

// Google Tag Manager Configuration  
const GTM_ID = 'GTM-BTCBR25'; // Replace with your actual GTM ID

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions
export const trackConversion = (conversionData) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_MEASUREMENT_ID}/conversion`,
      value: conversionData.value,
      currency: conversionData.currency || 'BRL',
      transaction_id: conversionData.transactionId,
    });
  }
};

// Track social interactions
export const trackSocial = (network, action, target) => {
  event({
    action: 'social',
    category: 'Social',
    label: `${network} - ${action}`,
    value: target,
  });
};

// Track search queries
export const trackSearch = (searchTerm) => {
  event({
    action: 'search',
    category: 'Site Search',
    label: searchTerm,
  });
};

// Track scroll depth
export const trackScrollDepth = () => {
  if (typeof window === 'undefined') return;
  
  let scrollDepths = [25, 50, 75, 100];
  let scrolledDepths = [];
  
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !scrolledDepths.includes(depth)) {
        scrolledDepths.push(depth);
        event({
          action: 'scroll_depth',
          category: 'Engagement',
          label: `${depth}%`,
          value: depth,
        });
      }
    });
  });
};

// Google Analytics Component
export const GoogleAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Track initial page load
    pageview(window.location.pathname);
    
    // Initialize scroll tracking
    trackScrollDepth();
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            cookie_flags: 'SameSite=None;Secure',
            anonymize_ip: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: true
          });
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
    </>
  );
};

// Google Tag Manager NoScript (for body)
export const GTMNoScript = () => (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
    />
  </noscript>
);

// Enhanced Ecommerce Tracking for STBTCx Token
export const trackTokenPurchase = (tokenData) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      currency: 'USD',
      value: tokenData.value,
      items: [{
        item_id: 'STBTCX',
        item_name: 'STBTCx Token',
        item_category: 'Cryptocurrency',
        item_variant: tokenData.network || 'Solana',
        price: tokenData.price,
        quantity: tokenData.quantity
      }]
    });
  }
};

// Track article engagement
export const trackArticleEngagement = (article) => {
  event({
    action: 'article_read',
    category: 'Content',
    label: article.title,
    value: article.readTime || 0
  });
};

// Track video engagement
export const trackVideoEngagement = (video) => {
  event({
    action: 'video_play',
    category: 'Video',
    label: video.title,
    value: video.duration || 0
  });
};

// Custom hook for analytics
export const useAnalytics = () => {
  return {
    trackEvent: event,
    trackPageview: pageview,
    trackConversion,
    trackSocial,
    trackSearch,
    trackTokenPurchase,
    trackArticleEngagement,
    trackVideoEngagement
  };
};

export default GoogleAnalytics;