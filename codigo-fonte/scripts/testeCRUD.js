const axios = require('axios');

// Configurações
const BASE_URL = 'http://localhost:3000';

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

class CRUDTester {
    constructor() {
        this.token = null;
        this.createdAssessmentId = null;
    }

    async login() {
        log('\n🔐 FAZENDO LOGIN...', 'blue');
        
        try {
            // Substitua pelas credenciais de um professor válido
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                email: 'professor@teste.com', // Altere para um email válido
                password: '123456' // Altere para uma senha válida
            });
            
            this.token = response.data.token;
            log('✅ Login realizado com sucesso', 'green');
            return true;
        } catch (error) {
            log('❌ Erro no login', 'red');
            log(`Erro: ${error.response?.data?.error || error.message}`, 'red');
            log('💡 Verifique se existe um professor cadastrado com essas credenciais', 'yellow');
            return false;
        }
    }

    async createAssessment() {
        log('\n📝 TESTE: Criar Avaliação Física', 'blue');
        
        try {
            const assessmentData = {
                studentId: 1, // Altere para um ID de aluno válido
                assessmentDate: '2024-01-15',
                weight: 70.5,
                height: 175.0,
                bodyFat: 15.2,
                muscleMass: 45.0,
                chest: 95.0,
                waist: 80.0,
                hip: 90.0,
                arm: 32.0,
                thigh: 55.0,
                calf: 35.0,
                neck: 38.0,
                observations: 'Aluno em boa forma física - teste automatizado'
            };

            const response = await axios.post(`${BASE_URL}/physical-assessments`, assessmentData, {
                headers: { Authorization: `Bearer ${this.token}` }
            });

            this.createdAssessmentId = response.data.assessment.id;
            log('✅ Avaliação criada com sucesso', 'green');
            log(`   ID: ${this.createdAssessmentId}`, 'blue');
            return true;
        } catch (error) {
            log('❌ Erro ao criar avaliação', 'red');
            log(`Erro: ${error.response?.data?.error || error.message}`, 'red');
            return false;
        }
    }

    async listAssessments() {
        log('\n📋 TESTE: Listar Avaliações', 'blue');
        
        try {
            const response = await axios.get(`${BASE_URL}/physical-assessments`, {
                headers: { Authorization: `Bearer ${this.token}` }
            });

            log(`✅ Listagem bem-sucedida - ${response.data.length} avaliações encontradas`, 'green');
            
            if (response.data.length > 0) {
                const assessment = response.data[0];
                log(`   Primeira avaliação: ${assessment.student?.name || 'N/A'} - ${assessment.assessmentDate}`, 'blue');
            }
            
            return true;
        } catch (error) {
            log('❌ Erro ao listar avaliações', 'red');
            log(`Erro: ${error.response?.data?.error || error.message}`, 'red');
            return false;
        }
    }

    async getAssessmentById() {
        log('\n🔍 TESTE: Buscar Avaliação por ID', 'blue');
        
        if (!this.createdAssessmentId) {
            log('⚠️  Nenhuma avaliação criada para buscar', 'yellow');
            return false;
        }
        
        try {
            const response = await axios.get(`${BASE_URL}/physical-assessments/${this.createdAssessmentId}`, {
                headers: { Authorization: `Bearer ${this.token}` }
            });

            log('✅ Avaliação encontrada com sucesso', 'green');
            log(`   Aluno: ${response.data.student?.name || 'N/A'}`, 'blue');
            log(`   Data: ${response.data.assessmentDate}`, 'blue');
            log(`   Peso: ${response.data.weight}kg`, 'blue');
            
            return true;
        } catch (error) {
            log('❌ Erro ao buscar avaliação', 'red');
            log(`Erro: ${error.response?.data?.error || error.message}`, 'red');
            return false;
        }
    }

    async updateAssessment() {
        log('\n✏️  TESTE: Atualizar Avaliação', 'blue');
        
        if (!this.createdAssessmentId) {
            log('⚠️  Nenhuma avaliação criada para atualizar', 'yellow');
            return false;
        }
        
        try {
            const updateData = {
                weight: 72.0,
                observations: 'Peso atualizado após 1 mês - teste automatizado'
            };

            const response = await axios.put(`${BASE_URL}/physical-assessments/${this.createdAssessmentId}`, updateData, {
                headers: { Authorization: `Bearer ${this.token}` }
            });

            log('✅ Avaliação atualizada com sucesso', 'green');
            log(`   Novo peso: ${response.data.assessment.weight}kg`, 'blue');
            
            return true;
        } catch (error) {
            log('❌ Erro ao atualizar avaliação', 'red');
            log(`Erro: ${error.response?.data?.error || error.message}`, 'red');
            return false;
        }
    }

    async testValidations() {
        log('\n🛡️  TESTE: Validações de Dados', 'blue');
        
        const testCases = [
            {
                name: 'Peso negativo',
                data: { studentId: 1, assessmentDate: '2024-01-16', weight: -10 },
                shouldFail: true
            },
            {
                name: '% Gordura > 100',
                data: { studentId: 1, assessmentDate: '2024-01-17', bodyFat: 150 },
                shouldFail: true
            },
            {
                name: 'Dados válidos',
                data: { studentId: 1, assessmentDate: '2024-01-18', weight: 70, height: 175 },
                shouldFail: false
            }
        ];

        let passedTests = 0;

        for (const testCase of testCases) {
            try {
                await axios.post(`${BASE_URL}/physical-assessments`, testCase.data, {
                    headers: { Authorization: `Bearer ${this.token}` }
                });

                if (testCase.shouldFail) {
                    log(`❌ ${testCase.name} - Deveria ter falhado mas passou`, 'red');
                } else {
                    log(`✅ ${testCase.name} - Passou como esperado`, 'green');
                    passedTests++;
                }
            } catch (error) {
                if (testCase.shouldFail) {
                    log(`✅ ${testCase.name} - Falhou como esperado`, 'green');
                    passedTests++;
                } else {
                    log(`❌ ${testCase.name} - Deveria ter passado mas falhou`, 'red');
                    log(`   Erro: ${error.response?.data?.error || error.message}`, 'red');
                }
            }
        }

        return passedTests === testCases.length;
    }

    async deleteAssessment() {
        log('\n🗑️  TESTE: Excluir Avaliação', 'blue');
        
        if (!this.createdAssessmentId) {
            log('⚠️  Nenhuma avaliação criada para excluir', 'yellow');
            return false;
        }
        
        try {
            await axios.delete(`${BASE_URL}/physical-assessments/${this.createdAssessmentId}`, {
                headers: { Authorization: `Bearer ${this.token}` }
            });

            log('✅ Avaliação excluída com sucesso', 'green');
            
            // Verificar se foi realmente excluída
            try {
                await axios.get(`${BASE_URL}/physical-assessments/${this.createdAssessmentId}`, {
                    headers: { Authorization: `Bearer ${this.token}` }
                });
                log('❌ Avaliação ainda existe após exclusão', 'red');
                return false;
            } catch (error) {
                if (error.response?.status === 404) {
                    log('✅ Confirmação: Avaliação foi realmente excluída', 'green');
                    return true;
                } else {
                    log('⚠️  Erro inesperado ao verificar exclusão', 'yellow');
                    return true;
                }
            }
        } catch (error) {
            log('❌ Erro ao excluir avaliação', 'red');
            log(`Erro: ${error.response?.data?.error || error.message}`, 'red');
            return false;
        }
    }

    async runAllTests() {
        log('🧪 INICIANDO TESTES CRUD DE AVALIAÇÕES FÍSICAS', 'bold');
        log('=' * 60, 'blue');
        
        const results = [];
        
        // Login primeiro
        if (!(await this.login())) {
            log('❌ Não foi possível fazer login. Testes abortados.', 'red');
            log('💡 Verifique se existe um professor cadastrado no sistema', 'yellow');
            return;
        }
        
        // Executar testes CRUD
        results.push(await this.createAssessment());
        results.push(await this.listAssessments());
        results.push(await this.getAssessmentById());
        results.push(await this.updateAssessment());
        results.push(await this.testValidations());
        results.push(await this.deleteAssessment());
        
        // Resumo
        log('\n📊 RESUMO DOS TESTES CRUD', 'bold');
        log('=' * 30, 'blue');
        
        const passedTests = results.filter(r => r).length;
        const totalTests = results.length;
        
        log(`✅ Testes aprovados: ${passedTests}/${totalTests}`, 'green');
        
        if (passedTests === totalTests) {
            log('🎉 TODOS OS TESTES CRUD PASSARAM!', 'green');
            log('✅ Sistema de avaliações físicas está funcionando corretamente', 'green');
        } else {
            log('⚠️  ALGUNS TESTES CRUD FALHARAM', 'red');
            log('🔧 Verifique os erros acima antes de prosseguir', 'yellow');
        }
    }
}

// Executar testes se chamado diretamente
if (require.main === module) {
    const tester = new CRUDTester();
    tester.runAllTests().catch(console.error);
}

module.exports = CRUDTester;


