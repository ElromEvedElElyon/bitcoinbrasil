import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, BarChart3, Activity } from "lucide-react";

export default function Mercado() {
  const cryptos = [
    {
      nome: "Bitcoin",
      simbolo: "BTC",
      preco: "R$ 286.420,00",
      mudanca24h: "+5.24%",
      mudanca7d: "+12.8%",
      marketCap: "R$ 5.6T",
      volume24h: "R$ 156B",
      alta: true,
      grafico: [45, 52, 48, 61, 58, 67, 72, 69, 78, 82]
    },
    {
      nome: "Ethereum",
      simbolo: "ETH",
      preco: "R$ 18.650,00",
      mudanca24h: "+3.14%",
      mudanca7d: "+8.2%",
      marketCap: "R$ 2.2T",
      volume24h: "R$ 89B",
      alta: true,
      grafico: [32, 38, 35, 42, 45, 48, 52, 49, 55, 58]
    },
    {
      nome: "Cardano",
      simbolo: "ADA",
      preco: "R$ 2,45",
      mudanca24h: "-1.23%",
      mudanca7d: "+2.1%",
      marketCap: "R$ 85B",
      volume24h: "R$ 2.1B",
      alta: false,
      grafico: [85, 88, 82, 79, 84, 81, 78, 83, 80, 79]
    },
    {
      nome: "Solana",
      simbolo: "SOL",
      preco: "R$ 945,00",
      mudanca24h: "+7.89%",
      mudanca7d: "+15.4%",
      marketCap: "R$ 425B",
      volume24h: "R$ 12B",
      alta: true,
      grafico: [125, 132, 128, 145, 152, 158, 165, 162, 175, 182]
    },
    {
      nome: "Chainlink",
      simbolo: "LINK",
      preco: "R$ 78,90",
      mudanca24h: "+2.15%",
      mudanca7d: "+6.7%",
      marketCap: "R$ 45B",
      volume24h: "R$ 1.8B",
      alta: true,
      grafico: [65, 68, 66, 72, 75, 78, 82, 79, 85, 88]
    },
    {
      nome: "Polygon",
      simbolo: "MATIC",
      preco: "R$ 4,67",
      mudanca24h: "-0.87%",
      mudanca7d: "+1.2%",
      marketCap: "R$ 43B",
      volume24h: "R$ 890M",
      alta: false,
      grafico: [92, 95, 89, 86, 91, 88, 85, 89, 87, 86]
    }
  ];

  const noticias = [
    "Bitcoin supera resistência de R$ 280.000",
    "Ethereum prepara nova atualização para Q2",
    "Bancos brasileiros aumentam exposição crypto",
    "Regulamentação DeFi avança no Congresso"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </Link>
              <h1 className="text-2xl font-bold text-green-600">Mercado Crypto</h1>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://yuotube.ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
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

      {/* Market Stats */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <BarChart3 className="text-green-500 mr-3" size={24} />
                <div>
                  <div className="text-2xl font-bold text-gray-900">R$ 8.2T</div>
                  <div className="text-sm text-gray-600">Market Cap Total</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Activity className="text-blue-500 mr-3" size={24} />
                <div>
                  <div className="text-2xl font-bold text-gray-900">R$ 247B</div>
                  <div className="text-sm text-gray-600">Volume 24h</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <TrendingUp className="text-green-500 mr-3" size={24} />
                <div>
                  <div className="text-2xl font-bold text-green-600">+4.8%</div>
                  <div className="text-sm text-gray-600">Mercado 24h</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full mr-3"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">54.2%</div>
                  <div className="text-sm text-gray-600">Dominância BTC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Top Criptomoedas</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Moeda
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    7d
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Cap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gráfico 7d
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cryptos.map((crypto, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          {crypto.simbolo.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{crypto.nome}</div>
                          <div className="text-sm text-gray-500">{crypto.simbolo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{crypto.preco}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${crypto.alta ? 'text-green-600' : 'text-red-600'}`}>
                        {crypto.alta ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                        {crypto.mudanca24h}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-green-600 font-medium">{crypto.mudanca7d}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{crypto.marketCap}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{crypto.volume24h}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-20 h-8">
                        <svg viewBox="0 0 100 40" className="w-full h-full">
                          <polyline
                            fill="none"
                            stroke={crypto.alta ? "#10b981" : "#ef4444"}
                            strokeWidth="2"
                            points={crypto.grafico.map((point, i) => `${i * 10},${40 - (point / 200) * 40}`).join(' ')}
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* News and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Market News */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Notícias do Mercado</h3>
            <div className="space-y-4">
              {noticias.map((noticia, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div className="text-gray-800">{noticia}</div>
                </div>
              ))}
            </div>
            <Link href="/noticias" className="block mt-4 text-green-600 hover:text-green-700 font-medium">
              Ver todas as notícias →
            </Link>
          </div>

          {/* Fear & Greed Index */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Índice Medo & Ganância</h3>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${72 * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">72</div>
                    <div className="text-sm text-gray-500">Ganância</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                O mercado está em estado de ganância, indicando otimismo dos investidores.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Acompanhe o mercado em tempo real</h3>
          <p className="mb-6">
            Mantenha-se atualizado com as melhores ferramentas e análises do mercado crypto.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://yuotube.ai" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-medium flex items-center gap-2"
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
            <h5 className="font-bold mb-4">Bitcoin Brasil - Mercado</h5>
            <p className="text-gray-400 text-sm mb-4">
              Dados de mercado em tempo real para suas decisões de investimento.
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