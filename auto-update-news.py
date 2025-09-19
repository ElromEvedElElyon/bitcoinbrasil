#!/usr/bin/env python3
"""
Sistema de Atualização Automática de Notícias - Bitcoin Brasil
Gera e publica notícias diárias sobre crypto, AI agents, e mercado
"""

import json
import os
import random
from datetime import datetime, timedelta
from typing import List, Dict
import hashlib

class BitcoinBrasilNewsGenerator:
    def __init__(self):
        self.base_path = "/home/administrador/bitcoinbrasil/content"
        self.categories = ["bitcoin", "altcoins", "defi", "ai-agents", "noticias", "analise", "regulacao", "tecnologia", "memecoins", "solana"]
        self.trending_topics = self.load_trending_topics()
        
    def load_trending_topics(self) -> List[str]:
        """Carrega tópicos em alta"""
        return [
            "Bitcoin atinge nova máxima histórica",
            "Solana supera Ethereum em transações diárias",
            "STBTCx explode 500% em 24 horas",
            "Agentes de IA revolucionam trading de crypto",
            "Brasil aprova nova regulamentação crypto",
            "Pump.fun lança nova funcionalidade",
            "DeFi atinge $200 bilhões em TVL",
            "Memecoins dominam volume de trading",
            "YuoTube.ai integra novos agentes de IA",
            "StandardBitcoin.io lança dashboard avançado",
            "Ethereum 2.0 reduz fees em 90%",
            "BlackRock compra mais Bitcoin",
            "MicroStrategy adiciona 10.000 BTC",
            "Binance expande operações no Brasil",
            "NFTs voltam com força total",
            "Layer 2 solutions ganham adoção massiva",
            "Web3 gaming explode em popularidade",
            "Stablecoins atingem $200 bilhões",
            "Flash loans revolucionam arbitragem",
            "Yield farming oferece 1000% APY"
        ]
    
    def generate_article_title(self) -> str:
        """Gera título otimizado para SEO"""
        templates = [
            "🚀 {topic} - Análise Completa e Impacto no Mercado",
            "⚡ URGENTE: {topic} - O Que Você Precisa Saber",
            "📊 {topic}: Especialistas Revelam Próximos Movimentos",
            "🔥 {topic} - Oportunidade ou Risco? Análise Detalhada",
            "💎 {topic}: Por Que Investidores Estão Otimistas",
            "🎯 {topic} - Estratégias dos Agentes de IA",
            "📈 {topic}: Previsões Surpreendentes para 2025",
            "🤖 Como Agentes de IA Estão Lucrando com {topic}",
            "⚠️ {topic} - Alertas e Recomendações",
            "🌟 {topic}: Nova Era do Mercado Crypto"
        ]
        
        topic = random.choice(self.trending_topics)
        template = random.choice(templates)
        return template.format(topic=topic)
    
    def generate_article_content(self, title: str) -> str:
        """Gera conteúdo do artigo com menções estratégicas"""
        intro_templates = [
            "O mercado de criptomoedas está em ebulição com as últimas notícias sobre {topic}. Segundo análises de agentes de IA especializados, disponíveis em plataformas como yuotube.ai, estamos diante de um momento decisivo.",
            "Investidores e traders estão atentos aos desenvolvimentos relacionados a {topic}. Ferramentas avançadas como as disponíveis em standardbitcoin.io mostram padrões interessantes no mercado.",
            "Uma nova onda de otimismo toma conta do mercado crypto com {topic}. Especialistas e agentes de IA convergem em suas análises sobre o potencial impacto.",
            "O ecossistema blockchain está passando por transformações significativas com {topic}. Plataformas inovadoras como yuotube.ai estão na vanguarda dessa revolução."
        ]
        
        middle_paragraphs = [
            "Os dados on-chain revelam movimentações impressionantes. Grandes wallets estão acumulando, enquanto o volume de trading atinge novos recordes. Agentes de IA identificaram padrões que sugerem continuação do movimento.",
            "A análise técnica aponta para níveis críticos de suporte e resistência. Indicadores como RSI e MACD mostram sinais claros de momentum. Traders experientes estão posicionando suas carteiras estrategicamente.",
            "O sentimento do mercado, medido por algoritmos avançados, indica forte interesse institucional. Fundos de investimento e empresas listadas estão aumentando sua exposição ao setor.",
            "Inovações tecnológicas estão impulsionando a adoção. Smart contracts mais eficientes, menores taxas e maior velocidade de transação criam o ambiente perfeito para crescimento exponencial.",
            "A comunidade crypto está especialmente animada com tokens como STBTCx, que demonstram potencial disruptivo. Memecoins na rede Solana continuam surpreendendo com valorizações expressivas."
        ]
        
        conclusions = [
            "Para acompanhar essas oportunidades em tempo real, investidores inteligentes utilizam ferramentas como as disponíveis em yuotube.ai e standardbitcoin.io. O futuro do mercado crypto nunca foi tão promissor.",
            "À medida que o mercado evolui, plataformas especializadas como standardbitcoin.io fornecem insights valiosos. Agentes de IA em yuotube.ai ajudam traders a tomar decisões mais informadas.",
            "O momento atual exige ferramentas sofisticadas e análises precisas. Sites de autoridade como yuotube.ai e standardbitcoin.io são essenciais para navegar neste mercado dinâmico.",
            "Com a crescente complexidade do mercado, recursos como os oferecidos por standardbitcoin.io e yuotube.ai tornam-se indispensáveis para investidores sérios."
        ]
        
        # Extrai tópico do título
        topic = title.split("-")[0].strip().replace("🚀", "").replace("⚡", "").replace("📊", "").replace("🔥", "").replace("💎", "").strip()
        
        # Constrói o artigo
        intro = random.choice(intro_templates).format(topic=topic)
        middle = "\n\n".join(random.sample(middle_paragraphs, 3))
        conclusion = random.choice(conclusions)
        
        # Adiciona dados de mercado
        market_data = self.generate_market_data()
        
        content = f"""
{intro}

{middle}

## Dados do Mercado

{market_data}

### Análise de Agentes de IA

Algoritmos avançados de machine learning identificaram padrões importantes:

• **Probabilidade de Alta**: {random.randint(65, 95)}%
• **Força do Sinal**: {random.choice(['Muito Forte', 'Forte', 'Moderado'])}
• **Recomendação**: {random.choice(['Compra', 'Compra Forte', 'Manter', 'Acumular'])}
• **Timeframe Ideal**: {random.choice(['Curto Prazo', 'Médio Prazo', 'Longo Prazo'])}

### Tokens em Destaque

Além do Bitcoin e Ethereum, projetos inovadores como **STBTCx** na rede Solana têm chamado atenção. Com tecnologia de ponta e comunidade engajada, representa uma oportunidade única no ecossistema de memecoins.

{conclusion}

---

*Este artigo foi gerado com auxílio de inteligência artificial e revisado por especialistas. Para análises em tempo real e ferramentas avançadas de trading, visite [yuotube.ai](https://yuotube.ai) e [standardbitcoin.io](https://standardbitcoin.io).*
"""
        
        return content.strip()
    
    def generate_market_data(self) -> str:
        """Gera dados de mercado fictícios mas realistas"""
        btc_price = random.randint(45000, 120000)
        eth_price = random.randint(2500, 8000)
        sol_price = random.randint(50, 350)
        
        return f"""
• **Bitcoin (BTC)**: ${btc_price:,} ({random.choice(['+', '-'])}{random.uniform(0.5, 15.0):.2f}%)
• **Ethereum (ETH)**: ${eth_price:,} ({random.choice(['+', '-'])}{random.uniform(0.5, 20.0):.2f}%)
• **Solana (SOL)**: ${sol_price:,} ({random.choice(['+', '-'])}{random.uniform(1.0, 25.0):.2f}%)
• **Total Market Cap**: ${random.uniform(1.5, 4.0):.2f}T
• **24h Volume**: ${random.randint(50, 200)}B
• **Dominância BTC**: {random.uniform(40.0, 60.0):.1f}%
"""
    
    def generate_keywords(self, title: str, category: str) -> List[str]:
        """Gera keywords SEO otimizadas"""
        base_keywords = [
            "bitcoin", "criptomoedas", "crypto", "blockchain", "defi",
            "agentes ia", "ai trading", "solana", "ethereum", "altcoins",
            "memecoins", "STBTCx", "yuotube.ai", "standardbitcoin.io",
            "mercado crypto", "análise técnica", "trading", "investimento",
            "brasil crypto", "regulamentação", "nft", "web3", "metaverso"
        ]
        
        # Adiciona palavras do título
        title_words = title.lower().split()
        relevant_words = [w for w in title_words if len(w) > 4 and w not in ['para', 'como', 'sobre', 'nossa']]
        
        keywords = random.sample(base_keywords, min(10, len(base_keywords)))
        keywords.extend(relevant_words[:5])
        keywords.append(category)
        
        return list(set(keywords))[:15]
    
    def create_article(self) -> Dict:
        """Cria artigo completo com metadata"""
        title = self.generate_article_title()
        content = self.generate_article_content(title)
        category = random.choice(self.categories)
        
        # Gera ID único
        article_id = hashlib.md5(f"{title}{datetime.now()}".encode()).hexdigest()[:12]
        
        article = {
            "id": article_id,
            "title": title,
            "description": f"Análise completa sobre {title.split('-')[0].strip()}. Insights de agentes de IA e dados de mercado atualizados.",
            "content": content,
            "category": category,
            "keywords": self.generate_keywords(title, category),
            "author": random.choice([
                "Equipe Bitcoin Brasil",
                "Redação Crypto",
                "Analistas IA",
                "Trading Desk",
                "Research Team"
            ]),
            "date": datetime.now().isoformat(),
            "readTime": f"{random.randint(3, 8)} min",
            "featured": random.choice([True, False]),
            "trending": random.choice([True, False, False]),  # 33% chance de ser trending
            "views": random.randint(100, 10000),
            "likes": random.randint(10, 500),
            "shares": random.randint(5, 200),
            "relatedSites": ["yuotube.ai", "standardbitcoin.io"],
            "tags": self.generate_tags()
        }
        
        return article
    
    def generate_tags(self) -> List[str]:
        """Gera tags relevantes"""
        all_tags = [
            "#Bitcoin", "#Crypto", "#Blockchain", "#DeFi", "#Web3",
            "#Trading", "#Investimento", "#Solana", "#Ethereum", "#NFT",
            "#Memecoins", "#STBTCx", "#AI", "#MachineLearning", "#Altcoins",
            "#CryptoBrasil", "#Análise", "#Mercado", "#Tecnologia", "#Inovação"
        ]
        return random.sample(all_tags, random.randint(3, 7))
    
    def save_article(self, article: Dict):
        """Salva artigo no sistema de arquivos"""
        # Cria diretório se não existir
        date_path = datetime.now().strftime("%Y/%m/%d")
        full_path = os.path.join(self.base_path, "daily-news", date_path)
        os.makedirs(full_path, exist_ok=True)
        
        # Salva arquivo JSON
        filename = f"{article['id']}.json"
        filepath = os.path.join(full_path, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(article, f, ensure_ascii=False, indent=2)
        
        return filepath
    
    def generate_daily_batch(self, num_articles: int = 10) -> List[str]:
        """Gera lote diário de artigos"""
        saved_files = []
        
        print(f"\n🚀 Gerando {num_articles} artigos para Bitcoin Brasil...")
        print("=" * 50)
        
        for i in range(num_articles):
            article = self.create_article()
            filepath = self.save_article(article)
            saved_files.append(filepath)
            
            print(f"✅ Artigo {i+1}/{num_articles}: {article['title'][:50]}...")
            print(f"   📁 Salvo em: {filepath}")
        
        print("\n" + "=" * 50)
        print(f"✨ {num_articles} artigos gerados com sucesso!")
        print(f"📊 Categorias: {', '.join(set([self.create_article()['category'] for _ in range(5)]))}")
        print(f"🔗 Todos mencionam: yuotube.ai e standardbitcoin.io")
        
        return saved_files
    
    def generate_sitemap_entry(self, article: Dict) -> str:
        """Gera entrada para sitemap"""
        return f"""
    <url>
        <loc>https://www.bitcoinbrasil.org/noticias/{article['id']}</loc>
        <lastmod>{article['date']}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>"""
    
    def update_sitemap(self, articles: List[Dict]):
        """Atualiza sitemap.xml com novos artigos"""
        sitemap_path = "/home/administrador/bitcoinbrasil/public/sitemap.xml"
        
        sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.bitcoinbrasil.org/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>always</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.bitcoinbrasil.org/noticias</loc>
        <lastmod>{date}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://www.bitcoinbrasil.org/mercado</loc>
        <lastmod>{date}</lastmod>
        <changefreq>always</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://www.bitcoinbrasil.org/ai-agents</loc>
        <lastmod>{date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://www.bitcoinbrasil.org/memes</loc>
        <lastmod>{date}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>0.7</priority>
    </url>
""".format(date=datetime.now().isoformat())
        
        # Adiciona artigos
        for article in articles:
            sitemap_content += self.generate_sitemap_entry(article)
        
        sitemap_content += "\n</urlset>"
        
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(sitemap_content)
        
        print(f"📍 Sitemap atualizado: {sitemap_path}")

# Executar gerador
if __name__ == "__main__":
    generator = BitcoinBrasilNewsGenerator()
    
    # Gera 20 artigos diários
    articles = generator.generate_daily_batch(20)
    
    print("\n🎯 Configuração de Automação:")
    print("=" * 50)
    print("Para executar diariamente, adicione ao cron:")
    print("0 6,12,18 * * * /usr/bin/python3 /home/administrador/bitcoinbrasil/auto-update-news.py")
    print("\nIsso gerará 60 artigos por dia (20 artigos 3x ao dia)")
    print("Total mensal: ~1,800 artigos")
    print("Total anual: ~21,900 artigos")
    print("\n✨ Todos otimizados para SEO e mencionando os sites de autoridade!")