// Main App Component with SEO Enhancements
// This integrates all SEO components without changing the UI

import { useEffect } from 'react';
import GoogleAnalytics, { GTMNoScript } from '../components/Analytics/GoogleAnalytics';
import { injectStructuredData, websiteSchema, organizationSchema } from '../components/SEO/StructuredData';

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    // Inject global structured data on app load
    injectStructuredData(websiteSchema);
    injectStructuredData(organizationSchema);
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('Service Worker registered:', registration);
          },
          (error) => {
            console.log('Service Worker registration failed:', error);
          }
        );
      });
    }
    
    // Performance monitoring
    if (typeof window !== 'undefined' && window.performance) {
      // Log Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Send to analytics
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: entry.name,
              value: Math.round(entry.value)
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  }, []);

  return (
    <>
      {/* Google Analytics and Tag Manager */}
      <GoogleAnalytics />
      
      {/* GTM NoScript fallback */}
      <GTMNoScript />
      
      {/* Main Application */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;