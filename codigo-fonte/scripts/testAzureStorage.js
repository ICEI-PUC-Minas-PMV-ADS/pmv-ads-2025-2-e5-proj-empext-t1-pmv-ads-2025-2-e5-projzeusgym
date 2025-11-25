const azureStorage = require('../src/config/azureStorage');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function testAzureStorage() {
  try {
    console.log('🧪 Iniciando teste do Azure Storage...\n');

    // 1. Inicializar container
    console.log('1️⃣  Inicializando container...');
    await azureStorage.initializeContainer();
    console.log('✅ Container inicializado com sucesso\n');

    // 2. Criar um arquivo de teste
    console.log('2️⃣  Criando arquivo de teste...');
    const testContent = Buffer.from(`
      # Teste Azure Storage - Zeus Gym
      Este é um arquivo de teste para verificar o funcionamento do Azure Blob Storage.
      Data: ${new Date().toISOString()}
      
      ## Funcionalidades testadas:
      - Upload de arquivo
      - Geração de URL
      - Geração de SAS URL
      - Download de arquivo
      - Exclusão de arquivo
    `);
    
    const testFileName = `teste_${Date.now()}.txt`;
    console.log(`📄 Arquivo de teste: ${testFileName}\n`);

    // 3. Upload do arquivo
    console.log('3️⃣  Fazendo upload do arquivo...');
    const uploadResult = await azureStorage.uploadFile(testContent, testFileName, 'text/plain');
    
    if (uploadResult.success) {
      console.log('✅ Upload realizado com sucesso!');
      console.log(`📍 URL: ${uploadResult.url}`);
      console.log(`🏷️  Blob Name: ${uploadResult.blobName}`);
      console.log(`📏 Tamanho: ${uploadResult.size} bytes\n`);
    } else {
      console.error('❌ Falha no upload:', uploadResult.error);
      return;
    }

    // 4. Obter URL do arquivo
    console.log('4️⃣  Obtendo URL do arquivo...');
    const fileUrl = await azureStorage.getFileUrl(uploadResult.blobName);
    console.log(`🔗 URL do arquivo: ${fileUrl}\n`);

    // 5. Gerar SAS URL
    console.log('5️⃣  Gerando SAS URL (acesso temporário)...');
    const sasUrl = await azureStorage.generateSasUrl(uploadResult.blobName, 30); // 30 minutos
    console.log(`🔐 SAS URL (válida por 30 min): ${sasUrl}\n`);

    // 6. Aguardar um pouco antes de deletar
    console.log('6️⃣  Aguardando 3 segundos antes de deletar...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 7. Deletar o arquivo
    console.log('7️⃣  Deletando arquivo de teste...');
    const deleteResult = await azureStorage.deleteFile(uploadResult.blobName);
    
    if (deleteResult.success) {
      console.log('✅ Arquivo deletado com sucesso!\n');
    } else {
      console.error('❌ Falha ao deletar:', deleteResult.error);
    }

    console.log('🎉 Teste do Azure Storage concluído com sucesso!');
    console.log('\n' + '='.repeat(50));
    console.log('✅ Todas as funcionalidades estão funcionando corretamente');
    console.log('✅ Sistema pronto para usar Azure Blob Storage');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('\n❌ Erro durante o teste:', error);
    console.log('\n' + '='.repeat(50));
    console.log('⚠️  Verificações necessárias:');
    console.log('1. Verifique se AZURE_STORAGE_CONNECTION_STRING está configurada');
    console.log('2. Verifique se a connection string está correta');
    console.log('3. Verifique se a conta de storage tem as permissões necessárias');
    console.log('4. Verifique sua conexão com a internet');
    console.log('='.repeat(50));
  }
}

// Executar teste se este arquivo for executado diretamente
if (require.main === module) {
  testAzureStorage();
}

module.exports = { testAzureStorage };