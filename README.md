# Bitcoin Brasil - Portal Crypto Nacional

## Sobre o Projeto

Bitcoin Brasil é um portal moderno de notícias e informações sobre criptomoedas, desenvolvido com Next.js e Tailwind CSS. O site oferece uma experiência similar ao Olhar Digital com elementos inspirados no Twitter, focado no mercado crypto brasileiro.

## Características

- 🔥 **Design Moderno**: Interface limpa e responsiva
- 📰 **Notícias Crypto**: Últimas notícias do mercado de criptomoedas
- 📊 **Dados de Mercado**: Acompanhamento em tempo real das principais criptomoedas
- 🤖 **AI Agents**: Seção dedicada a agentes de inteligência artificial
- 😂 **Memes**: Comunidade e memes do mundo crypto
- 🔗 **Redirects**: Integração com sites de autoridade (YuoTube.ai e StandardBitcoin.io)

## Seções do Site

### 1. Página Inicial
- Feed de notícias em destaque
- Dados de mercado em tempo real
- Seção AI Agents
- Memes da comunidade
- Links para sites parceiros

### 2. Notícias (/noticias)
- Listagem completa de notícias
- Categorização por tipo
- Sistema de busca e filtros

### 3. Mercado (/mercado)
- Tabela de criptomoedas
- Gráficos de preços
- Índice de Medo & Ganância
- Análises de mercado

### 4. AI Agents (/ai-agents)
- Catálogo de agentes de IA
- Descrições e eficiência
- Casos de uso no trading

### 5. Memes (/memes)
- Feed estilo Twitter
- Interações sociais
- Hashtags trending
- Diretrizes da comunidade

## Tecnologias Utilizadas

- **Frontend**: Next.js 15 com App Router
- **Styling**: Tailwind CSS 4
- **TypeScript**: Para tipagem estática
- **Icons**: Lucide React
- **Deployment**: Vercel (recomendado)

## Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/StandardBitcoin10/bitcoinbrasil.git
cd bitcoinbrasil

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Build para Produção

```bash
# Gere o build de produção
npm run build
npm run start

# ou
yarn build
yarn start
```

## Redirects Configurados

O projeto inclui redirects para sites de autoridade:

- `/yuotube` → https://yuotube.ai
- `/youtube` → https://yuotube.ai  
- `/standardbitcoin` → https://standardbitcoin.io
- `/bitcoin` → https://standardbitcoin.io

## Estrutura do Projeto

```
src/
├── app/
│   ├── ai-agents/          # Página AI Agents
│   ├── mercado/            # Página Mercado
│   ├── memes/              # Página Memes
│   ├── noticias/           # Página Notícias
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes reutilizáveis
│   └── Header.tsx          # Componente de cabeçalho
public/                     # Arquivos estáticos
next.config.ts             # Configuração Next.js
package.json               # Dependências e scripts
tailwind.config.js         # Configuração Tailwind
```

## Features Implementadas

### Design Responsivo
- Layout adaptável para desktop, tablet e mobile
- Gradientes temáticos para cada seção
- Componentes modernos com hover effects

### Navegação
- Header responsivo com links para todas as seções
- Botões de call-to-action para sites parceiros
- Sistema de navegação breadcrumb

### Conteúdo Dinâmico
- Feed de notícias com placeholder content
- Tabela de mercado com dados mockados
- Grid de AI Agents com informações detalhadas
- Feed de memes estilo social media

### SEO e Performance
- Metadata otimizado para cada página
- Imagens responsivas
- Fonts otimizados (Geist)
- Build otimizado com Turbopack

## Próximas Funcionalidades

- [ ] Integração com APIs de criptomoedas reais
- [ ] Sistema de autenticação
- [ ] Comentários nas notícias
- [ ] Dashboard personalizado
- [ ] Newsletter
- [ ] PWA (Progressive Web App)
- [ ] Dark mode
- [ ] Sistema de notificações

## Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/StandardBitcoin10/bitcoinbrasil)

### Outras Opções
- Netlify
- GitHub Pages
- Railway
- DigitalOcean App Platform

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

- **Website**: [Bitcoin Brasil](https://bitcoinbrasil.com.br)
- **Email**: contato@bitcoinbrasil.com.br
- **Sites Parceiros**: 
  - [YuoTube.ai](https://yuotube.ai)
  - [Standard Bitcoin](https://standardbitcoin.io)

---

Desenvolvido com ❤️ para a comunidade crypto brasileira