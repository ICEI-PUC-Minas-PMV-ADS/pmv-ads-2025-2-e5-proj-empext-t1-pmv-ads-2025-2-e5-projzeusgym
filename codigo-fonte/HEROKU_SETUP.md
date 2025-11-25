# Configuração para Deploy no Heroku - Zeus Gym

## 📋 Pré-requisitos

1. **Conta no Heroku** com aplicação já criada
2. **Conta no Azure** para Azure Blob Storage
3. **Heroku CLI** instalado localmente

## ⚙️ Configuração do Azure Storage

### 1. Criar Storage Account no Azure Portal

```bash
# Via Azure CLI (alternativa)
az storage account create \
  --name zeusgymstg \
  --resource-group seu-resource-group \
  --location eastus \
  --sku Standard_LRS \
  --allow-blob-public-access true
```

### 2. Obter Connection String
- No Azure Portal: Storage Account → Access Keys → Connection String
- Copie a "Connection string" da Key1 ou Key2

### 3. Criar Container
- No Azure Portal: Storage Account → Containers → + Container
- Nome: `physical-assessments`
- Public access level: `Blob`

## 🔧 Configuração das Variáveis no Heroku

### Via Heroku Dashboard
1. Acesse sua aplicação no Heroku Dashboard
2. Vá em Settings → Config Vars
3. Adicione as seguintes variáveis:

```env
# Banco de dados (já deve estar configurado via addon)
DATABASE_URL=postgresql://... (automático com Heroku Postgres)

# JWT e autenticação
JWT_SECRET=sua-chave-jwt-super-secreta-aqui
ADMIN_LOGIN=admin
ADMIN_PASSWORD=sua-senha-admin-segura

# Email (se configurado)
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-app

# Azure Storage (OBRIGATÓRIO para upload de arquivos)
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=zeusgymstg;AccountKey=sua-chave-aqui;EndpointSuffix=core.windows.net
AZURE_CONTAINER_NAME=physical-assessments

# Outras configurações
NODE_ENV=production
```

### Via Heroku CLI
```bash
# Definir variáveis do Azure
heroku config:set AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=zeusgymstg;AccountKey=sua-chave;EndpointSuffix=core.windows.net" -a sua-app

heroku config:set AZURE_CONTAINER_NAME="physical-assessments" -a sua-app

# Verificar se foram definidas
heroku config -a sua-app
```

## 🚀 Deploy

### 1. Commit e Push
```bash
git add .
git commit -m "feat: integração com Azure Blob Storage para upload de arquivos"
git push heroku main
```

### 2. Executar Migração (se necessário)
```bash
# Se precisar adicionar as novas colunas no banco
heroku run node scripts/migrateAzureStorage.js -a sua-app
```

### 3. Testar Azure Storage
```bash
# Testar se a configuração está funcionando
heroku run node scripts/testAzureStorage.js -a sua-app
```

### 4. Verificar Logs
```bash
heroku logs --tail -a sua-app
```

## 🔍 Verificação de Funcionamento

### No startup, você deve ver:
```
🚀 Servidor rodando na porta 5000
📊 Banco de dados: ✅ Conectado
☁️  Azure Storage: ✅ Configurado
```

### Se Azure não estiver configurado:
```
🚀 Servidor rodando na porta 5000
📊 Banco de dados: ✅ Conectado
☁️  Azure Storage: ⚠️  Não configurado
💡 Para habilitar upload de arquivos, configure AZURE_STORAGE_CONNECTION_STRING
```

## 🐛 Troubleshooting

### Erro: "Azure Storage não está configurado"
- Verifique se `AZURE_STORAGE_CONNECTION_STRING` está definida
- Confirme se a connection string está correta
- Teste com: `heroku config:get AZURE_STORAGE_CONNECTION_STRING -a sua-app`

### Erro: "Container não encontrado"
- Verifique se o container `physical-assessments` existe no Azure
- Confirme se o nome do container está correto em `AZURE_CONTAINER_NAME`

### Erro de permissão no Azure
- Verifique se o Storage Account permite acesso público a blobs
- Confirme as chaves de acesso no Azure Portal

## 💰 Custos do Azure Storage

### Preços aproximados (região East US):
- **Storage**: ~$0.018/GB por mês
- **Transações**: ~$0.004 por 10.000 operações
- **Bandwidth**: Primeiros 5GB grátis/mês

### Para uma academia média:
- 100 PDFs/mês × 1MB = 100MB = ~$0.002/mês
- Muito econômico! 💪

## 📝 Notas Importantes

1. **Backward Compatibility**: O sistema ainda funciona com arquivos locais existentes
2. **Graceful Degradation**: Se Azure não estiver configurado, a aplicação ainda inicia
3. **Segurança**: URLs têm SAS tokens com tempo limitado (60 minutos)
4. **Performance**: Arquivos são servidos diretamente do Azure (CDN global)

## 🔄 Próximas Melhorias

- [ ] Implementar CDN do Azure para melhor performance global
- [ ] Adicionar thumbnails automáticos para PDFs
- [ ] Implementar backup automático
- [ ] Adicionar métricas de uso do storage