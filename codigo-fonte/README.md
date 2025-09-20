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


### Observações
O arquivo .env é ignorado pelo .gitignore por motivos de segurança. 
Configure-o localmente com base no .env.example.


