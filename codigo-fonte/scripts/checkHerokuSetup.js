const azureStorage = require('../src/config/azureStorage');
require('dotenv').config();

async function checkHerokuSetup() {
  console.log('🔍 Verificando configuração para Heroku...\n');

  // Verificar variáveis de ambiente essenciais
  const requiredEnvVars = [
    'JWT_SECRET',
    'ADMIN_LOGIN', 
    'ADMIN_PASSWORD'
  ];

  const optionalEnvVars = [
    'AZURE_STORAGE_CONNECTION_STRING',
    'AZURE_CONTAINER_NAME',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];

  console.log('📋 Variáveis de ambiente obrigatórias:');
  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅' : '❌';
    console.log(`  ${status} ${varName}: ${value ? 'Definida' : 'NÃO DEFINIDA'}`);
  });

  console.log('\n📋 Variáveis de ambiente opcionais:');
  optionalEnvVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅' : '⚠️';
    console.log(`  ${status} ${varName}: ${value ? 'Definida' : 'Não definida'}`);
  });

  // Verificar Azure Storage
  console.log('\n☁️  Azure Storage:');
  if (azureStorage.isConfigured) {
    console.log('  ✅ Configurado corretamente');
    
    try {
      const containerResult = await azureStorage.initializeContainer();
      if (containerResult) {
        console.log('  ✅ Container acessível');
      } else {
        console.log('  ⚠️  Container não pôde ser verificado');
      }
    } catch (error) {
      console.log('  ❌ Erro ao acessar container:', error.message);
    }
  } else {
    console.log('  ⚠️  Não configurado (upload de arquivos não funcionará)');
  }

  // Verificar dependências
  console.log('\n📦 Dependências críticas:');
  const criticalPackages = [
    '@azure/storage-blob',
    'sequelize',
    'mysql2',
    'express',
    'multer'
  ];

  criticalPackages.forEach(packageName => {
    try {
      require(packageName);
      console.log(`  ✅ ${packageName}: Instalado`);
    } catch (error) {
      console.log(`  ❌ ${packageName}: NÃO INSTALADO`);
    }
  });

  // Resumo e recomendações
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMO DA CONFIGURAÇÃO');
  console.log('='.repeat(50));

  const azureConfigured = azureStorage.isConfigured;
  const hasJwtSecret = !!process.env.JWT_SECRET;
  const hasAdminCreds = !!(process.env.ADMIN_LOGIN && process.env.ADMIN_PASSWORD);

  if (hasJwtSecret && hasAdminCreds) {
    console.log('✅ Configuração básica: OK');
  } else {
    console.log('❌ Configuração básica: INCOMPLETA');
  }

  if (azureConfigured) {
    console.log('✅ Upload de arquivos: FUNCIONARÁ');
  } else {
    console.log('⚠️  Upload de arquivos: NÃO FUNCIONARÁ');
  }

  console.log('\n💡 Próximos passos para Heroku:');
  
  if (!hasJwtSecret) {
    console.log('1. Definir JWT_SECRET no Heroku');
  }
  
  if (!hasAdminCreds) {
    console.log('2. Definir ADMIN_LOGIN e ADMIN_PASSWORD no Heroku');
  }
  
  if (!azureConfigured) {
    console.log('3. Configurar Azure Storage no Heroku (opcional mas recomendado)');
  }
  
  console.log('4. Fazer deploy: git push heroku main');
  console.log('5. Verificar logs: heroku logs --tail -a sua-app');

  console.log('\n🔗 Links úteis:');
  console.log('- Heroku Dashboard: https://dashboard.heroku.com');
  console.log('- Azure Portal: https://portal.azure.com');
  console.log('- Documentação completa: ./HEROKU_SETUP.md');
  
  console.log('\n🎯 Status geral:', 
    (hasJwtSecret && hasAdminCreds) ? 
    (azureConfigured ? '🟢 PRONTO PARA PRODUÇÃO' : '🟡 FUNCIONAL (sem upload)') : 
    '🔴 REQUER CONFIGURAÇÃO'
  );
}

// Executar verificação se este arquivo for executado diretamente
if (require.main === module) {
  checkHerokuSetup().catch(console.error);
}

module.exports = { checkHerokuSetup };