'use client';

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

interface HeaderProps {
  title?: string;
  showBackLink?: boolean;
  color?: "orange" | "blue" | "purple" | "green";
}

export default function Header({ 
  title = "Bitcoin Brasil", 
  showBackLink = false,
  color = "orange" 
}: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const colorClasses = {
    orange: {
      text: "text-standard-orange",
      bg: "gradient-standard",
      border: "border-standard-orange"
    },
    blue: {
      text: "text-blue-600", 
      bg: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-200"
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-600 hover:bg-purple-700", 
      border: "border-purple-200"
    },
    green: {
      text: "text-green-600",
      bg: "bg-green-600 hover:bg-green-700",
      border: "border-green-200"
    }
  };

  const colors = colorClasses[color];

  return (
    <header className={`bg-standard-dark shadow-lg border-b-2 ${colors.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackLink && (
              <Link href="/" className={`flex items-center space-x-2 ${colors.text} hover:opacity-80`}>
                <span>← Voltar</span>
              </Link>
            )}
            <h1 className={`text-2xl font-bold text-white`}>{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://yuotube.ai" 
              target="_blank"
              rel="noopener noreferrer"
              className={`gradient-standard text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:opacity-90 transition-opacity`}
            >
              YuoTube.ai <ExternalLink size={14} />
            </a>
            <a 
              href="https://standardbitcoin.io" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-standard-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm border border-standard-orange"
            >
              Standard Bitcoin <ExternalLink size={14} />
            </a>
            
            {/* Authentication Section */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-standard-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity border border-standard-orange"
                  >
                    <User size={18} />
                    <span className="text-sm font-semibold">{user?.username}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-standard-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <Link
                        href="/auth-demo"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="inline mr-2" size={16} />
                        Configurações
                      </Link>
                      <button
                        onClick={async () => {
                          await logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-lg"
                      >
                        <LogOut className="inline mr-2" size={16} />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 bg-white text-standard-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <User size={18} />
                  <span className="text-sm">Entrar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
}