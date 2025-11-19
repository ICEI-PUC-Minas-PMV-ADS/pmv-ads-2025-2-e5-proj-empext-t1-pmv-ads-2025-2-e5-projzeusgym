const { BlobServiceClient } = require('@azure/storage-blob');

// Garantir que as variáveis de ambiente sejam carregadas
require('dotenv').config();

class AzureStorageService {
  constructor() {
    // Configurações do Azure Storage
    this.connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    this.containerName = process.env.AZURE_CONTAINER_NAME || 'physical-assessments';
    
    if (!this.connectionString) {
      console.warn('⚠️  AZURE_STORAGE_CONNECTION_STRING não está definida. Funcionalidade de upload estará indisponível.');
      this.isConfigured = false;
      return;
    }

    try {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);
      this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      this.isConfigured = true;
    } catch (error) {
      console.error('❌ Erro ao configurar Azure Storage:', error.message);
      this.isConfigured = false;
    }
  }

  async initializeContainer() {
    if (!this.isConfigured) {
      console.log('⚠️  Azure Storage não configurado, pulando inicialização do container');
      return false;
    }

    try {
      // Criar container se não existir (sem acesso público)
      await this.containerClient.createIfNotExists({
        access: 'container' // Acesso privado - mais seguro
      });
      console.log(`✅ Container ${this.containerName} inicializado com sucesso`);
      return true;
    } catch (error) {
      // Se der erro de acesso público, tentar criar container privado
      try {
        await this.containerClient.createIfNotExists();
        console.log(`✅ Container ${this.containerName} inicializado (modo privado)`);
        return true;
      } catch (error2) {
        console.error('❌ Erro ao inicializar container:', error.message);
        // Não marcar como não configurado - pode ser que o container já exista
        return true; // Continuar mesmo assim
      }
    }
  }

  async uploadFile(buffer, fileName, contentType = 'application/pdf') {
    if (!this.isConfigured) {
      return {
        success: false,
        error: 'Azure Storage não está configurado. Verifique AZURE_STORAGE_CONNECTION_STRING.'
      };
    }

    try {
      // Gerar nome único para o arquivo
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const blobName = `avaliacao_${uniqueSuffix}_${sanitizedName}`;

      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      // Upload do arquivo
      const uploadResponse = await blockBlobClient.upload(buffer, buffer.length, {
        blobHTTPHeaders: {
          blobContentType: contentType
        }
      });

      // Retornar URL do arquivo
      const fileUrl = blockBlobClient.url;
      
      return {
        success: true,
        url: fileUrl,
        blobName: blobName,
        size: buffer.length,
        uploadResponse
      };

    } catch (error) {
      console.error('❌ Erro ao fazer upload para Azure:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteFile(blobName) {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      const deleteResponse = await blockBlobClient.delete();
      
      return {
        success: true,
        deleteResponse
      };
    } catch (error) {
      console.error('Erro ao deletar arquivo do Azure:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getFileUrl(blobName) {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      return blockBlobClient.url;
    } catch (error) {
      console.error('Erro ao obter URL do arquivo:', error);
      return null;
    }
  }

  // Método para gerar URL com SAS token (acesso temporário)
  async generateSasUrl(blobName, expiryMinutes = 60) {
    try {
      const { BlobSASPermissions, generateBlobSASQueryParameters, StorageSharedKeyCredential } = require('@azure/storage-blob');
      
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      
      // Extrair credenciais da connection string
      const accountName = this.connectionString.match(/AccountName=([^;]+)/)[1];
      const accountKey = this.connectionString.match(/AccountKey=([^;]+)/)[1];
      
      const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
      
      const sasOptions = {
        containerName: this.containerName,
        blobName: blobName,
        permissions: BlobSASPermissions.parse('r'), // read permission
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + expiryMinutes * 60 * 1000)
      };

      const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
      
      return `${blockBlobClient.url}?${sasToken}`;
    } catch (error) {
      console.error('Erro ao gerar SAS URL:', error);
      return blockBlobClient.url; // Fallback para URL pública
    }
  }
}

module.exports = new AzureStorageService();