# Zeus Gym

## Descrição
Projeto desenvolvido para o curso de Análise e Desenvolvimento de Sistemas da PUC Minas, eixo 5. O objetivo é criar um sistema para digitalizar e automatizar a gestão das fichas de treino da academia Zeus, promovendo eficiência para professores, melhor experiência para alunos e confiabilidade nos dados.

## Integrantes
- Cassiano Torneiro Baptista
- Douglas Takemi Kimura
- Gabriel Victor Miranda de Oliveira
- Lucas Oliveira Gonçalves
- Natália Romero Soltau
- Rafael Dos Santos Rodrigues

## Orientador
- Sandra Maria Silveira

---
## Setup Local

### Pré-requisitos
- **Node.js**: (versão recomendada: verifique no `package.json`)
- **MySQL Server**: instalado e configurado com usuário/senha
- **npm**: (geralmente vem com o Node.js)

### Passos para Configuração e Execução

#### 1. Clone o Repositório
git clone [https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym.git]

#### 2. Configure o Ambiente
Copie o arquivo de exemplo na raiz do projeto
Em seguida, edite o .env com suas credenciais. Use o modelo abaixo como referência:

```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=academia_zeus
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
ADMIN_LOGIN=admin
ADMIN_PASSWORD=sua_senha_admin

# Configurações do Azure Storage (obrigatórias para upload de arquivos)
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=suaconta;AccountKey=suachave;EndpointSuffix=core.windows.net
AZURE_CONTAINER_NAME=physical-assessments
```

Obs.: Crie o banco MySQL academia_zeus usando as credenciais definidas no .env.

#### 3. Instale as Dependências

```
npm install express sequelize mysql2 dotenv jsonwebtoken bcrypt cors
npm install --save-dev nodemon
```

### 4. Crie o Usuário Admin
```
node scripts/initAdmin.js

Este comando cria um usuário admin no banco com as credenciais definidas em ADMIN_LOGIN e ADMIN_PASSWORD no .env. 
Use essas credenciais para autenticação na API (ex.: rota /adminLogin).
```

### 5. Inicie o Servidor
```
node src/server.js

O servidor será iniciado na porta definida em PORT no .env (padrão: 3000).
Teste as rotas usando ferramentas como Postman ou Insomnia.
```
### 6. Cadastro de Professores e Alunos por Admin

Descrição: O admin logado pode cadastrar professores e alunos via API. Essa funcionalidade foi implementada recentemente e está disponível nas rotas protegidas.

Pré-requisitos para Teste:

Obtenha um token JWT fazendo login como admin na rota /adminLogin.
Use uma ferramenta como Postman ou Insomnia para enviar requisições.

Endpoints:

Cadastrar Professor: POST /admin/professores
```
Headers: Authorization: Bearer <token>
Body (JSON):
json{
  "name": "João Silva",
  "birthdate": "1985-05-15",
  "gender": "masculino",
  "cpf": "12345678901",
  "cref_mg": "123456-MG",
  "email": "joao@zeusgym.com",
  "password": "senha123"
}
```
Cadastrar Aluno: POST /admin/alunos
```
Headers: Authorization: Bearer <token>
Body (JSON):
json{
  "name": "Maria Oliveira",
  "birthdate": "1995-08-20",
  "gender": "feminino",
  "cpf": "98765432100",
  "cellphone": "11987654321",
  "restriction": "Alergia a lactose",
  "email": "maria@zeusgym.com",
  "password": "senha456"
}
```

## Configuração do Azure Blob Storage

### Pré-requisitos Azure
1. **Conta Azure**: Tenha uma conta ativa no Microsoft Azure
2. **Storage Account**: Crie uma conta de armazenamento no Azure Portal
3. **Connection String**: Obtenha a string de conexão da sua storage account

### Configuração
1. **Crie uma Storage Account no Azure Portal**:
   - Vá para Azure Portal > Storage Accounts > Create
   - Escolha um nome único para sua storage account
   - Configure as opções conforme necessário

2. **Obtenha a Connection String**:
   - Vá para sua Storage Account > Access Keys
   - Copie uma das connection strings disponíveis

3. **Configure as variáveis de ambiente**:
   ```env
   AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=suaconta;AccountKey=suachave;EndpointSuffix=core.windows.net
   AZURE_CONTAINER_NAME=physical-assessments
   ```

### Migrações e Testes

#### Executar Migração do Banco (Adicionar colunas Azure)
```bash
node scripts/migrateAzureStorage.js
```

#### Testar Conexão com Azure Storage
```bash
node scripts/testAzureStorage.js
```

### Funcionalidades
- **Upload**: Arquivos PDF são enviados diretamente para Azure Blob Storage
- **URLs**: Apenas URLs dos arquivos são salvas no banco de dados
- **SAS Tokens**: URLs temporárias com acesso limitado por tempo
- **Backward Compatibility**: Sistema mantém compatibilidade com arquivos locais existentes

### Observações
O arquivo .env é ignorado pelo .gitignore por motivos de segurança. 
Configure-o localmente com base no .env.example.

## 🚀 Deploy no Heroku

Para deploy no Heroku com Azure Blob Storage, consulte o arquivo `HEROKU_SETUP.md` que contém:
- Configuração do Azure Storage Account
- Definição de variáveis de ambiente no Heroku
- Instruções de deploy e troubleshooting
- Informações sobre custos e performance

### Comandos rápidos para Heroku:
```bash
# Definir variáveis essenciais
heroku config:set AZURE_STORAGE_CONNECTION_STRING="sua-connection-string" -a sua-app
heroku config:set JWT_SECRET="sua-chave-secreta" -a sua-app

# Deploy
git push heroku main

# Testar Azure Storage
heroku run npm run test-azure -a sua-app
```
- **Azure Storage é obrigatório** para o funcionamento do upload de avaliações físicas
- O sistema criará automaticamente o container se ele não existir


