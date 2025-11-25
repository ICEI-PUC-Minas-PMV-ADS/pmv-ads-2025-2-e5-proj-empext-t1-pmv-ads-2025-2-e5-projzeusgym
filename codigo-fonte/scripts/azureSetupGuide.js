console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    🚀 ZEUS GYM - AZURE SETUP                ║
║            Configuração do Azure Blob Storage               ║
╚══════════════════════════════════════════════════════════════╝

📋 Passo a passo para configurar Azure Storage:

1️⃣  CRIAR CONTA AZURE (se não tiver)
   ▪ Acesse: https://azure.microsoft.com/free/
   ▪ Cadastre-se gratuitamente (R$ 200 de crédito)

2️⃣  CRIAR STORAGE ACCOUNT
   ▪ Acesse: https://portal.azure.com
   ▪ Clique em "Create a resource"
   ▪ Procure por "Storage account"
   ▪ Clique "Create"
   
   Configurações recomendadas:
   ▪ Resource group: Crie novo (ex: "zeus-gym-rg")
   ▪ Storage account name: "zeusgym" + números únicos
   ▪ Region: Brazil South (mais próximo)
   ▪ Performance: Standard
   ▪ Redundancy: LRS (mais barato)
   ▪ Enable public access: ✅ SIM

3️⃣  OBTER CONNECTION STRING
   ▪ Vá para sua Storage Account criada
   ▪ Menu lateral: "Access keys"
   ▪ Clique "Show keys"
   ▪ Copie a "Connection string" da Key1

4️⃣  CRIAR CONTAINER
   ▪ Na Storage Account, vá em "Containers"
   ▪ Clique "+ Container"
   ▪ Name: "physical-assessments"
   ▪ Public access level: "Blob"
   ▪ Clique "Create"

5️⃣  CONFIGURAR NO PROJETO
   ▪ Edite o arquivo .env
   ▪ Substitua AZURE_STORAGE_CONNECTION_STRING pela sua connection string
   ▪ Mantenha AZURE_CONTAINER_NAME=physical-assessments

═══════════════════════════════════════════════════════════════

🔧 EXEMPLO DE CONNECTION STRING:
DefaultEndpointsProtocol=https;AccountName=zeusgym123;AccountKey=abc...xyz;EndpointSuffix=core.windows.net

⚠️  IMPORTANTE:
▪ Não compartilhe sua connection string
▪ Use variáveis de ambiente no Heroku
▪ A conta gratuita tem 5GB de storage

💰 CUSTOS ESTIMADOS:
▪ Storage: ~R$ 0,50 por GB/mês
▪ Transações: ~R$ 0,20 por 10.000 ops
▪ Para uma academia: ~R$ 2-5/mês

🎯 PRÓXIMOS COMANDOS:
1. Edite o arquivo .env com sua connection string
2. Execute: npm start
3. Teste: npm run test-azure

═══════════════════════════════════════════════════════════════
`);

// Verificar se .env existe e dar instruções específicas
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    console.log('✅ Arquivo .env encontrado!');
    console.log('📝 Edite o arquivo .env e substitua:');
    console.log('   AZURE_STORAGE_CONNECTION_STRING=sua-connection-string-aqui');
    console.log('');
    console.log('🧪 Após configurar, teste com:');
    console.log('   npm run test-azure');
} else {
    console.log('❌ Arquivo .env não encontrado!');
    console.log('📝 Crie o arquivo .env baseado no .env.example');
}

console.log(`
📚 DOCUMENTAÇÃO COMPLETA:
▪ Azure Storage: https://docs.microsoft.com/azure/storage/
▪ Pricing: https://azure.microsoft.com/pricing/details/storage/blobs/
▪ Arquivo local: ./HEROKU_SETUP.md

🆘 PRECISA DE AJUDA?
▪ Discord Azure Brasil: https://aka.ms/azurebrasil
▪ Stack Overflow: azure + blob-storage

════════════════════════════════════════════════════════════════
        🎉 Boa sorte com a configuração!
════════════════════════════════════════════════════════════════
`);