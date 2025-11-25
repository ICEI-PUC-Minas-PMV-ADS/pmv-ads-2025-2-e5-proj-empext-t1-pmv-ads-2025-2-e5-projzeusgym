const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Configuração da conexão com o banco
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log
  }
);

async function addAzureStorageColumns() {
  try {
    // Verificar conexão
    await sequelize.authenticate();
    console.log('Conexão com banco de dados estabelecida.');

    // Verificar se as colunas já existem
    const queryInterface = sequelize.getQueryInterface();
    const tableDescription = await queryInterface.describeTable('physical_assessments');

    // Adicionar coluna fileUrl se não existir
    if (!tableDescription.fileUrl) {
      await queryInterface.addColumn('physical_assessments', 'fileUrl', {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'URL do arquivo no Azure Blob Storage'
      });
      console.log('Coluna fileUrl adicionada com sucesso');
    } else {
      console.log('Coluna fileUrl já existe');
    }

    // Adicionar coluna blobName se não existir
    if (!tableDescription.blobName) {
      await queryInterface.addColumn('physical_assessments', 'blobName', {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Nome do blob no Azure Storage'
      });
      console.log('Coluna blobName adicionada com sucesso');
    } else {
      console.log('Coluna blobName já existe');
    }

    // Adicionar comentário à coluna filePath se necessário
    if (tableDescription.filePath && !tableDescription.filePath.comment) {
      await queryInterface.changeColumn('physical_assessments', 'filePath', {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Caminho local (deprecated - usar fileUrl)'
      });
      console.log('Comentário adicionado à coluna filePath');
    }

    console.log('Migração concluída com sucesso!');
    
  } catch (error) {
    console.error('Erro durante a migração:', error);
  } finally {
    await sequelize.close();
  }
}

// Executar migração se este arquivo for executado diretamente
if (require.main === module) {
  addAzureStorageColumns();
}

module.exports = { addAzureStorageColumns };