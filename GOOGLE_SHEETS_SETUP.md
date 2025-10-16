# 📊 Configuração Google Sheets - Captura de Leads

Este guia mostra como configurar a integração com Google Sheets para capturar os leads do formulário automaticamente.

## 🎯 Passo a Passo Completo

### **1️⃣ Criar a Planilha no Google Sheets**

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Nomeie como: **"Leads - Santé Cacau B2B"**
4. Na primeira linha (cabeçalho), adicione as seguintes colunas:

```
A1: Data/Hora
B1: Empresa
C1: CNPJ
D1: Responsável
E1: Telefone
F1: E-mail
G1: Origem
```

### **2️⃣ Abrir o Editor de Scripts**

1. Na planilha, clique em **Extensões** → **Apps Script**
2. Apague todo o código que aparecer
3. Cole o código abaixo:

```javascript
function doPost(e) {
  try {
    // ID da sua planilha (pegar da URL)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse dos dados recebidos
    var data = JSON.parse(e.postData.contents);

    // Adicionar nova linha com os dados
    sheet.appendRow([
      data.timestamp,
      data.empresa,
      data.cnpj,
      data.responsavel,
      data.telefone,
      data.email,
      data.origem
    ]);

    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log de erro
    Logger.log(error);
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Clique em **Salvar** (ícone de disquete)
5. Dê um nome ao projeto: **"Captura Leads Santé Cacau"**

### **3️⃣ Implantar como Web App**

1. Clique em **Implantar** → **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ → Selecione **Aplicativo da Web**
3. Configure:
   - **Descrição**: "API de Captura de Leads"
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
4. Clique em **Implantar**
5. **IMPORTANTE**: Clique em **Autorizar acesso**
6. Selecione sua conta Google
7. Clique em **Avançado** → **Ir para [nome do projeto] (não seguro)**
8. Clique em **Permitir**
9. **COPIE A URL** que aparece (começa com `https://script.google.com/...`)

### **4️⃣ Configurar a URL no Projeto React**

1. No projeto, crie um arquivo `.env` (copie do `.env.example`)
2. Cole a URL copiada:

```env
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/SEU_ID_AQUI/exec
```

3. Salve o arquivo

### **5️⃣ Reiniciar o Servidor de Desenvolvimento**

```bash
# Pare o servidor (Ctrl+C) e reinicie
npm run dev
```

## ✅ Testar a Integração

1. Acesse a landing page
2. Preencha o formulário
3. Clique em "Quero Revender Santé Cacau"
4. Verifique se os dados apareceram na planilha

## 🎨 Personalizar a Planilha (Opcional)

### Formatação Condicional

1. Selecione a coluna **Origem** (coluna G)
2. **Formatar** → **Formatação condicional**
3. Regra: "O texto contém" → "Landing Page B2B"
4. Cor de fundo: Verde claro

### Ordenação Automática

Os leads mais recentes aparecerão no final. Para ver os últimos primeiro:
1. Clique na coluna **Data/Hora**
2. **Dados** → **Classificar planilha** → **Classificar planilha por coluna A (Z → A)**

### Notificação por Email (Opcional)

Para receber email quando novo lead chegar:

1. No Apps Script, adicione esta função:

```javascript
function enviarNotificacao(data) {
  var email = "contato@santecacau.com.br"; // Seu email
  var assunto = "🍫 Novo Lead - " + data.empresa;
  var mensagem =
    "Novo lead recebido!\n\n" +
    "Empresa: " + data.empresa + "\n" +
    "CNPJ: " + data.cnpj + "\n" +
    "Responsável: " + data.responsavel + "\n" +
    "Telefone: " + data.telefone + "\n" +
    "E-mail: " + data.email + "\n" +
    "Data/Hora: " + data.timestamp;

  MailApp.sendEmail(email, assunto, mensagem);
}
```

2. Modifique a função `doPost` para incluir:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp,
      data.empresa,
      data.cnpj,
      data.responsavel,
      data.telefone,
      data.email,
      data.origem
    ]);

    // ADICIONAR ESTA LINHA
    enviarNotificacao(data);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log(error);
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Salve e **Reimplante** (Implantar → Gerenciar implantações → Editar → Nova versão)

## 🔧 Solução de Problemas

### Erro: "Configuração pendente"
- Verifique se criou o arquivo `.env`
- Verifique se a URL está correta
- Reinicie o servidor (`npm run dev`)

### Dados não aparecem na planilha
- Verifique se autorizou o script
- Teste a URL do script direto no navegador
- Verifique os logs no Apps Script (Execuções)

### Erro CORS
- Certifique-se de que configurou "Quem tem acesso: Qualquer pessoa"
- Use `mode: 'no-cors'` no fetch (já está configurado)

## 📈 Próximos Passos

Após configurar, você pode:

1. **Criar relatórios** com gráficos no Google Sheets
2. **Exportar para Excel** quando precisar
3. **Integrar com CRM** usando Zapier ou Make.com
4. **Criar dashboards** no Google Data Studio

## 🆘 Precisa de Ajuda?

Se tiver dificuldades:
1. Verifique se seguiu todos os passos
2. Confira os logs no Apps Script
3. Teste com dados fictícios primeiro

---

**Configuração feita! Agora todos os leads serão salvos automaticamente na planilha! 🎉**
