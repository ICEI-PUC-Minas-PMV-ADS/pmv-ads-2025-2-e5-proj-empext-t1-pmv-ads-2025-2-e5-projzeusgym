#!/bin/bash

# Script para criar Azure Storage Account automaticamente
# Requer Azure CLI instalado: https://docs.microsoft.com/cli/azure/install-azure-cli

echo "🚀 Zeus Gym - Criação automática do Azure Storage"
echo "=================================================="

# Verificar se Azure CLI está instalado
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI não encontrado!"
    echo "📥 Instale em: https://docs.microsoft.com/cli/azure/install-azure-cli"
    echo "💡 Ou configure manualmente seguindo o guia: npm run azure-setup"
    exit 1
fi

# Verificar se está logado
echo "🔐 Verificando login no Azure..."
if ! az account show &> /dev/null; then
    echo "📋 Fazendo login no Azure..."
    az login
fi

# Configurações
RESOURCE_GROUP="zeus-gym-rg"
STORAGE_ACCOUNT="zeusgym$(date +%s)"  # Nome único baseado em timestamp
LOCATION="brazilsouth"
CONTAINER_NAME="physical-assessments"

echo ""
echo "📝 Configurações:"
echo "   Resource Group: $RESOURCE_GROUP"
echo "   Storage Account: $STORAGE_ACCOUNT"
echo "   Location: Brazil South"
echo "   Container: $CONTAINER_NAME"
echo ""

# Criar Resource Group
echo "🏗️  Criando Resource Group..."
az group create \
    --name $RESOURCE_GROUP \
    --location $LOCATION \
    --output table

# Criar Storage Account
echo "💾 Criando Storage Account..."
az storage account create \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --sku Standard_LRS \
    --allow-blob-public-access true \
    --output table

# Obter Connection String
echo "🔑 Obtendo Connection String..."
CONNECTION_STRING=$(az storage account show-connection-string \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --output tsv)

# Criar Container
echo "📦 Criando Container..."
az storage container create \
    --name $CONTAINER_NAME \
    --connection-string "$CONNECTION_STRING" \
    --public-access blob \
    --output table

echo ""
echo "✅ Storage Account criado com sucesso!"
echo "════════════════════════════════════════════"
echo ""
echo "📋 INFORMAÇÕES IMPORTANTES:"
echo "Resource Group: $RESOURCE_GROUP"
echo "Storage Account: $STORAGE_ACCOUNT"
echo "Container: $CONTAINER_NAME"
echo ""
echo "🔐 CONNECTION STRING:"
echo "$CONNECTION_STRING"
echo ""
echo "📝 PRÓXIMOS PASSOS:"
echo "1. Copie a Connection String acima"
echo "2. Edite o arquivo .env"
echo "3. Substitua AZURE_STORAGE_CONNECTION_STRING="
echo "4. Execute: npm run test-azure"
echo ""
echo "💰 CUSTOS: ~R$ 2-5/mês para uso típico de academia"
echo "🗑️  DELETAR: az group delete --name $RESOURCE_GROUP --yes"
echo ""
echo "════════════════════════════════════════════"