# 📋 Plano de Teste - Sistema de Avaliações Físicas (FR-07)

## 🎯 Objetivo
Validar todas as funcionalidades do CRUD de avaliações físicas antes do deploy, garantindo que o sistema está funcionando corretamente em todos os cenários.

## 🛠️ Pré-requisitos para Teste

### Ambiente de Desenvolvimento
- [ ] Backend rodando na porta 3000
- [ ] Frontend rodando na porta 5173 (Vite)
- [ ] Banco de dados MySQL configurado
- [ ] Pelo menos 1 professor e 2 alunos cadastrados no sistema

### Dados de Teste Necessários
- [ ] Professor com credenciais válidas
- [ ] 2+ alunos cadastrados no sistema
- [ ] Token de autenticação válido

## 🧪 Cenários de Teste

### 1. TESTE DE CONECTIVIDADE E AMBIENTE

#### 1.1 Verificar Backend
```bash
# Teste 1.1.1 - Servidor rodando
curl http://localhost:3000
# Esperado: {"message":"API Zeus executando com êxito!"}

# Teste 1.1.2 - Rotas de avaliação acessíveis
curl -X GET http://localhost:3000/physical-assessments
# Esperado: 401 Unauthorized (sem token)
```

#### 1.2 Verificar Frontend
```bash
# Teste 1.2.1 - Aplicação carregando
# Acessar: http://localhost:5173
# Esperado: Página de login carrega sem erros
```

### 2. TESTE DE AUTENTICAÇÃO

#### 2.1 Login como Professor
- [ ] **Passo:** Fazer login com credenciais de professor
- [ ] **Esperado:** Login bem-sucedido, redirecionamento para dashboard
- [ ] **Verificar:** Token salvo no localStorage

#### 2.2 Acesso às Rotas Protegidas
- [ ] **Passo:** Tentar acessar `/avaliacoes` sem login
- [ ] **Esperado:** Redirecionamento para página de login
- [ ] **Passo:** Acessar `/avaliacoes` após login
- [ ] **Esperado:** Página carrega normalmente

### 3. TESTE DO BACKEND (API)

#### 3.1 Criar Avaliação Física
```bash
# Teste 3.1.1 - Criar avaliação válida
curl -X POST http://localhost:3000/physical-assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "studentId": 1,
    "assessmentDate": "2024-01-15",
    "weight": 70.5,
    "height": 175.0,
    "bodyFat": 15.2,
    "muscleMass": 45.0,
    "chest": 95.0,
    "waist": 80.0,
    "hip": 90.0,
    "arm": 32.0,
    "thigh": 55.0,
    "calf": 35.0,
    "neck": 38.0,
    "observations": "Aluno em boa forma física"
  }'
# Esperado: 201 Created com dados da avaliação
```

#### 3.2 Listar Avaliações
```bash
# Teste 3.2.1 - Listar todas as avaliações
curl -X GET http://localhost:3000/physical-assessments \
  -H "Authorization: Bearer SEU_TOKEN"
# Esperado: 200 OK com array de avaliações

# Teste 3.2.2 - Filtrar por aluno
curl -X GET "http://localhost:3000/physical-assessments?studentId=1" \
  -H "Authorization: Bearer SEU_TOKEN"
# Esperado: 200 OK com avaliações do aluno específico
```

#### 3.3 Buscar Avaliação Específica
```bash
# Teste 3.3.1 - Buscar avaliação existente
curl -X GET http://localhost:3000/physical-assessments/1 \
  -H "Authorization: Bearer SEU_TOKEN"
# Esperado: 200 OK com dados da avaliação

# Teste 3.3.2 - Buscar avaliação inexistente
curl -X GET http://localhost:3000/physical-assessments/999 \
  -H "Authorization: Bearer SEU_TOKEN"
# Esperado: 404 Not Found
```

#### 3.4 Atualizar Avaliação
```bash
# Teste 3.4.1 - Atualizar avaliação existente
curl -X PUT http://localhost:3000/physical-assessments/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "weight": 72.0,
    "observations": "Peso atualizado após 1 mês"
  }'
# Esperado: 200 OK com dados atualizados
```

#### 3.5 Excluir Avaliação
```bash
# Teste 3.5.1 - Excluir avaliação existente
curl -X DELETE http://localhost:3000/physical-assessments/1 \
  -H "Authorization: Bearer SEU_TOKEN"
# Esperado: 200 OK com mensagem de sucesso

# Teste 3.5.2 - Tentar excluir avaliação inexistente
curl -X DELETE http://localhost:3000/physical-assessments/999 \
  -H "Authorization: Bearer SEU_TOKEN"
# Esperado: 404 Not Found
```

#### 3.6 Validações de Negócio
```bash
# Teste 3.6.1 - Tentar criar avaliação duplicada (mesmo aluno, mesma data)
curl -X POST http://localhost:3000/physical-assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "studentId": 1,
    "assessmentDate": "2024-01-15",
    "weight": 70.0
  }'
# Esperado: 400 Bad Request com mensagem de erro

# Teste 3.6.2 - Tentar criar avaliação com dados inválidos
curl -X POST http://localhost:3000/physical-assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "studentId": 1,
    "assessmentDate": "2024-01-15",
    "weight": -10,
    "bodyFat": 150
  }'
# Esperado: 400 Bad Request com mensagem de validação
```

### 4. TESTE DO FRONTEND

#### 4.1 Navegação e Interface
- [ ] **Passo:** Acessar `/avaliacoes` após login
- [ ] **Esperado:** Página carrega com header, botões e lista vazia
- [ ] **Verificar:** Botão "Nova Avaliação" visível e funcional

#### 4.2 Criar Nova Avaliação
- [ ] **Passo:** Clicar em "Nova Avaliação"
- [ ] **Esperado:** Redirecionamento para `/avaliacoes/nova`
- [ ] **Passo:** Preencher formulário com dados válidos
  - Selecionar aluno
  - Definir data da avaliação
  - Preencher pelo menos peso e altura
- [ ] **Esperado:** Formulário aceita os dados
- [ ] **Passo:** Clicar em "Registrar"
- [ ] **Esperado:** Mensagem de sucesso e redirecionamento para lista

#### 4.3 Validações do Formulário
- [ ] **Passo:** Tentar salvar sem selecionar aluno
- [ ] **Esperado:** Mensagem de erro "Por favor, preencha o campo obrigatório: Aluno"
- [ ] **Passo:** Tentar salvar sem definir data
- [ ] **Esperado:** Mensagem de erro "Por favor, preencha o campo obrigatório: Data da avaliação"
- [ ] **Passo:** Tentar salvar sem nenhuma medida
- [ ] **Esperado:** Mensagem de erro "Por favor, preencha pelo menos uma medida corporal"

#### 4.4 Listar Avaliações
- [ ] **Passo:** Voltar para lista de avaliações
- [ ] **Esperado:** Avaliação criada aparece na lista
- [ ] **Verificar:** Dados exibidos corretamente (nome do aluno, data, peso, altura)

#### 4.5 Filtrar Avaliações
- [ ] **Passo:** Digitar nome do aluno no filtro
- [ ] **Esperado:** Lista filtra apenas avaliações do aluno
- [ ] **Passo:** Limpar filtro
- [ ] **Esperado:** Todas as avaliações aparecem novamente

#### 4.6 Editar Avaliação
- [ ] **Passo:** Clicar em "Editar" em uma avaliação
- [ ] **Esperado:** Redirecionamento para `/avaliacoes/editar/ID`
- [ ] **Verificar:** Formulário pré-preenchido com dados existentes
- [ ] **Passo:** Alterar peso e observações
- [ ] **Passo:** Clicar em "Atualizar"
- [ ] **Esperado:** Mensagem de sucesso e redirecionamento

#### 4.7 Excluir Avaliação
- [ ] **Passo:** Clicar em "Excluir" em uma avaliação
- [ ] **Esperado:** Confirmação "Tem certeza que deseja excluir esta avaliação física?"
- [ ] **Passo:** Confirmar exclusão
- [ ] **Esperado:** Mensagem de sucesso e avaliação removida da lista
- [ ] **Passo:** Tentar excluir novamente
- [ ] **Esperado:** Avaliação não aparece mais na lista

### 5. TESTE DE INTEGRAÇÃO

#### 5.1 Fluxo Completo
- [ ] **Passo:** Login → Nova Avaliação → Preencher → Salvar → Listar → Editar → Salvar → Excluir
- [ ] **Esperado:** Todo o fluxo funciona sem erros

#### 5.2 Múltiplos Alunos
- [ ] **Passo:** Criar avaliações para diferentes alunos
- [ ] **Esperado:** Avaliações aparecem separadas na lista
- [ ] **Passo:** Filtrar por aluno específico
- [ ] **Esperado:** Apenas avaliações do aluno selecionado aparecem

#### 5.3 Mesma Data, Alunos Diferentes
- [ ] **Passo:** Criar avaliações na mesma data para alunos diferentes
- [ ] **Esperado:** Ambas as avaliações são criadas com sucesso
- [ ] **Passo:** Tentar criar segunda avaliação para o mesmo aluno na mesma data
- [ ] **Esperado:** Erro "Já existe uma avaliação física para este aluno nesta data"

### 6. TESTE DE RESPONSIVIDADE

#### 6.1 Desktop (1920x1080)
- [ ] **Verificar:** Layout correto, todos os elementos visíveis
- [ ] **Verificar:** Formulário organizado em colunas
- [ ] **Verificar:** Cards de avaliação em grid

#### 6.2 Tablet (768x1024)
- [ ] **Verificar:** Layout adaptado
- [ ] **Verificar:** Formulário em coluna única
- [ ] **Verificar:** Cards empilhados

#### 6.3 Mobile (375x667)
- [ ] **Verificar:** Layout responsivo
- [ ] **Verificar:** Formulário em coluna única
- [ ] **Verificar:** Botões de ação empilhados
- [ ] **Verificar:** Navegação funcional

### 7. TESTE DE PERFORMANCE

#### 7.1 Carregamento Inicial
- [ ] **Medir:** Tempo de carregamento da página de avaliações
- [ ] **Esperado:** < 3 segundos

#### 7.2 Operações CRUD
- [ ] **Medir:** Tempo de criação de avaliação
- [ ] **Esperado:** < 2 segundos
- [ ] **Medir:** Tempo de listagem de avaliações
- [ ] **Esperado:** < 1 segundo

### 8. TESTE DE SEGURANÇA

#### 8.1 Autenticação
- [ ] **Passo:** Tentar acessar API sem token
- [ ] **Esperado:** 401 Unauthorized
- [ ] **Passo:** Tentar acessar com token inválido
- [ ] **Esperado:** 401 Unauthorized

#### 8.2 Autorização
- [ ] **Passo:** Professor A tentar acessar avaliação do Professor B
- [ ] **Esperado:** 404 Not Found ou 403 Forbidden

### 9. TESTE DE DADOS

#### 9.1 Validação de Campos Numéricos
- [ ] **Testar:** Peso negativo
- [ ] **Esperado:** Erro de validação
- [ ] **Testar:** Altura zero
- [ ] **Esperado:** Erro de validação
- [ ] **Testar:** % Gordura > 100
- [ ] **Esperado:** Erro de validação

#### 9.2 Validação de Datas
- [ ] **Testar:** Data futura
- [ ] **Esperado:** Aceita (pode ser avaliação agendada)
- [ ] **Testar:** Data muito antiga (ex: 1900)
- [ ] **Esperado:** Aceita (dados históricos)

## 📊 Checklist de Execução

### Preparação
- [ ] Ambiente configurado
- [ ] Dados de teste criados
- [ ] Ferramentas de teste preparadas (Postman/curl)

### Execução
- [ ] Testes de conectividade (5 min)
- [ ] Testes de autenticação (10 min)
- [ ] Testes de API (30 min)
- [ ] Testes de frontend (45 min)
- [ ] Testes de integração (20 min)
- [ ] Testes de responsividade (15 min)
- [ ] Testes de performance (10 min)
- [ ] Testes de segurança (10 min)

### Finalização
- [ ] Documentar bugs encontrados
- [ ] Documentar sugestões de melhoria
- [ ] Confirmar que todos os testes passaram
- [ ] Aprovar para deploy

## 🐛 Cenários de Erro a Testar

### Backend
- [ ] Token expirado
- [ ] Dados malformados no JSON
- [ ] Campos obrigatórios ausentes
- [ ] Validações de negócio
- [ ] Erro de conexão com banco

### Frontend
- [ ] Perda de conexão durante operação
- [ ] Dados inválidos no formulário
- [ ] Navegação sem salvar alterações
- [ ] Refresh da página durante edição

## ✅ Critérios de Aprovação

- [ ] Todos os testes de conectividade passaram
- [ ] Todas as operações CRUD funcionam
- [ ] Interface responsiva em todos os dispositivos
- [ ] Validações funcionam corretamente
- [ ] Performance dentro dos limites esperados
- [ ] Segurança adequada implementada
- [ ] Nenhum erro crítico encontrado

## 📝 Relatório de Teste

Após a execução, documentar:
- ✅ Testes que passaram
- ❌ Testes que falharam
- 🔧 Bugs encontrados
- 💡 Sugestões de melhoria
- 📊 Métricas de performance
- 🎯 Decisão final (Aprovar/Reprovar)

---

**Tempo estimado total:** 2-3 horas
**Responsável:** [Seu nome]
**Data:** [Data do teste]


