import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitcoin Brasil - Notícias Crypto, AI Agents e Memes",
  description: "Seu portal completo de notícias sobre Bitcoin, criptomoedas, AI agents e memes crypto. Fique por dentro do mercado digital brasileiro.",
  metadataBase: new URL('https://bitcoinbrasil.org'),
  openGraph: {
    title: 'Bitcoin Brasil',
    description: 'Portal de notícias crypto e AI agents',
    url: 'https://bitcoinbrasil.org',
    siteName: 'Bitcoin Brasil',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
