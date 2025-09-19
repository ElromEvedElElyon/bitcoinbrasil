import Link from "next/link";
import { ArrowLeft, Bot, Zap, TrendingUp, Shield, ExternalLink } from "lucide-react";

export default function AIAgents() {
  const agents = [
    {
      id: 1,
      nome: "CryptoBot Pro",
      descricao: "Agente especializado em análise técnica e trading automatizado de Bitcoin e Ethereum.",
      categoria: "Trading",
      eficiencia: "94%",
      status: "Ativo",
      cor: "blue"
    },
    {
      id: 2,
      nome: "News Analyzer AI",
      descricao: "Processa notícias em tempo real para identificar oportunidades de mercado.",
      categoria: "Análise",
      eficiencia: "87%",
      status: "Ativo",
      cor: "green"
    },
    {
      id: 3,
      nome: "Risk Guardian",
      descricao: "Monitora riscos de carteira e sugere estratégias de proteção patrimonial.",
      categoria: "Segurança",
      eficiencia: "91%",
      status: "Ativo",
      cor: "purple"
    },
    {
      id: 4,
      nome: "Meme Detector",
      descricao: "Identifica tendências de meme coins antes que se tornem virais.",
      categoria: "Tendências",
      eficiencia: "78%",
      status: "Beta",
      cor: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">AI Agents</h1>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://yuotube.ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
              >
                YuoTube.ai <ExternalLink size={14} />
              </a>
              <a 
                href="https://standardbitcoin.io" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 flex items-center gap-2 text-sm"
              >
                Standard Bitcoin <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Bot size={64} className="text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Agentes de IA para Crypto
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubra como a inteligência artificial está revolucionando o trading, 
            análise e gestão de investimentos em criptomoedas.
          </p>
        </div>
      </section>

      {/* AI Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-4 bg-gradient-to-r ${
                agent.cor === 'blue' ? 'from-blue-400 to-blue-600' :
                agent.cor === 'green' ? 'from-green-400 to-green-600' :
                agent.cor === 'purple' ? 'from-purple-400 to-purple-600' :
                'from-orange-400 to-orange-600'
              }`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{agent.nome}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    agent.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agent.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{agent.descricao}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">Categoria:</span>
                  <span className="text-sm font-semibold text-gray-900">{agent.categoria}</span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-gray-500">Eficiência:</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          agent.cor === 'blue' ? 'bg-blue-600' :
                          agent.cor === 'green' ? 'bg-green-600' :
                          agent.cor === 'purple' ? 'bg-purple-600' :
                          'bg-orange-600'
                        }`}
                        style={{ width: agent.eficiencia }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{agent.eficiencia}</span>
                  </div>
                </div>
                
                <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  agent.cor === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                  agent.cor === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' :
                  agent.cor === 'purple' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                  'bg-orange-600 hover:bg-orange-700 text-white'
                }`}>
                  Saiba mais
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que usar AI Agents?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="text-yellow-500" size={48} />
              </div>
              <h4 className="text-xl font-bold mb-2">Velocidade</h4>
              <p className="text-gray-600">
                Processamento em tempo real de dados de mercado e execução instantânea de operações.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="text-green-500" size={48} />
              </div>
              <h4 className="text-xl font-bold mb-2">Precisão</h4>
              <p className="text-gray-600">
                Análises baseadas em algoritmos avançados e machine learning para maior assertividade.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="text-blue-500" size={48} />
              </div>
              <h4 className="text-xl font-bold mb-2">Segurança</h4>
              <p className="text-gray-600">
                Monitoramento 24/7 e sistemas de proteção para minimizar riscos de investimento.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
          <p className="mb-6">
            Explore o potencial dos AI Agents e revolucione sua estratégia de investimento em crypto.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://yuotube.ai" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-medium flex items-center gap-2"
            >
              Explore YuoTube.ai <ExternalLink size={16} />
            </a>
            <a 
              href="https://standardbitcoin.io" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 font-medium flex items-center gap-2"
            >
              Standard Bitcoin <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h5 className="font-bold mb-4">Bitcoin Brasil - AI Agents</h5>
            <p className="text-gray-400 text-sm mb-4">
              Inteligência artificial aplicada ao mercado de criptomoedas.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://yuotube.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                YuoTube.ai
              </a>
              <a href="https://standardbitcoin.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Standard Bitcoin
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}