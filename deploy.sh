#!/bin/bash

# 🍫 Script de Deploy Automático - Santé Cacau LP
# Este script automatiza o processo de deploy no cPanel

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🍫  Deploy Automático - Santé Cacau LP  🍫${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Configurações (ajuste conforme necessário)
PROJECT_DIR=~/public_html/sante-lp-react
DEPLOY_DIR=~/public_html
BRANCH="main"

# Verificar se estamos no diretório correto
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Erro: Diretório do projeto não encontrado!${NC}"
    echo -e "${YELLOW}   Esperado: $PROJECT_DIR${NC}"
    exit 1
fi

# Navegar para o diretório do projeto
cd "$PROJECT_DIR" || exit

# 1. Fazer pull das últimas alterações
echo -e "${BLUE}📥 Baixando alterações do GitHub...${NC}"
git pull origin $BRANCH

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao fazer pull do GitHub${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Código atualizado com sucesso${NC}"
echo ""

# 2. Instalar/Atualizar dependências
echo -e "${BLUE}📦 Instalando dependências...${NC}"
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências${NC}"
    echo -e "${YELLOW}   Tentando com --force...${NC}"
    npm install --force

    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Falha crítica ao instalar dependências${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# 3. Verificar se .env existe
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env não encontrado!${NC}"
    echo -e "${YELLOW}   Criando arquivo .env de exemplo...${NC}"
    cp .env.example .env
    echo -e "${RED}   ⚠️  IMPORTANTE: Configure o arquivo .env antes de continuar!${NC}"
    echo -e "${YELLOW}   Execute: nano $PROJECT_DIR/.env${NC}"
    exit 1
fi

# 4. Build do projeto
echo -e "${BLUE}🏗️  Gerando build de produção...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao gerar build${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build gerado com sucesso${NC}"
echo ""

# 5. Backup dos arquivos antigos (opcional)
BACKUP_DIR=~/backups/sante-lp-$(date +%Y%m%d_%H%M%S)
echo -e "${BLUE}💾 Criando backup em $BACKUP_DIR...${NC}"
mkdir -p "$BACKUP_DIR"
cp -r "$DEPLOY_DIR"/*.{html,js,css,webp,png,jpg,jpeg,mp4,ico} "$BACKUP_DIR" 2>/dev/null || true
echo -e "${GREEN}✅ Backup criado${NC}"
echo ""

# 6. Mover arquivos para o diretório público
echo -e "${BLUE}📁 Movendo arquivos para $DEPLOY_DIR...${NC}"

# Limpar arquivos antigos (exceto alguns importantes)
cd "$DEPLOY_DIR" || exit
find . -maxdepth 1 -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \) -delete
rm -rf assets 2>/dev/null || true

# Copiar novos arquivos
cp -r "$PROJECT_DIR/dist/"* "$DEPLOY_DIR/"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao mover arquivos${NC}"
    echo -e "${YELLOW}   Restaurando backup...${NC}"
    cp -r "$BACKUP_DIR"/* "$DEPLOY_DIR/"
    exit 1
fi

echo -e "${GREEN}✅ Arquivos movidos com sucesso${NC}"
echo ""

# 7. Criar/Atualizar .htaccess para SPA
echo -e "${BLUE}⚙️  Configurando .htaccess...${NC}"
cat > "$DEPLOY_DIR/.htaccess" << 'EOF'
# Santé Cacau - Landing Page Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirecionar para HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Single Page Application (SPA) routing
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
EOF

echo -e "${GREEN}✅ .htaccess configurado${NC}"
echo ""

# 8. Ajustar permissões
echo -e "${BLUE}🔒 Ajustando permissões...${NC}"
chmod -R 755 "$DEPLOY_DIR"
echo -e "${GREEN}✅ Permissões ajustadas${NC}"
echo ""

# 9. Finalização
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Deploy concluído com sucesso! ✨${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📊 Informações do Deploy:${NC}"
echo -e "   📅 Data: $(date '+%d/%m/%Y %H:%M:%S')"
echo -e "   📂 Diretório: $DEPLOY_DIR"
echo -e "   💾 Backup: $BACKUP_DIR"
echo ""
echo -e "${YELLOW}🌐 Acesse seu site para verificar:${NC}"
echo -e "${BLUE}   https://seudominio.com.br${NC}"
echo ""
echo -e "${YELLOW}📝 Próximos passos:${NC}"
echo -e "   1. Limpe o cache do navegador (Ctrl+Shift+R)"
echo -e "   2. Teste o formulário de captura de leads"
echo -e "   3. Verifique se os dados chegam no Google Sheets"
echo ""
