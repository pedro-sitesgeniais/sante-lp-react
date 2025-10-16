# Landing Page B2B - Santé Cacau

Landing page persuasiva para captação de revendedores B2B da Santé Cacau.

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

## 🛠️ Tecnologias

- **React** 18
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones

## 🚀 Como Executar

### Desenvolvimento

```bash
cd sante-lp-react
pnpm install
pnpm run dev
```

Acesse: http://localhost:5173

### Build para Produção

```bash
pnpm run build
```

Os arquivos otimizados estarão na pasta `dist/`

## 📝 Próximos Passos Sugeridos

### Para Produção Real:

1. **Integração com Backend**
   - Conectar formulário a um CRM ou sistema de email marketing
   - Adicionar validação de CNPJ
   - Implementar máscaras nos campos (telefone, CNPJ)

2. **Imagens Reais**
   - Substituir ícones por fotos reais dos produtos
   - Adicionar fotos dos parceiros reais nos depoimentos
   - Incluir fotos da fábrica/loja

3. **SEO**
   - Adicionar meta tags (description, keywords)
   - Implementar Schema.org para rich snippets
   - Otimizar imagens

4. **Analytics**
   - Integrar Google Analytics ou similar
   - Configurar eventos de conversão
   - Implementar pixel do Facebook/Meta

5. **Performance**
   - Lazy loading de imagens
   - Otimização de fontes
   - Minificação adicional

6. **Legal**
   - Adicionar política de privacidade
   - Implementar LGPD compliance
   - Termos de uso

## 📧 Formulário

Campos implementados:
- Nome da Empresa
- CNPJ
- Nome do Responsável
- Telefone
- E-mail

**Ação atual**: Alert de confirmação (placeholder)
**Recomendado**: Integrar com serviço de email ou CRM

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

## 🔧 Customização

Para personalizar cores, edite o arquivo `src/App.css`:
- Variáveis CSS customizadas
- Paleta de cores Tailwind

Para alterar conteúdo, edite `src/App.jsx`:
- Textos
- Depoimentos
- Benefícios
- Produtos

---

**Desenvolvido para Santé Cacau - Chocolates que Nutrem o Corpo e a Alma**
