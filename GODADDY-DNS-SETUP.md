# 🔧 Configuração DNS GoDaddy - Bitcoin Brasil

## ⚠️ ALTERAÇÕES NECESSÁRIAS NO GODADDY

### 🗑️ REMOVER (Delete estes registros):
```
❌ A @ Parked
❌ CNAME www @
❌ CNAME _domainconnect _domainconnect.gd.domaincontrol.com
```

### ✅ ADICIONAR (Crie estes novos registros):

## Opção 1: Deploy com Vercel (RECOMENDADO)
```
Tipo: A
Nome: @
Dados: 76.76.21.21
TTL: 600 segundos

Tipo: CNAME
Nome: www
Dados: cname.vercel-dns.com
TTL: 1 hora
```

## Opção 2: Deploy com Netlify
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

## Opção 3: Deploy com GitHub Pages
```
Tipo: A
Nome: @
Dados: 185.199.108.153
TTL: 600 segundos

Tipo: A
Nome: @
Dados: 185.199.109.153
TTL: 600 segundos

Tipo: A
Nome: @
Dados: 185.199.110.153
TTL: 600 segundos

Tipo: A
Nome: @
Dados: 185.199.111.153
TTL: 600 segundos

Tipo: CNAME
Nome: www
Dados: standardbitcoin10.github.io
TTL: 1 hora
```

## 📝 PASSO A PASSO NO GODADDY:

1. **Faça login** em godaddy.com
2. Vá para **"Meus Domínios"**
3. Clique em **"bitcoinbrasil.org"**
4. Clique em **"Gerenciar DNS"**
5. **DELETE** os registros marcados com ❌
6. Clique em **"Adicionar"** para cada novo registro
7. **Salve** as alterações

## 🚀 DEPOIS DE CONFIGURAR O DNS:

### Para Vercel:
```bash
# Eu farei o deploy automaticamente
# O site estará disponível em:
https://bitcoinbrasil.org
https://www.bitcoinbrasil.org
```

### Para Netlify:
```bash
# Site estará em:
https://bitcoin-brasil.netlify.app (temporário)
https://bitcoinbrasil.org (após DNS propagar)
```

### Para GitHub Pages:
```bash
# Site estará em:
https://standardbitcoin10.github.io/bitcoinbrasil (temporário)
https://bitcoinbrasil.org (após DNS propagar)
```

## ⏱️ TEMPO DE PROPAGAÇÃO:
- **Mínimo:** 5 minutos
- **Médio:** 1-4 horas  
- **Máximo:** 48 horas

## 🔍 VERIFICAR PROPAGAÇÃO:
Acesse: https://www.whatsmydns.net/#A/bitcoinbrasil.org

## 💡 RECOMENDAÇÃO:
**USE VERCEL** - É grátis, rápido e tem SSL automático!

## 🆘 SUPORTE GODADDY:
- Brasil: 0800-891-5876
- Chat: godaddy.com/help

---

**IMPORTANTE:** Mantenha os registros NS (nameservers) como estão:
- ns13.domaincontrol.com
- ns14.domaincontrol.com

Só mude os registros A e CNAME!