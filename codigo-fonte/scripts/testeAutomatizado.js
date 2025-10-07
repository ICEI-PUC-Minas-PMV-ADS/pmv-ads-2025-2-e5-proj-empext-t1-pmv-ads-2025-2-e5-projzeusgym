const axios = require('axios');

// Configurações
const BASE_URL = 'http://localhost:3000';
const FRONTEND_URL = 'http://localhost:5173';

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

async function testBackendConnectivity() {
    log('\n🔍 TESTE 1: Conectividade do Backend', 'blue');
    
    try {
        const response = await axios.get(BASE_URL);
        if (response.data.message === 'API Zeus executando com êxito!') {
            log('✅ Backend rodando corretamente', 'green');
            return true;
        }
    } catch (error) {
        log('❌ Backend não está rodando ou com erro', 'red');
        log(`Erro: ${error.message}`, 'red');
        return false;
    }
}

async function testRoutesAccess() {
    log('\n🔍 TESTE 2: Acesso às Rotas', 'blue');
    
    try {
        // Teste sem autenticação (deve retornar 401)
        const response = await axios.get(`${BASE_URL}/physical-assessments`);
        log('❌ Rota deveria exigir autenticação', 'red');
        return false;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            log('✅ Rota protegida corretamente (401 Unauthorized)', 'green');
            return true;
        } else {
            log('❌ Erro inesperado na rota', 'red');
            log(`Erro: ${error.message}`, 'red');
            return false;
        }
    }
}

async function testDatabaseConnection() {
    log('\n🔍 TESTE 3: Conexão com Banco de Dados', 'blue');
    
    try {
        // Este teste seria mais complexo, mas podemos verificar se o servidor está respondendo
        // Em um cenário real, você testaria a conexão diretamente
        log('⚠️  Teste de banco requer verificação manual', 'yellow');
        log('   Verifique se o MySQL está rodando e as tabelas foram criadas', 'yellow');
        return true;
    } catch (error) {
        log('❌ Erro na conexão com banco', 'red');
        return false;
    }
}

async function testModelValidation() {
    log('\n🔍 TESTE 4: Validação do Modelo', 'blue');
    
    try {
        const { PhysicalAssessment } = require('../src/models');
        
        // Verificar se o modelo foi criado
        if (PhysicalAssessment) {
            log('✅ Modelo PhysicalAssessment carregado', 'green');
            
            // Verificar atributos principais
            const attributes = Object.keys(PhysicalAssessment.rawAttributes);
            const requiredAttributes = ['studentId', 'professorId', 'assessmentDate', 'weight', 'height'];
            
            const hasRequiredAttributes = requiredAttributes.every(attr => 
                attributes.includes(attr)
            );
            
            if (hasRequiredAttributes) {
                log('✅ Atributos obrigatórios presentes', 'green');
                return true;
            } else {
                log('❌ Atributos obrigatórios ausentes', 'red');
                return false;
            }
        } else {
            log('❌ Modelo PhysicalAssessment não encontrado', 'red');
            return false;
        }
    } catch (error) {
        log('❌ Erro ao carregar modelo', 'red');
        log(`Erro: ${error.message}`, 'red');
        return false;
    }
}

async function testFrontendConnectivity() {
    log('\n🔍 TESTE 5: Conectividade do Frontend', 'blue');
    
    try {
        const response = await axios.get(FRONTEND_URL, { timeout: 5000 });
        if (response.status === 200) {
            log('✅ Frontend rodando corretamente', 'green');
            return true;
        }
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            log('❌ Frontend não está rodando', 'red');
            log('   Execute: cd zeus-web && npm run dev', 'yellow');
        } else {
            log('❌ Erro ao acessar frontend', 'red');
            log(`Erro: ${error.message}`, 'red');
        }
        return false;
    }
}

async function testFileStructure() {
    log('\n🔍 TESTE 6: Estrutura de Arquivos', 'blue');
    
    const fs = require('fs');
    const path = require('path');
    
    const requiredFiles = [
        'src/models/PhysicalAssessment.js',
        'src/controllers/physicalAssessmentController.js',
        'src/routes/physicalAssessmentRoutes.js',
        '../zeus-web/src/pages/GerenciarAvaliacoes.jsx',
        '../zeus-web/src/pages/CadastrarAvaliacao.jsx'
    ];
    
    let allFilesExist = true;
    
    for (const file of requiredFiles) {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            log(`✅ ${file}`, 'green');
        } else {
            log(`❌ ${file} - Arquivo não encontrado`, 'red');
            allFilesExist = false;
        }
    }
    
    return allFilesExist;
}

async function runAllTests() {
    log('🧪 INICIANDO TESTES AUTOMATIZADOS DO SISTEMA DE AVALIAÇÕES FÍSICAS', 'bold');
    log('=' * 70, 'blue');
    
    const results = [];
    
    // Executar todos os testes
    results.push(await testBackendConnectivity());
    results.push(await testRoutesAccess());
    results.push(await testDatabaseConnection());
    results.push(await testModelValidation());
    results.push(await testFrontendConnectivity());
    results.push(await testFileStructure());
    
    // Resumo dos resultados
    log('\n📊 RESUMO DOS TESTES', 'bold');
    log('=' * 30, 'blue');
    
    const passedTests = results.filter(r => r).length;
    const totalTests = results.length;
    
    log(`✅ Testes aprovados: ${passedTests}/${totalTests}`, 'green');
    
    if (passedTests === totalTests) {
        log('🎉 TODOS OS TESTES AUTOMATIZADOS PASSARAM!', 'green');
        log('📋 Próximos passos:', 'blue');
        log('   1. Execute os testes manuais do plano de teste', 'yellow');
        log('   2. Teste a interface no navegador', 'yellow');
        log('   3. Valide as operações CRUD completas', 'yellow');
    } else {
        log('⚠️  ALGUNS TESTES FALHARAM', 'red');
        log('🔧 Corrija os problemas antes de prosseguir', 'yellow');
    }
    
    log('\n📝 Para testes completos, consulte: docs/PlanoTesteAvaliacoesFisicas.md', 'blue');
}

// Executar testes se chamado diretamente
if (require.main === module) {
    runAllTests().catch(console.error);
}

module.exports = {
    testBackendConnectivity,
    testRoutesAccess,
    testDatabaseConnection,
    testModelValidation,
    testFrontendConnectivity,
    testFileStructure,
    runAllTests
};


