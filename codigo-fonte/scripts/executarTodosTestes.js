const { exec } = require('child_process');
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

function runCommand(command, description) {
    return new Promise((resolve, reject) => {
        log(`\n🔍 ${description}`, 'blue');
        log(`   Executando: ${command}`, 'yellow');
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                log(`❌ Erro: ${error.message}`, 'red');
                resolve(false);
                return;
            }
            
            if (stderr) {
                log(`⚠️  Aviso: ${stderr}`, 'yellow');
            }
            
            if (stdout) {
                log(`✅ Saída: ${stdout.trim()}`, 'green');
            }
            
            resolve(true);
        });
    });
}

async function checkServices() {
    log('🔍 VERIFICANDO SERVIÇOS', 'bold');
    log('=' * 30, 'blue');
    
    const results = [];
    
    // Verificar backend
    results.push(await runCommand(
        'curl -s http://localhost:3000',
        'Verificando backend (porta 3000)'
    ));
    
    // Verificar frontend
    results.push(await runCommand(
        'curl -s http://localhost:5173',
        'Verificando frontend (porta 5173)'
    ));
    
    return results.every(r => r);
}

async function runAutomatedTests() {
    log('\n🧪 EXECUTANDO TESTES AUTOMATIZADOS', 'bold');
    log('=' * 40, 'blue');
    
    const results = [];
    
    // Teste de configuração
    results.push(await runCommand(
        'node scripts/configurarTeste.js',
        'Verificando configuração do ambiente'
    ));
    
    // Teste automatizado básico
    results.push(await runCommand(
        'node scripts/testeAutomatizado.js',
        'Executando testes automatizados básicos'
    ));
    
    return results.every(r => r);
}

async function runCRUDTests() {
    log('\n📝 EXECUTANDO TESTES CRUD', 'bold');
    log('=' * 30, 'blue');
    
    const result = await runCommand(
        'node scripts/testeCRUD.js',
        'Executando testes CRUD da API'
    );
    
    return result;
}

async function generateReport() {
    log('\n📊 GERANDO RELATÓRIO DE TESTES', 'bold');
    log('=' * 35, 'blue');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = `relatorio-teste-${timestamp}.txt`;
    
    const report = `
RELATÓRIO DE TESTES - SISTEMA DE AVALIAÇÕES FÍSICAS
==================================================
Data: ${new Date().toLocaleString('pt-BR')}
Ambiente: Desenvolvimento

TESTES EXECUTADOS:
- Verificação de serviços (Backend/Frontend)
- Testes automatizados básicos
- Testes CRUD da API
- Validações de dados
- Testes de conectividade

PRÓXIMOS PASSOS:
1. Teste manual no navegador
2. Validação da interface de usuário
3. Teste de responsividade
4. Validação de segurança

DOCUMENTAÇÃO:
- Plano completo: docs/PlanoTesteAvaliacoesFisicas.md
- Teste rápido: TESTE-RAPIDO.md
- Scripts: scripts/

OBSERVAÇÕES:
- Execute os testes manuais antes do deploy
- Verifique a responsividade em diferentes dispositivos
- Valide as permissões de usuário
- Teste cenários de erro
`;

    require('fs').writeFileSync(reportPath, report);
    log(`✅ Relatório salvo em: ${reportPath}`, 'green');
}

async function main() {
    log('🧪 EXECUTANDO TODOS OS TESTES DO SISTEMA DE AVALIAÇÕES FÍSICAS', 'bold');
    log('=' * 70, 'blue');
    
    const startTime = Date.now();
    const results = [];
    
    try {
        // 1. Verificar serviços
        log('\n📡 ETAPA 1: Verificação de Serviços', 'bold');
        const servicesOk = await checkServices();
        results.push(servicesOk);
        
        if (!servicesOk) {
            log('\n❌ Serviços não estão rodando. Inicie o backend e frontend primeiro.', 'red');
            log('💡 Backend: npm run dev', 'yellow');
            log('💡 Frontend: cd ../zeus-web && npm run dev', 'yellow');
            return;
        }
        
        // 2. Testes automatizados
        log('\n🤖 ETAPA 2: Testes Automatizados', 'bold');
        const automatedOk = await runAutomatedTests();
        results.push(automatedOk);
        
        // 3. Testes CRUD
        log('\n📝 ETAPA 3: Testes CRUD', 'bold');
        const crudOk = await runCRUDTests();
        results.push(crudOk);
        
        // 4. Gerar relatório
        await generateReport();
        
        // Resumo final
        const endTime = Date.now();
        const duration = Math.round((endTime - startTime) / 1000);
        
        log('\n📊 RESUMO FINAL', 'bold');
        log('=' * 20, 'blue');
        
        const passedTests = results.filter(r => r).length;
        const totalTests = results.length;
        
        log(`⏱️  Tempo total: ${duration}s`, 'blue');
        log(`✅ Testes aprovados: ${passedTests}/${totalTests}`, 'green');
        
        if (passedTests === totalTests) {
            log('\n🎉 TODOS OS TESTES AUTOMATIZADOS PASSARAM!', 'green');
            log('✅ Sistema pronto para testes manuais', 'green');
            log('\n📋 Próximos passos:', 'blue');
            log('   1. Teste manual no navegador', 'yellow');
            log('   2. Valide a interface de usuário', 'yellow');
            log('   3. Teste em diferentes dispositivos', 'yellow');
            log('   4. Execute o plano de teste completo', 'yellow');
        } else {
            log('\n⚠️  ALGUNS TESTES FALHARAM', 'red');
            log('🔧 Corrija os problemas antes de prosseguir', 'yellow');
        }
        
        log('\n📚 Documentação completa: docs/PlanoTesteAvaliacoesFisicas.md', 'blue');
        
    } catch (error) {
        log(`\n❌ Erro durante execução dos testes: ${error.message}`, 'red');
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = main;


