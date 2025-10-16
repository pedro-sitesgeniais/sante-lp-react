# 🟢 Guia de Configuração Node.js no cPanel

Este guia resolve problemas com Node.js e npm no cPanel.

---

## 🔧 Problema: npm não funciona no cPanel

### **Erro comum:**
```
/opt/alt/alt-nodejs22/root/usr/bin/npm: No such file or directory
```

---

## ✅ Solução: Configurar Node.js App no cPanel

### **Passo 1: Acessar Setup Node.js App**

1. Faça login no **cPanel**
2. Procure por **"Setup Node.js App"** na busca
3. Clique em **Setup Node.js App**

### **Passo 2: Criar Nova Aplicação**

1. Clique em **"Create Application"**
2. Preencha:
   - **Node.js version**: Selecione **22.x** (ou mais recente disponível)
   - **Application mode**: **Production**
   - **Application root**: `repositories/sante-lp-react` (ou o caminho do seu repo)
   - **Application URL**: Deixe em branco (não precisa)
   - **Application startup file**: Deixe vazio

3. Clique em **"Create"**

### **Passo 3: Entrar no Terminal Virtual**

Após criar a aplicação, você verá um botão **"Run NPM Install"**.

**NÃO** clique nele ainda! Primeiro vamos configurar.

1. Na mesma página, copie o comando que aparece em **"Enter to the virtual environment"**
2. Será algo como:
   ```bash
   source /home/santecacaucom/nodevenv/repositories/sante-lp-react/22/bin/activate
   ```

---

## 🖥️ Passo 4: Usar o Terminal

### **No Terminal do cPanel:**

1. Abra o **Terminal** no cPanel
2. Cole o comando copiado acima:
   ```bash
   source /home/SEU_USUARIO/nodevenv/CAMINHO_DO_PROJETO/22/bin/activate
   ```

3. Seu prompt deve mudar para algo como:
   ```
   (22) [santecacaucom@servidor ~]$
   ```

4. Navegue para o diretório do projeto:
   ```bash
   cd ~/repositories/sante-lp-react
   ```

5. Agora você pode usar o npm:
   ```bash
   npm --version
   node --version
   ```

---

## 📦 Passo 5: Instalar Dependências

Com o ambiente virtual ativado:

```bash
# Remover node_modules e lock files antigos
rm -rf node_modules package-lock.json

# Instalar com --legacy-peer-deps
npm install --legacy-peer-deps
```

Se der erro, tente:
```bash
npm install --force
```

---

## 🏗️ Passo 6: Build do Projeto

```bash
# Criar arquivo .env
cp .env.example .env
nano .env
# Cole a URL do Google Sheets e salve (Ctrl+O, Enter, Ctrl+X)

# Build
npm run build
```

---

## 📁 Passo 7: Deploy Manual (Primeira Vez)

```bash
# Copiar arquivos para public_html
cp -r dist/* ~/public_html/

# Criar .htaccess
cat > ~/public_html/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF

# Ajustar permissões
chmod -R 755 ~/public_html
```

---

## 🔄 Deploys Futuros (Automatizado)

Depois da configuração inicial, você pode usar o script:

```bash
# Ativar ambiente virtual
source /home/SEU_USUARIO/nodevenv/repositories/sante-lp-react/22/bin/activate

# Executar deploy
~/repositories/sante-lp-react/deploy.sh
```

Ou crie um script wrapper:

```bash
# Criar arquivo deploy-wrapper.sh
cat > ~/deploy-sante.sh << 'EOF'
#!/bin/bash
source /home/santecacaucom/nodevenv/repositories/sante-lp-react/22/bin/activate
~/repositories/sante-lp-react/deploy.sh
EOF

# Tornar executável
chmod +x ~/deploy-sante.sh

# Usar assim:
~/deploy-sante.sh
```

---

## 🐛 Solução de Problemas Comuns

### **Erro: ERESOLVE unable to resolve dependency tree**

**Solução:**
```bash
npm install --legacy-peer-deps
```

Ou adicione no projeto o arquivo `.npmrc`:
```
legacy-peer-deps=true
```

### **Erro: npm: command not found**

**Solução:**
1. Verifique se criou a aplicação Node.js no cPanel
2. Ative o ambiente virtual:
   ```bash
   source /home/SEU_USUARIO/nodevenv/CAMINHO/22/bin/activate
   ```

### **Erro: Permission denied**

**Solução:**
```bash
chmod -R 755 ~/repositories/sante-lp-react
chmod +x ~/repositories/sante-lp-react/deploy.sh
```

### **Erro: Module not found**

**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

---

## 📝 Checklist de Verificação

Antes de fazer o build, verifique:

- [ ] Aplicação Node.js criada no cPanel
- [ ] Ambiente virtual ativado
- [ ] Versão do Node correta (`node --version` = v22.x)
- [ ] Arquivo `.env` criado e configurado
- [ ] Dependências instaladas (`node_modules/` existe)
- [ ] Build funcionando (`npm run build`)

---

## 🎯 Comandos Úteis

```bash
# Ver versão do Node/npm
node --version
npm --version

# Limpar cache do npm
npm cache clean --force

# Reinstalar tudo
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Testar build local
npm run build

# Ver espaço em disco
df -h

# Ver uso de memória
free -h
```

---

## 🔍 Onde Ficam os Arquivos

```
/home/santecacaucom/
├── public_html/           # Site público (onde vai o build)
├── repositories/          # Repositórios Git
│   └── sante-lp-react/   # Seu projeto
│       ├── src/
│       ├── public/
│       ├── dist/         # Build gerado
│       └── node_modules/
└── nodevenv/             # Ambientes virtuais Node.js
    └── repositories/
        └── sante-lp-react/
            └── 22/       # Node.js v22
                └── bin/
                    └── activate  # Script de ativação
```

---

## ⚡ Dica Pro: Alias no .bashrc

Facilite sua vida criando um alias:

```bash
# Editar .bashrc
nano ~/.bashrc

# Adicionar no final:
alias activate-node='source /home/santecacaucom/nodevenv/repositories/sante-lp-react/22/bin/activate'
alias deploy-sante='activate-node && ~/repositories/sante-lp-react/deploy.sh'

# Salvar e recarregar
source ~/.bashrc

# Agora você pode usar:
deploy-sante
```

---

## 🆘 Ainda com Problemas?

1. Verifique os logs do cPanel: **Error Log** na home do cPanel
2. Teste localmente primeiro: `npm run build` na sua máquina
3. Entre em contato com o suporte da hospedagem se o Node.js não estiver disponível

---

**Configuração completa! Agora você pode usar npm e fazer deploy no cPanel! 🚀**
