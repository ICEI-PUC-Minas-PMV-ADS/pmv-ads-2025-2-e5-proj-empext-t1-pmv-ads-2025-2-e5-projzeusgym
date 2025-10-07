# 🚀 Teste Rápido - Sistema de Avaliações Físicas

## ⚡ Execução em 5 Minutos

### 1. Preparar Ambiente
```bash
# No diretório codigo-fonte/
node scripts/configurarTeste.js
```

### 2. Iniciar Serviços
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend  
cd ../zeus-web
npm run dev
```

### 3. Testes Automatizados
```bash
# Testes básicos
node scripts/testeAutomatizado.js

# Testes CRUD (requer login)
node scripts/testeCRUD.js
```

### 4. Teste Manual no Navegador
1. Acesse: `http://localhost:5173`
2. Faça login como professor
3. Navegue para "Avaliações Físicas"
4. Teste criar, editar, excluir avaliações

## 🔧 Solução de Problemas

### Backend não inicia
```bash
# Verificar dependências
npm install

# Verificar banco de dados
# Configurar .env com dados do MySQL
```

### Frontend não carrega
```bash
cd zeus-web
npm install
npm run dev
```

### Erro de autenticação nos testes
- Certifique-se de ter um professor cadastrado
- Verifique as credenciais no script `testeCRUD.js`

## 📋 Checklist Rápido

- [ ] Backend rodando na porta 3000
- [ ] Frontend rodando na porta 5173  
- [ ] Banco de dados conectado
- [ ] Professor cadastrado no sistema
- [ ] Testes automatizados passando
- [ ] Interface funcionando no navegador

## 📚 Documentação Completa

Para testes detalhados, consulte: `docs/PlanoTesteAvaliacoesFisicas.md`


