const fs = require('fs');
const path = require('path');

// Cores para output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function createTestConfig() {
    log('🔧 CONFIGURANDO AMBIENTE DE TESTE', 'bold');
    log('=' * 40, 'blue');
    
    // Verificar se estamos no diretório correto
    const currentDir = process.cwd();
    const isBackendDir = fs.existsSync(path.join(currentDir, 'src', 'app.js'));
    
    if (!isBackendDir) {
        log('❌ Execute este script a partir do diretório codigo-fonte/', 'red');
        log(`   Diretório atual: ${currentDir}`, 'yellow');
        return false;
    }
    
    log('✅ Diretório correto detectado', 'green');
    
    // Verificar dependências
    log('\n📦 Verificando dependências...', 'blue');
    
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        log('❌ package.json não encontrado', 'red');
        return false;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const requiredDeps = ['express', 'sequelize', 'mysql2', 'jsonwebtoken'];
    
    let allDepsPresent = true;
    for (const dep of requiredDeps) {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            log(`✅ ${dep}`, 'green');
        } else {
            log(`❌ ${dep} - não encontrado`, 'red');
            allDepsPresent = false;
        }
    }
    
    if (!allDepsPresent) {
        log('\n💡 Execute: npm install', 'yellow');
        return false;
    }
    
    // Verificar arquivos de configuração
    log('\n📁 Verificando arquivos de configuração...', 'blue');
    
    const configFiles = [
        'src/config/database.js',
        'src/models/PhysicalAssessment.js',
        'src/controllers/physicalAssessmentController.js',
        'src/routes/physicalAssessmentRoutes.js'
    ];
    
    let allFilesPresent = true;
    for (const file of configFiles) {
        const filePath = path.join(currentDir, file);
        if (fs.existsSync(filePath)) {
            log(`✅ ${file}`, 'green');
        } else {
            log(`❌ ${file} - não encontrado`, 'red');
            allFilesPresent = false;
        }
    }
    
    if (!allFilesPresent) {
        log('\n💡 Verifique se todos os arquivos foram criados corretamente', 'yellow');
        return false;
    }
    
    // Verificar variáveis de ambiente
    log('\n🔐 Verificando variáveis de ambiente...', 'blue');
    
    const envPath = path.join(currentDir, '.env');
    if (fs.existsSync(envPath)) {
        log('✅ Arquivo .env encontrado', 'green');
        
        const envContent = fs.readFileSync(envPath, 'utf8');
        const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
        
        let allEnvVarsPresent = true;
        for (const envVar of requiredEnvVars) {
            if (envContent.includes(envVar)) {
                log(`✅ ${envVar}`, 'green');
            } else {
                log(`❌ ${envVar} - não encontrado`, 'red');
                allEnvVarsPresent = false;
            }
        }
        
        if (!allEnvVarsPresent) {
            log('\n💡 Configure as variáveis de ambiente no arquivo .env', 'yellow');
            return false;
        }
    } else {
        log('❌ Arquivo .env não encontrado', 'red');
        log('💡 Crie um arquivo .env com as configurações do banco de dados', 'yellow');
        return false;
    }
    
    // Verificar frontend
    log('\n🌐 Verificando frontend...', 'blue');
    
    const frontendDir = path.join(currentDir, '..', 'zeus-web');
    if (fs.existsSync(frontendDir)) {
        log('✅ Diretório zeus-web encontrado', 'green');
        
        const frontendFiles = [
            'src/pages/GerenciarAvaliacoes.jsx',
            'src/pages/CadastrarAvaliacao.jsx',
            'src/App.jsx'
        ];
        
        let frontendFilesPresent = true;
        for (const file of frontendFiles) {
            const filePath = path.join(frontendDir, file);
            if (fs.existsSync(filePath)) {
                log(`✅ ${file}`, 'green');
            } else {
                log(`❌ ${file} - não encontrado`, 'red');
                frontendFilesPresent = false;
            }
        }
        
        if (!frontendFilesPresent) {
            log('\n💡 Verifique se os arquivos do frontend foram criados', 'yellow');
            return false;
        }
    } else {
        log('❌ Diretório zeus-web não encontrado', 'red');
        return false;
    }
    
    // Criar script de teste rápido
    log('\n📝 Criando script de teste rápido...', 'blue');
    
    const quickTestScript = `#!/bin/bash

echo "🧪 TESTE RÁPIDO DO SISTEMA DE AVALIAÇÕES FÍSICAS"
echo "================================================"

# Verificar se o backend está rodando
echo "🔍 Verificando backend..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Backend rodando"
else
    echo "❌ Backend não está rodando"
    echo "💡 Execute: npm run dev"
    exit 1
fi

# Verificar se o frontend está rodando
echo "🔍 Verificando frontend..."
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Frontend rodando"
else
    echo "❌ Frontend não está rodando"
    echo "💡 Execute: cd ../zeus-web && npm run dev"
    exit 1
fi

echo "🎉 Ambiente configurado corretamente!"
echo "📋 Próximos passos:"
echo "   1. Execute: node scripts/testeAutomatizado.js"
echo "   2. Execute: node scripts/testeCRUD.js"
echo "   3. Teste manual no navegador"
`;

    const scriptPath = path.join(currentDir, 'teste-rapido.sh');
    fs.writeFileSync(scriptPath, quickTestScript);
    fs.chmodSync(scriptPath, '755');
    
    log('✅ Script de teste rápido criado: teste-rapido.sh', 'green');
    
    // Resumo final
    log('\n🎉 CONFIGURAÇÃO CONCLUÍDA!', 'bold');
    log('=' * 30, 'green');
    
    log('📋 Próximos passos:', 'blue');
    log('   1. Inicie o backend: npm run dev', 'yellow');
    log('   2. Inicie o frontend: cd ../zeus-web && npm run dev', 'yellow');
    log('   3. Execute os testes: ./teste-rapido.sh', 'yellow');
    log('   4. Execute testes detalhados: node scripts/testeAutomatizado.js', 'yellow');
    log('   5. Execute testes CRUD: node scripts/testeCRUD.js', 'yellow');
    
    log('\n📚 Documentação completa: docs/PlanoTesteAvaliacoesFisicas.md', 'blue');
    
    return true;
}

// Executar se chamado diretamente
if (require.main === module) {
    createTestConfig();
}

module.exports = createTestConfig;


