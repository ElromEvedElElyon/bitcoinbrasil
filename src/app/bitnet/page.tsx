import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BitNet 1.58-bit: IA Ternária para Bitcoin | Bitcoin Brasil',
  description: 'Pesquisa sobre a tecnologia BitNet 1.58-bit LLM da Microsoft. Pesos ternários {-1, 0, +1} alcançam 2.37x-6.17x mais velocidade com 55-82% menos energia. O futuro da IA eficiente.',
  keywords: 'BitNet, LLM 1-bit, pesos ternários, IA eficiente, Bitcoin energia, Apple M5 Pro, NPU, Standard Bitcoin, STBTCx',
  openGraph: {
    title: 'BitNet 1.58-bit: IA Ternária para Bitcoin',
    description: 'Como a IA de 1-bit revoluciona a eficiência energética do Bitcoin',
    type: 'article',
    url: 'https://bitcoinbrasil.org/bitnet',
    siteName: 'Bitcoin Brasil',
  },
};

export default function BitNetPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <p className="text-green-400 font-mono text-sm mb-4">PESQUISA & ANÁLISE</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="text-green-400">BitNet 1.58-bit</span>
            <br />
            <span className="text-white">IA Ternária para Bitcoin</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Como a tecnologia de LLM de 1-bit da Microsoft cria uma nova era de
            inteligência artificial eficiente, alinhada com a sustentabilidade do Bitcoin.
          </p>
        </div>

        {/* O que é BitNet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">O que é BitNet?</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            BitNet é uma arquitetura revolucionária de rede neural desenvolvida pela Microsoft Research
            que substitui pesos tradicionais de ponto flutuante (FP16/FP32) por{' '}
            <strong className="text-green-400">valores ternários: {'{-1, 0, +1}'}</strong>. Cada peso
            ocupa apenas 1.58 bits de informação (log₂(3) = 1.585), comparado aos 16 ou 32 bits
            usados em LLMs convencionais.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A inovação principal: multiplicações de matrizes — que dominam o cálculo de LLMs — são
            substituídas por simples <strong className="text-white">adições e subtrações</strong>.
            Nenhuma unidade de multiplicação de ponto flutuante é necessária.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-400">1.58</div>
              <div className="text-sm text-gray-400">bits por peso</div>
              <div className="text-xs text-gray-500">vs 16 bits (FP16)</div>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">6.17x</div>
              <div className="text-sm text-gray-400">mais rápido</div>
              <div className="text-xs text-gray-500">em modelos de 70B</div>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">82%</div>
              <div className="text-sm text-gray-400">menos energia</div>
              <div className="text-xs text-gray-500">vs IA convencional</div>
            </div>
          </div>
        </section>

        {/* Pesos Ternários */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Sistema de Pesos Ternários</h2>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
            <pre className="font-mono text-sm text-green-400 overflow-x-auto">
{`// Quantização de pesos para {-1, 0, +1}
def weight_quant(w):
    scale = w.abs().mean()
    u = (w / (scale + 1e-5)).round().clamp(-1, 1)
    return u  # ternário: cada peso é -1, 0 ou +1

// Computação BitNet (sem multiplicação!)
if (peso == +1): acumulador += ativação   // soma
if (peso == -1): acumulador -= ativação   // subtração
if (peso ==  0): // pula (esparsidade grátis!)

// Custo de energia por operação:
// FP32 Multiply: 3.7 pJ (100%)
// INT8 Add/Sub:  0.03 pJ (0.8%) ← BitNet usa apenas isso!`}
            </pre>
          </div>
        </section>

        {/* Bitcoin + BitNet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Bitcoin + BitNet: Convergência Energética</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A mineração de Bitcoin consome ~150 TWh/ano. A IA é projetada para consumir 500 TWh/ano
            até 2030. BitNet reduz o consumo de IA em 55-82%, economizando mais energia do que toda
            a rede Bitcoin consome.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex gap-4 items-start p-4 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-2xl shrink-0">&#8383;</div>
              <div>
                <h3 className="font-bold text-orange-400 mb-1">Hardware Compartilhado</h3>
                <p className="text-sm text-gray-300">
                  ASICs de Bitcoin são otimizados para operações inteiras (SHA-256). BitNet usa apenas
                  adição/subtração de inteiros. Hardware de mineração pode ser reaproveitado para IA.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-2xl shrink-0">&#9889;</div>
              <div>
                <h3 className="font-bold text-green-400 mb-1">IA Descentralizada</h3>
                <p className="text-sm text-gray-300">
                  Com apenas 1.4 GB para um modelo de 7B, BitNet permite rodar IA em qualquer nó
                  Bitcoin — inteligência verdadeiramente descentralizada.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-2xl shrink-0">&#127760;</div>
              <div>
                <h3 className="font-bold text-cyan-400 mb-1">Sintex.AI: Primeiro Motor de Busca BitNet</h3>
                <p className="text-sm text-gray-300">
                  O Sintex.AI está construindo o primeiro motor de busca do mundo alimentado por LLM
                  de 1.58 bits. Consultas processadas por rede neural ternária com fração da energia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Apple M5 Pro */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Apple M5 Pro: Hardware Ideal</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h3 className="text-sm font-bold text-gray-400 mb-3">Especificações NPU</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Performance NPU</dt>
                  <dd className="text-cyan-400 font-mono font-bold">38 TOPS</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Neural Engine Cores</dt>
                  <dd className="text-white font-mono">16 cores</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Memória Unificada</dt>
                  <dd className="text-white font-mono">Até 48 GB</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">API Metal</dt>
                  <dd className="text-white font-mono">Metal 4</dd>
                </div>
              </dl>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h3 className="text-sm font-bold text-gray-400 mb-3">BitNet no M5 Pro</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Modelo 7B</dt>
                  <dd className="text-green-400 font-mono font-bold">~120 tok/s</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Memória 7B</dt>
                  <dd className="text-green-400 font-mono">1.4 GB</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Modelo 70B</dt>
                  <dd className="text-green-400 font-mono font-bold">~25 tok/s</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Consumo 7B</dt>
                  <dd className="text-green-400 font-mono">~5W</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="border-t border-gray-800 pt-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            Pesquisa Relacionada
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://sintex.ai/bitnet-research.html"
              className="block p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition"
            >
              <div className="text-cyan-400 font-bold mb-1">Sintex.AI Research</div>
              <div className="text-sm text-gray-400">Análise técnica completa do BitNet</div>
            </a>
            <a
              href="https://sintex.ai/binary-computing.html"
              className="block p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-purple-500/50 transition"
            >
              <div className="text-purple-400 font-bold mb-1">Binary Computing</div>
              <div className="text-sm text-gray-400">Assembly ARM NEON & visualização</div>
            </a>
            <a
              href="https://www.standardbitcoin.io/bitnet-ai-bitcoin.html"
              className="block p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-orange-500/50 transition"
            >
              <div className="text-orange-400 font-bold mb-1">Standard Bitcoin</div>
              <div className="text-sm text-gray-400">1-bit AI + Bitcoin (English)</div>
            </a>
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        <p>&copy; 2026 Bitcoin Brasil &mdash; BitNet Research em Portugues</p>
        <p className="mt-1">
          <a href="/" className="hover:text-white">Home</a> &middot;
          <a href="https://sintex.ai" className="hover:text-white">Sintex.AI</a> &middot;
          <a href="https://www.standardbitcoin.io" className="hover:text-white">Standard Bitcoin</a>
        </p>
      </footer>
    </main>
  );
}
