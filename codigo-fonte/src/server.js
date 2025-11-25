const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const db = require('./models/index');
const azureStorage = require('./config/azureStorage');

// Inicializar Azure Storage e sincronizar banco de dados
const syncDatabase = async () => {
  try {
    // Tentar uma sincronização simples primeiro
    await db.sequelize.sync({ alter: false });
    console.log('🔄 Sincronização simples bem-sucedida');
    return true;
  } catch (error) {
    console.warn('⚠️  Sincronização simples falhou, tentando sem alterações:', error.message);
    try {
      // Se falhar, tentar apenas autenticar
      await db.sequelize.authenticate();
      console.log('🔗 Conexão com banco validada');
      return true;
    } catch (authError) {
      console.error('❌ Falha na conexão com banco:', authError.message);
      throw authError;
    }
  }
};

Promise.all([
  syncDatabase(),
  azureStorage.initializeContainer().catch(err => {
    console.warn('⚠️  Azure Storage não pôde ser inicializado:', err.message);
    return false; // Continuar mesmo se Azure falhar
  })
])
  .then(([dbResult, azureResult]) => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📊 Banco de dados: ${dbResult ? '✅ Conectado' : '❌ Erro'}`);
      console.log(`☁️  Azure Storage: ${azureResult ? '✅ Configurado' : '⚠️  Não configurado'}`);
      
      if (!azureResult) {
        console.log('💡 Para habilitar upload de arquivos, configure AZURE_STORAGE_CONNECTION_STRING');
      }
    });
  })
  .catch((err) => {
    console.error('❌ Erro crítico durante a inicialização:', err);
    process.exit(1);
  });