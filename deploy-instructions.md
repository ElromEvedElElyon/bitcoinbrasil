# 🚀 Instruções de Deploy - Bitcoin Brasil

## 📋 Informações Necessárias do GoDaddy

Para configurar o domínio **bitcoinbrasil.org** no GoDaddy, você precisará fornecer:

1. **Login do GoDaddy**
   - Email/Username
   - Senha
   - Código 2FA (se ativado)

2. **Acesso ao Painel de DNS do Domínio**

## 🌐 Opções de Hospedagem (Escolha Uma)

### Opção 1: Vercel (RECOMENDADO - Grátis)
**Configuração DNS no GoDaddy:**
```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

### Opção 2: Netlify (Grátis)
**Configuração DNS no GoDaddy:**
```
Tipo: A
Nome: @
Valor: 75.2.60.5

Tipo: CNAME
Nome: www
Valor: [seu-site].netlify.app
```

### Opção 3: GitHub Pages (Grátis)
**Configuração DNS no GoDaddy:**
```
Tipo: A
Nome: @
Valor: 185.199.108.153

Tipo: A
Nome: @
Valor: 185.199.109.153

Tipo: A
Nome: @
Valor: 185.199.110.153

Tipo: A
Nome: @
Valor: 185.199.111.153

Tipo: CNAME
Nome: www
Valor: standardbitcoin10.github.io
```

### Opção 4: Cloudflare Pages (Grátis + CDN)
**Configuração DNS no GoDaddy:**
```
Nameservers (trocar todos):
- assad.ns.cloudflare.com
- reza.ns.cloudflare.com
```

## 🔧 Processo de Deploy Completo

### 1. Deploy com Vercel (MAIS FÁCIL E RÁPIDO)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Na pasta do projeto
cd /home/administrador/bitcoinbrasil

# Fazer deploy
vercel

# Seguir os prompts:
# - Login/Signup
# - Confirmar projeto
# - Escolher nome: bitcoin-brasil
```

### 2. Deploy com Netlify

```bash
# Build do projeto
cd /home/administrador/bitcoinbrasil
npm run build

# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.next

# Ou arrastar a pasta .next para netlify.com
```

### 3. Deploy com GitHub Pages

```bash
# Adicionar ao package.json
"scripts": {
  "deploy": "next build && next export && touch out/.nojekyll && gh-pages -d out"
}

# Instalar gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## 📝 Configuração DNS Passo a Passo no GoDaddy

### Para Vercel (Recomendado):

1. **Login no GoDaddy**
   - Acesse: https://www.godaddy.com
   - Faça login com suas credenciais

2. **Acessar Gerenciador de DNS**
   - Vá para "Meus Produtos"
   - Encontre "bitcoinbrasil.org"
   - Clique em "DNS" ou "Gerenciar DNS"

3. **Remover Registros Existentes**
   - Delete todos os registros A existentes
   - Delete CNAME do www se existir

4. **Adicionar Novos Registros**
   
   **Registro A (principal):**
   - Tipo: A
   - Nome: @ (ou deixe vazio)
   - Valor: 76.76.21.21
   - TTL: 1 hora

   **Registro CNAME (www):**
   - Tipo: CNAME
   - Nome: www
   - Valor: cname.vercel-dns.com
   - TTL: 1 hora

5. **Salvar Alterações**
   - Clique em "Salvar"
   - Aguarde propagação (5 min a 48 horas)

## 🚀 Comando Rápido de Deploy

```bash
# Script completo de deploy
cat > /home/administrador/bitcoinbrasil/deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Iniciando deploy do Bitcoin Brasil..."

# Build do projeto
echo "📦 Fazendo build..."
npm run build

# Deploy para Vercel
echo "☁️ Enviando para Vercel..."
vercel --prod

echo "✅ Deploy completo!"
echo "🌐 Site disponível em: https://bitcoinbrasil.org"
echo ""
echo "📋 Configure o DNS no GoDaddy:"
echo "   A @ -> 76.76.21.21"
echo "   CNAME www -> cname.vercel-dns.com"
EOF

chmod +x /home/administrador/bitcoinbrasil/deploy.sh
```

## 🔐 Configurações de Segurança

### SSL/HTTPS
- **Vercel**: SSL automático e grátis
- **Netlify**: SSL automático e grátis
- **GitHub Pages**: SSL automático para domínios custom
- **Cloudflare**: SSL grátis + proteção DDoS

### Headers de Segurança
Já configurados no `next.config.ts`:
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy

## 📊 Monitoramento Pós-Deploy

### Google Search Console
1. Acesse: https://search.google.com/search-console
2. Adicione propriedade: bitcoinbrasil.org
3. Verifique via DNS (TXT record)
4. Envie sitemap: https://bitcoinbrasil.org/sitemap.xml

### Google Analytics
```html
<!-- Adicionar no layout.tsx -->
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## ⚡ Otimizações de Performance

### Cloudflare (Opcional mas Recomendado)
1. Criar conta em cloudflare.com
2. Adicionar site: bitcoinbrasil.org
3. Trocar nameservers no GoDaddy
4. Ativar:
   - Auto Minify
   - Brotli
   - HTTP/3
   - Always Online
   - Rocket Loader

### Configurações de Cache
```javascript
// next.config.ts
module.exports = {
  headers: async () => [{
    source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp)',
    headers: [{
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    }]
  }]
}
```

## 🎯 Checklist Final

- [ ] Build do projeto sem erros
- [ ] Deploy na plataforma escolhida
- [ ] DNS configurado no GoDaddy
- [ ] SSL/HTTPS funcionando
- [ ] Sitemap enviado ao Google
- [ ] Analytics configurado
- [ ] Teste de velocidade (GTmetrix/PageSpeed)
- [ ] Teste mobile responsivo
- [ ] Verificar redirecionamentos
- [ ] Monitorar primeiras 24h

## 💬 Suporte

### Vercel
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### Netlify
- Docs: https://docs.netlify.com
- Support: https://www.netlify.com/support

### GoDaddy DNS
- Help: https://www.godaddy.com/help/dns-680
- Suporte: 0800-891-5876 (Brasil)

---

**Tempo estimado de propagação DNS:** 5 minutos a 48 horas (geralmente 1-4 horas)

**Recomendação:** Use Vercel para deploy mais rápido e fácil!