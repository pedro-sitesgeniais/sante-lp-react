# 🍫 Santé Cacau - Landing Page B2B

Landing page para captação de leads B2B da Santé Cacau, especializada em chocolates artesanais veganos com certificação kosher.

![Santé Cacau](public/Logo-Sante-Cacau.webp)

## 🎯 Objetivo

Capturar leads qualificados de potenciais revendedores através de uma página otimizada para conversão, destacando os diferenciais da marca e os benefícios da parceria.

## ✨ Características

### Elementos Implementados

1. **Hero Section com Formulário**
   - Título persuasivo focado no benefício para o revendedor
   - Formulário de captura de leads em destaque
   - Selos de certificação (Vegano, Sem Glúten, Sem Lactose, Kosher)
   - Badge "Desde 2015 no Mercado"

2. **Seção de Benefícios**
   - 4 cards destacando vantagens da revenda
   - Ícones visuais para cada benefício
   - Foco em: Alta Demanda, Qualidade Premium, Boas Margens, Suporte Completo

3. **Showcase de Produtos**
   - 3 linhas de produtos apresentadas
   - Linha Snacks, Linha Premium, Linha Culinária
   - Badges de características (Sem Açúcar, Vegano, Premium, etc.)

4. **Prova Social**
   - 3 depoimentos de parceiros fictícios
   - Avaliações 5 estrelas
   - Nome do parceiro e nome da loja

5. **Trust Badges**
   - Seção com números de credibilidade
   - 10+ Anos, 100% Artesanal, Kosher Certificado, Entrega Nacional

6. **CTA Final**
   - Chamada para ação reforçada
   - Botão que rola para o topo (formulário)

7. **Footer**
   - Informações da empresa
   - CNPJ e razão social

## 🎨 Design

- **Paleta de Cores**: Tons de marrom/âmbar (identidade Santé Cacau)
- **Gradientes**: Utilizados para criar profundidade e modernidade
- **Responsivo**: Layout adaptável para desktop, tablet e mobile
- **Animações**: Hover states e transições suaves
- **Tipografia**: Hierarquia clara com títulos em destaque

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI reutilizáveis
- **Lucide React** - Ícones modernos
- **Google Apps Script** - Integração com Google Sheets

## 📦 Estrutura do Projeto

```
sante-lp-react/
├── public/              # Arquivos estáticos
│   ├── Logo-Sante-Cacau.webp
│   ├── favicon.ico
│   └── *.webp          # Imagens dos produtos
├── src/
│   ├── components/     # Componentes React
│   │   └── ui/        # Componentes shadcn/ui
│   ├── App.jsx        # Componente principal
│   ├── main.jsx       # Entry point
│   └── index.css      # Estilos globais
├── .env.example       # Exemplo de variáveis de ambiente
├── deploy.sh          # Script de deploy automático
├── CPANEL_GIT_SETUP.md # Guia Git/cPanel
└── GOOGLE_SHEETS_SETUP.md # Guia Google Sheets
```

## 🛠️ Instalação Local

### Pré-requisitos

- Node.js 18+ e npm
- Git

### Passos

1. **Clone o repositório**
   ```bash
   git clone git@github.com:SEU_USUARIO/sante-lp-react.git
   cd sante-lp-react
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` e adicione sua URL do Google Apps Script:
   ```env
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/SEU_ID/exec
   ```

4. **Execute o projeto em desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## 📊 Configuração Google Sheets

Para configurar a captura de leads no Google Sheets, siga o guia detalhado:

👉 **[GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)**

Resumo:
1. Crie uma planilha no Google Sheets
2. Configure o Google Apps Script
3. Copie a URL do Web App
4. Adicione no arquivo `.env`

## 🚀 Deploy para Produção

### Opção 1: Deploy Automático via Script

Siga o guia completo de configuração:

👉 **[CPANEL_GIT_SETUP.md](CPANEL_GIT_SETUP.md)**

Após configurar o SSH, use o script de deploy:

```bash
# No servidor cPanel via SSH
~/public_html/sante-lp-react/deploy.sh
```

### Opção 2: Deploy Manual

```bash
# 1. Build do projeto
npm run build

# 2. Envie a pasta dist/ para o servidor
# Use FTP ou rsync
```

### Opção 3: Via cPanel Git™ Version Control

1. Acesse cPanel > Git™ Version Control
2. Configure o repositório
3. Deploy com um clique

## 📝 Workflow de Desenvolvimento

### 1. Desenvolvimento Local

```bash
# Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade

# Faça suas alterações
# Teste localmente

# Commit suas mudanças
git add .
git commit -m "feat: adicionar nova funcionalidade"

# Push para o GitHub
git push origin feature/nova-funcionalidade
```

### 2. Deploy para Produção

```bash
# Via SSH no cPanel
ssh cpanelusername@seudominio.com.br

# Execute o script de deploy
~/public_html/sante-lp-react/deploy.sh
```

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint
```

## 📱 Funcionalidades Principais

### Formulário de Captura de Leads

- ✅ Máscaras automáticas para CNPJ e telefone
- ✅ Validação em tempo real
- ✅ Envio assíncrono para Google Sheets
- ✅ Feedback visual de sucesso/erro
- ✅ Limpeza automática após envio

### Catálogo de Produtos

- ✅ 6 produtos com informações detalhadas
- ✅ Badges personalizadas
- ✅ Imagens otimizadas em WebP
- ✅ Layout responsivo

### Depoimentos Reais

- ✅ Carrossel com depoimentos do Google
- ✅ Avatares dos clientes
- ✅ Navegação intuitiva

### FAQ Interativo

- ✅ Accordion expansível
- ✅ Ícones ilustrativos
- ✅ Respostas detalhadas

## 🎯 Otimizações de Conversão Implementadas

1. ✅ Formulário visível acima da dobra
2. ✅ CTA claro e destacado ("Quero Revender Santé Cacau")
3. ✅ Prova social com depoimentos
4. ✅ Trust badges e certificações
5. ✅ Benefícios claros e objetivos
6. ✅ Design profissional e confiável
7. ✅ Múltiplos CTAs ao longo da página
8. ✅ Cores que remetem à marca

## 📱 Responsividade

A página é totalmente responsiva e se adapta a:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Customização

### Cores

As cores principais estão definidas no Tailwind CSS:

```javascript
// Paleta principal
amber-50 a amber-900  // Tons de âmbar/caramelo
green-600 a green-800 // Verde dos CTAs
```

### Logo

Para alterar o logo, substitua o arquivo:
```
public/Logo-Sante-Cacau.webp
```

### Produtos

Edite o array `products` em `src/App.jsx`:

```javascript
const products = [
  {
    id: 1,
    name: "Nome do Produto",
    category: "Categoria",
    cacao: "70%",
    weight: "80g",
    description: "Descrição...",
    image: "/produto.webp",
    badges: ["Badge1", "Badge2"]
  }
]
```

## 🔒 Segurança

- ✅ Arquivo `.env` no `.gitignore`
- ✅ Variáveis de ambiente protegidas
- ✅ HTTPS forçado via `.htaccess`
- ✅ Validação de formulário

## 📈 Performance

- ⚡ Imagens em WebP (60-70% menor)
- ⚡ Code splitting automático (Vite)
- ⚡ CSS minificado
- ⚡ Cache control configurado
- ⚡ GZIP compression

## 🐛 Solução de Problemas

### Formulário não envia

1. Verifique se o `.env` está configurado
2. Teste a URL do Google Apps Script
3. Verifique o console do navegador (F12)

### Site em branco após deploy

1. Limpe o cache (Ctrl+Shift+R)
2. Verifique se o `.htaccess` existe
3. Confira as permissões: `chmod -R 755`

## 📞 Contato Santé Cacau

- **Telefone/WhatsApp**: (17) 9 9198-2372
- **Email**: contato@santecacau.com.br
- **Endereço**: R. Sete de Setembro, 702 - Centro, Colina - SP, 14770-000

## 📄 Licença

Este projeto é propriedade da Santé Cacau - Rochas Comércio e Indústria de Alimentos de Colina Ltda.

CNPJ: 65.834.251/0001-17

---

**Desenvolvido com ❤️ para Santé Cacau** 🍫

*A Essência do Cacau, a Alma do Brasil*
