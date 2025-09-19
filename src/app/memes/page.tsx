import Link from "next/link";
import { ArrowLeft, Heart, MessageCircle, Share, ExternalLink, Smile } from "lucide-react";

export default function Memes() {
  const memes = [
    {
      id: 1,
      autor: "@cryptobrasil",
      tempo: "Há 2 horas",
      conteudo: "HODL até a lua! 🚀🌙 Quando Bitcoin era R$ 10.000 todo mundo dizia que era caro... Agora olha aí! #Bitcoin #HODL",
      likes: 234,
      comentarios: 45,
      shares: 12,
      trending: true
    },
    {
      id: 2,
      autor: "@bitcoinmaxi",
      tempo: "Há 4 horas",
      conteudo: "Bitcoin é o futuro do dinheiro 💰\n\nFiat: 📉\nBitcoin: 📈\n\nEscolha sabiamente! #Bitcoin #SoundMoney",
      likes: 189,
      comentarios: 32,
      shares: 8,
      trending: false
    },
    {
      id: 3,
      autor: "@dogenation",
      tempo: "Há 6 horas",
      conteudo: "Dogecoin to the moon! 🐕🚀\n\nMuch wow, very crypto, such gains!\n\n#Dogecoin #ToTheMoon #MuchWow",
      likes: 156,
      comentarios: 78,
      shares: 24,
      trending: true
    },
    {
      id: 4,
      autor: "@ethbrasil",
      tempo: "Há 8 horas",
      conteudo: "Ethereum 2.0 chegando e os bancos tradicionais nervosos 😅\n\nDeFi is the future! 🔥\n\n#Ethereum #DeFi #Blockchain",
      likes: 145,
      comentarios: 29,
      shares: 15,
      trending: false
    },
    {
      id: 5,
      autor: "@shibaarmy",
      tempo: "Há 12 horas",
      conteudo: "SHIB holders right now: 💎🙌\n\nWhen Lambo? Soon moon! 🌙\n\n#SHIB #DiamondHands #ShibArmy",
      likes: 203,
      comentarios: 56,
      shares: 19,
      trending: true
    },
    {
      id: 6,
      autor: "@cryptomemes",
      tempo: "Há 1 dia",
      conteudo: "Explicando crypto para a família no almoço de domingo:\n\n👴: É dinheiro falso?\n🧔: É o futuro!\n👵: Mas e se a internet acabar?\n\n😅 #CryptoProblems",
      likes: 312,
      comentarios: 89,
      shares: 42,
      trending: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </Link>
              <h1 className="text-2xl font-bold text-purple-600">Crypto Memes</h1>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://yuotube.ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm"
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
            <Smile size={64} className="text-purple-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Memes da Comunidade Crypto
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Os melhores memes, piadas e momentos engraçados do mundo das criptomoedas. 
            Ria conosco e compartilhe sua paixão pelo Bitcoin!
          </p>
        </div>
      </section>

      {/* Memes Feed */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-6">
          {memes.map((meme) => (
            <div key={meme.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {/* Meme Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {meme.autor.charAt(1).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{meme.autor}</div>
                      <div className="text-sm text-gray-500">{meme.tempo}</div>
                    </div>
                  </div>
                  {meme.trending && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      🔥 Trending
                    </span>
                  )}
                </div>
              </div>

              {/* Meme Content */}
              <div className="p-4">
                <p className="text-gray-800 whitespace-pre-line text-lg leading-relaxed">
                  {meme.conteudo}
                </p>
              </div>

              {/* Meme Interactions */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                    <span className="text-sm font-medium">{meme.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">{meme.comentarios}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Share size={18} />
                    <span className="text-sm font-medium">{meme.shares}</span>
                  </button>
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Responder
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-medium">
            Carregar mais memes
          </button>
        </div>

        {/* Trending Hashtags */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Hashtags em Alta</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "#Bitcoin", "#HODL", "#ToTheMoon", "#Dogecoin", "#Ethereum", 
              "#DeFi", "#CryptoMemes", "#DiamondHands", "#Blockchain", "#SHIB"
            ].map((hashtag, index) => (
              <span 
                key={index} 
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-200 cursor-pointer"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Diretrizes da Comunidade</h3>
          <ul className="space-y-2 text-sm">
            <li>• Mantenha o respeito e a civilidade em todos os posts</li>
            <li>• Apenas conteúdo relacionado a criptomoedas e blockchain</li>
            <li>• Não spam ou conteúdo promocional excessivo</li>
            <li>• Diversão é bem-vinda, mas sem ofensas pessoais</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h5 className="font-bold mb-4">Bitcoin Brasil - Crypto Memes</h5>
            <p className="text-gray-400 text-sm mb-4">
              Onde a comunidade crypto se diverte e compartilha momentos únicos.
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