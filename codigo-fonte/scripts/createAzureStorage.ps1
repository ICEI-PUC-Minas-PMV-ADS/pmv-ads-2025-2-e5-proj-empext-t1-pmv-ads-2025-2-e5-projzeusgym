# Script PowerShell para criar Azure Storage Account automaticamente
# Requer Azure CLI instalado: https://docs.microsoft.com/cli/azure/install-azure-cli

Write-Host "🚀 Zeus Gym - Criação automática do Azure Storage" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Verificar se Azure CLI está instalado
try {
    az --version | Out-Null
} catch {
    Write-Host "❌ Azure CLI não encontrado!" -ForegroundColor Red
    Write-Host "📥 Instale em: https://docs.microsoft.com/cli/azure/install-azure-cli" -ForegroundColor Yellow
    Write-Host "💡 Ou configure manualmente seguindo o guia: npm run azure-setup" -ForegroundColor Yellow
    exit 1
}

# Verificar se está logado
Write-Host "🔐 Verificando login no Azure..." -ForegroundColor Cyan
try {
    az account show | Out-Null
} catch {
    Write-Host "📋 Fazendo login no Azure..." -ForegroundColor Yellow
    az login
}

# Configurações
$RESOURCE_GROUP = "zeus-gym-rg"
$STORAGE_ACCOUNT = "zeusgym$(Get-Date -Format 'yyyyMMddHHmmss')"  # Nome único
$LOCATION = "brazilsouth"
$CONTAINER_NAME = "physical-assessments"

Write-Host ""
Write-Host "📝 Configurações:" -ForegroundColor Cyan
Write-Host "   Resource Group: $RESOURCE_GROUP" -ForegroundColor White
Write-Host "   Storage Account: $STORAGE_ACCOUNT" -ForegroundColor White
Write-Host "   Location: Brazil South" -ForegroundColor White
Write-Host "   Container: $CONTAINER_NAME" -ForegroundColor White
Write-Host ""

# Criar Resource Group
Write-Host "🏗️  Criando Resource Group..." -ForegroundColor Yellow
az group create --name $RESOURCE_GROUP --location $LOCATION --output table

# Criar Storage Account
Write-Host "💾 Criando Storage Account..." -ForegroundColor Yellow
az storage account create `
    --name $STORAGE_ACCOUNT `
    --resource-group $RESOURCE_GROUP `
    --location $LOCATION `
    --sku Standard_LRS `
    --allow-blob-public-access true `
    --output table

# Obter Connection String
Write-Host "🔑 Obtendo Connection String..." -ForegroundColor Yellow
$CONNECTION_STRING = az storage account show-connection-string `
    --name $STORAGE_ACCOUNT `
    --resource-group $RESOURCE_GROUP `
    --output tsv

# Criar Container
Write-Host "📦 Criando Container..." -ForegroundColor Yellow
az storage container create `
    --name $CONTAINER_NAME `
    --connection-string $CONNECTION_STRING `
    --public-access blob `
    --output table

Write-Host ""
Write-Host "✅ Storage Account criado com sucesso!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📋 INFORMAÇÕES IMPORTANTES:" -ForegroundColor Cyan
Write-Host "Resource Group: $RESOURCE_GROUP" -ForegroundColor White
Write-Host "Storage Account: $STORAGE_ACCOUNT" -ForegroundColor White
Write-Host "Container: $CONTAINER_NAME" -ForegroundColor White
Write-Host ""
Write-Host "🔐 CONNECTION STRING:" -ForegroundColor Yellow
Write-Host $CONNECTION_STRING -ForegroundColor White
Write-Host ""
Write-Host "📝 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host "1. Copie a Connection String acima" -ForegroundColor White
Write-Host "2. Edite o arquivo .env" -ForegroundColor White
Write-Host "3. Substitua AZURE_STORAGE_CONNECTION_STRING=" -ForegroundColor White
Write-Host "4. Execute: npm run test-azure" -ForegroundColor White
Write-Host ""
Write-Host "💰 CUSTOS: ~R$ 2-5/mês para uso típico de academia" -ForegroundColor Green
Write-Host "🗑️  DELETAR: az group delete --name $RESOURCE_GROUP --yes" -ForegroundColor Red
Write-Host ""
Write-Host "════════════════════════════════════════════" -ForegroundColor Green

# Opcional: Atualizar .env automaticamente
$envPath = ".\.env"
if (Test-Path $envPath) {
    Write-Host ""
    Write-Host "📝 Deseja atualizar o arquivo .env automaticamente? (s/n)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "s" -or $response -eq "S") {
        $envContent = Get-Content $envPath
        $newContent = $envContent -replace "AZURE_STORAGE_CONNECTION_STRING=.*", "AZURE_STORAGE_CONNECTION_STRING=$CONNECTION_STRING"
        Set-Content $envPath $newContent
        Write-Host "✅ Arquivo .env atualizado!" -ForegroundColor Green
        Write-Host "🧪 Execute agora: npm run test-azure" -ForegroundColor Cyan
    }
}