'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
import { User, LogOut, Settings, Shield, Globe, Bell, Moon, Sun } from 'lucide-react';

export default function AuthDemo() {
  const { user, isAuthenticated, logout, updatePreferences } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [theme, setTheme] = useState(user?.preferences?.theme || 'dark');
  
  const handleThemeToggle = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (isAuthenticated) {
      await updatePreferences({ theme: newTheme });
    }
  };
  
  const handleLogout = async () => {
    await logout();
    setShowAuthModal(false);
  };
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-standard-dark text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="gradient-standard shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">
              🔐 Bitcoin Brasil Auth System
            </h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
              </button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="text-white">
                    <span className="text-sm opacity-90">Olá,</span>
                    <span className="ml-1 font-semibold">{user?.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <LogOut size={18} />
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-standard-orange rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <User size={18} />
                  Entrar / Registrar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features Section */}
          <div className="lg:col-span-2">
            <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-standard-secondary' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-6 text-standard-orange">
                Sistema de Autenticação Moderno
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 gradient-standard rounded-lg">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Sem Cookies</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Sistema baseado em JWT com armazenamento local. Mais seguro e privado.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 gradient-standard rounded-lg">
                    <Globe className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Multi-idiomas</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Suporte para 7 idiomas: PT, EN, ES, FR, DE, ZH, JA.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 gradient-standard rounded-lg">
                    <Bell className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WebSocket em Tempo Real</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Comunicação bidirecional para features em tempo real.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 gradient-standard rounded-lg">
                    <Settings className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Gestão de Sessões</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Controle total sobre sessões ativas e refresh tokens automático.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Technical Details */}
            <div className={`mt-8 rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-standard-secondary' : 'bg-white'}`}>
              <h3 className="text-xl font-bold mb-4">Detalhes Técnicos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h4 className="font-semibold mb-2 text-standard-orange">Frontend</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• Next.js 15 com App Router</li>
                    <li>• React Context API</li>
                    <li>• TypeScript</li>
                    <li>• localStorage para tokens</li>
                  </ul>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h4 className="font-semibold mb-2 text-standard-orange">Backend</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• Express.js</li>
                    <li>• JWT Authentication</li>
                    <li>• WebSocket (ws)</li>
                    <li>• Rate Limiting</li>
                  </ul>
                </div>
              </div>
              
              <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className="font-semibold mb-2 text-standard-orange">Segurança</h4>
                <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>• Bcrypt para hash de senhas</li>
                  <li>• Helmet para headers de segurança</li>
                  <li>• CORS configurado</li>
                  <li>• Rate limiting para prevenir brute force</li>
                  <li>• Tokens com expiração curta (15 min)</li>
                  <li>• Refresh tokens seguros (7 dias)</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* User Profile Section */}
          <div>
            {isAuthenticated ? (
              <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-standard-secondary' : 'bg-white'}`}>
                <h3 className="text-xl font-bold mb-4">Perfil do Usuário</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Nome</label>
                    <p className="font-semibold">{user?.username}</p>
                  </div>
                  
                  <div>
                    <label className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                  
                  <div>
                    <label className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Idioma</label>
                    <p className="font-semibold">{user?.language?.toUpperCase()}</p>
                  </div>
                  
                  <div>
                    <label className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Tema</label>
                    <p className="font-semibold capitalize">{theme}</p>
                  </div>
                  
                  <div>
                    <label className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Notificações</label>
                    <p className="font-semibold">{user?.preferences?.notifications ? 'Ativadas' : 'Desativadas'}</p>
                  </div>
                  
                  <button className="w-full gradient-standard text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Editar Perfil
                  </button>
                </div>
              </div>
            ) : (
              <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-standard-secondary' : 'bg-white'}`}>
                <h3 className="text-xl font-bold mb-4">Bem-vindo!</h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Faça login ou crie uma conta para acessar todos os recursos do Bitcoin Brasil.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full gradient-standard text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                  Começar Agora
                </button>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2">Benefícios da Conta:</h4>
                  <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>✅ Acesso a conteúdo exclusivo</li>
                    <li>✅ Notificações personalizadas</li>
                    <li>✅ Histórico de leitura</li>
                    <li>✅ Favoritos e bookmarks</li>
                    <li>✅ Comentários e interação</li>
                    <li>✅ Multi-idiomas</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* API Status */}
        <div className={`mt-8 rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-standard-secondary' : 'bg-white'}`}>
          <h3 className="text-xl font-bold mb-4">Status da API</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="text-2xl font-bold text-green-500">Online</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Auth Server</div>
            </div>
            
            <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="text-2xl font-bold text-green-500">Active</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>WebSocket</div>
            </div>
            
            <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="text-2xl font-bold text-standard-orange">Secure</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>JWT Active</div>
            </div>
            
            <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="text-2xl font-bold text-blue-500">Fast</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>< 50ms</div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}