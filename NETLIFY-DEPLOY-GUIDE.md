# 🚀 Guia Completo de Deploy no Netlify - Bitcoin Brasil

## ✅ Passo 1: Push para GitHub

Execute estes comandos para enviar o código para o GitHub:

```bash
# Se pedir username e password:
# Username: seu-usuario-github
# Password: use um Personal Access Token (não a senha)

git push -u origin master
```

### Como criar Personal Access Token no GitHub:
1. Vá em GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Selecione: repo (todas as opções)
5. Copie o token gerado

## 📦 Passo 2: Deploy no Netlify

### Opção A: Deploy Automático (Recomendado)

1. **Acesse Netlify**
   - Vá para: https://app.netlify.com
   - Faça login ou crie conta gratuita

2. **Conecte o GitHub**
   - Clique em "Add new site"
   - Escolha "Import an existing project"
   - Selecione "Deploy with GitHub"
   - Autorize o Netlify

3. **Selecione o Repositório**
   - Procure por: `StandardBitcoin10/bitcoinbrasil`
   - Clique para selecionar

4. **Configurações de Build**
   ```
   Branch to deploy: master
   Build command: npm run build
   Publish directory: .next
   ```
   
5. **Clique em "Deploy site"**

### Opção B: Deploy Manual (Alternativa Rápida)

1. **Build Local**
   ```bash
   cd /home/administrador/bitcoinbrasil
   npm run build
   ```

2. **Arraste a pasta `.next` para netlify.com/drop**

## 🌐 Passo 3: Configurar Domínio Customizado

### No Netlify:

1. **Vá para Site Settings → Domain management**

2. **Clique em "Add custom domain"**

3. **Digite:** `bitcoinbrasil.org`

4. **Netlify vai mostrar os DNS necessários:**
   ```
   Tipo: A
   Nome: @
   Valor: 75.2.60.5
   
   Tipo: CNAME
   Nome: www
   Valor: [seu-site].netlify.app
   ```

### No GoDaddy:

1. **Login em godaddy.com**

2. **Vá em Meus Domínios → bitcoinbrasil.org → Gerenciar DNS**

3. **DELETE estes registros:**
   - A @ Parked
   - CNAME www @
   - CNAME _domainconnect

4. **ADICIONE estes novos:**
   ```
   Tipo: A
   Nome: @
   Dados: 75.2.60.5
   TTL: 600 segundos
   
   Tipo: CNAME
   Nome: www
   Dados: bitcoin-brasil.netlify.app
   TTL: 1 hora
   ```

5. **Salve as alterações**

## 🔐 Passo 4: Ativar HTTPS

1. No Netlify, vá em **Domain settings → HTTPS**
2. Clique em **Verify DNS configuration**
3. Aguarde verificação (5-30 minutos)
4. Clique em **Provision certificate**
5. HTTPS ativado automaticamente!

## ⚡ Passo 5: Otimizações

### No Netlify Dashboard:

1. **Asset Optimization**
   - Enable: CSS minification ✅
   - Enable: JS minification ✅
   - Enable: Image optimization ✅

2. **Post Processing**
   - Enable: Pretty URLs ✅
   - Enable: Bundle CSS ✅
   - Enable: Bundle JS ✅

3. **Build Plugins**
   - Adicione: `@netlify/plugin-nextjs`
   - Adicione: `netlify-plugin-cache-nextjs`

## 📊 URLs Finais

Após configuração completa:

- **Temporário:** https://bitcoin-brasil.netlify.app
- **Principal:** https://bitcoinbrasil.org
- **WWW:** https://www.bitcoinbrasil.org

## 🔍 Verificar Propagação DNS

Cheque em: https://www.whatsmydns.net/#A/bitcoinbrasil.org

## ⏱️ Tempo Estimado

- **Deploy Netlify:** 2-5 minutos
- **Propagação DNS:** 5 minutos a 4 horas
- **SSL/HTTPS:** 5-30 minutos após DNS

## 🆘 Troubleshooting

### Erro de Build?
```bash
# Adicione ao netlify.toml:
[build]
  command = "npm install && npm run build"
  publish = ".next"
  
[build.environment]
  NODE_VERSION = "18"
```

### Site não carrega?
1. Verifique DNS no GoDaddy
2. Aguarde propagação (até 4h)
3. Limpe cache do navegador

### Deploy falhou?
1. Check build logs no Netlify
2. Verifique package.json
3. Teste build local primeiro

## 📱 Configurações Adicionais

### Analytics (Grátis)
1. Site settings → Analytics
2. Enable Netlify Analytics

### Forms (Receber contatos)
```html
<!-- Adicione ao formulário HTML -->
<form name="contact" netlify>
  <!-- seus campos -->
</form>
```

### Redirects (já configurado)
Veja `netlify.toml` para redirects para:
- yuotube.ai
- standardbitcoin.io

## ✅ Checklist Final

- [ ] Código pushado para GitHub
- [ ] Deploy no Netlify completo
- [ ] DNS configurado no GoDaddy
- [ ] HTTPS ativado
- [ ] Site acessível em bitcoinbrasil.org
- [ ] Redirects funcionando
- [ ] Analytics ativado

---

**Suporte Netlify:** https://docs.netlify.com
**Status:** https://www.netlifystatus.com
**Community:** https://answers.netlify.com