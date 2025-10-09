# Planos de Testes de Software

Apresente os casos de testes utilizados na realização da verificação e validação da aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos bem como o tratamento de erros (robustez da aplicação).

### Tipo de Teste
- **Sucesso**: Tem o objetivo de verificar se as funcionalidades funcionam corretamente.
- **Insucesso**: Tem o objetivo de verificar se o sistema trata erros de maneira correta.

### ETAPA 2  

<table>
  <tr>
    <th colspan="2" width="1000">CT-001 - S<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário pode fazer login com sucesso utilizando credenciais válidas.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Cassiano Torneiro Baptista</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Como usuário, desejo realizar login seguro com autenticação para proteger meu acesso ao sistema.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Inserir o usuário válido.<br>
      3. Inserir a senha válida.<br>
      4. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Colocar Usuário cadastrado na base<br>
      - <strong>Senha:</strong> Colocar valor de senha válida
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve redirecionar o usuário para a página inicial do aplicativo após o login bem-sucedido.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-001 - I<br>Login com credenciais inválidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica o tratamento de credenciais inválidas no login.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Cassiano Torneiro Baptista</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Como usuário, desejo realizar login seguro com autenticação para proteger meu acesso ao sistema.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Inserir o usuário válido.<br>
      3. Inserir a senha inválida.<br>
      4. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Colocar usuário cadastrado na base<br>
      - <strong>Senha:</strong> Colocar senha inválida
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve apresentar a mensagem de login inválido.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-002<br>Cadastro de professores</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se os dados de cadastro de professores são salvos no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Douglas Takemi Kimura</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: Como administrador, desejo cadastrar e gerenciar professores para garantir que apenas profissionais autorizados possam criar fichas de treino.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Usar a ferramenta Postman para enviar requisições.<br>
      4. Checar resposta pela ferramenta Postman.<br>
      5. Confirmar salvamento dos dados no banco de dados.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Professor:</strong> Inserir dados do professor<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>Os dados de cadastro salvos no banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-003<br>Cadastro de alunos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se os dados de cadastro de alunos são salvos no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Douglas Takemi Kimura</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004: Como administrador, desejo cadastrar e gerenciar os alunos matriculados na academia para manter o controle dos usuários ativos.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Usar a ferramenta Postman para enviar requisições.<br>
      4. Checar resposta pela ferramenta Postman.<br>
      5. Confirmar salvamento dos dados no banco de dados.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Professor:</strong> Inserir dados do Aluno<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>Os dados de cadastro salvos no banco de dados.</td>
  </tr>
</table>


### ETAPA 3
<table>
  <tr>
    <th colspan="2" width="1000">CT-004 S<br>Cadastro de Exercícios</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se os dados de cadastro de exercícios são salvos no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Douglas Takemi Kimura</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>>RF-005: Como administrador e professor, desejo cadastrar e gerenciar exercicios.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de exercícios <br>
      4. Tentar criar novo exercício com nome idêntico a exercício já <br>
      4. Checar se novo exercício foi criado com sucesso no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Acessar dashboard de gerenciamento de exercícios com conta Admin válida<br>
      - <strong>Exercício:</strong> Inserir dados válidos do novo exercício<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>Os dados de cadastro de exercícios salvos no banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-004 I<br>Cadastro de Exercícios</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema não permite cadastro de exercícios com nome já existente no BD.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Douglas Takemi Kimura</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>>RF-005: Como administrador e professor, desejo cadastrar e gerenciar exercicios.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de exercícios <br>
      4. Tentar criar novo exercício com nome idêntico a exercício já <br>
      4. Checar se novo exercício foi criado com sucesso no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Acessar dashboard de gerenciamento de exercícios com conta Admin válida<br>
      - <strong>Exercício:</strong> Inserir dados inválidos do novo exercício<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve disparar uma mensagem de erro e não cadastrar o exercício inválido.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-005 S<br>Editar de Exercícios</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se os dados de exercícios são editados e salvos no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Douglas Takemi Kimura</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005: Como administrador e professor, desejo cadastrar e gerenciar exercicios.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
     1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de exercícios <br>
      4. Editar exercício qualquer exercício <br>
      5. Editar nome de exercício com dádo válido<br>
      6. Checar se o exercício foi atualizado no BD <br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Acessar dashboard de gerenciamento de exercícios com conta Admin válida<br>
      - <strong>Exercício:</strong> Inserir dados válidos nos campos de edição de exercício<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>Os dados de cadastro de exercícios editados e salvos no banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-005 I<br>Editar de Exercícios</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se edição com dados inválidos de exercícios não são salvos no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Douglas Takemi Kimura</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005: Como administrador e professor, desejo cadastrar e gerenciar exercicios.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de exercícios <br>
      4. Editar exercício qualquer exercício <br>
      5. Editar nome de exercício com nome de exercício já existente no BD (Dado Inválido)<br>
      6. Checar se o exercício não foi atualizado no BD e <br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Acessar dashboard de gerenciamento de exercícios com conta Admin válida<br>
      - <strong>Exercício:</strong> Inserir dados inválidos nos campos de edição de exercício<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> Disparar uma mensagem de erro e dados inválidos de cadastro de exercícios não atualizados no banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-006 S<br>Excluir de Exercícios</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se dados de exercícios são excluídos do banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Douglas Takemi Kimura</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005: Como administrador e professor, desejo cadastrar e gerenciar exercicios.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de exercícios <br>
      4. Excluir exercício qualquer exercício <br>
      5. Checar se o exercício foi excluído do BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Acessar dashboard de gerenciamento de exercícios com conta Admin válida<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> Dados excluídos com sucesso do banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-007 S<br>Cadastrar Aluno</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se dados de aluno são cadstardos do banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Natália Romero Soltau</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004	Como administrador, desejo cadastrar e gerenciar os alunos matriculados na academia para manter o controle dos usuários ativos.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de alunos <br>
      4. Cadastrar aluno <br>
      5. Checar se o aluno foi cadastrado no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Administrador:</strong> Acessar dashboard de gerenciamento de alunos com conta Admin válida<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> Dados cadstrados com sucesso do banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-008 i<br>Cadastrar Aluno</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema não permite cadastro de alunos com e-mail e/ou cpf já existente no BD.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Natália Romero Soltau</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004	Como administrador, desejo cadastrar e gerenciar os alunos matriculados na academia para manter o controle dos usuários ativos.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de alunos <br>
      4. Cadastrar aluno <br>
      5. Checar se o aluno foi cadastrado no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Administrador:</strong> Acessar dashboard de gerenciamento de alunos com conta Admin válida<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> Deve ser disparada mensagem que e-mail e/ou cpf já existe no BD.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-009 S<br>Editar Aluno</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se os dados do aluno são editado no BD.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Natália Romero Soltau</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004	Como administrador, desejo cadastrar e gerenciar os alunos matriculados na academia para manter o controle dos usuários ativos.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de alunos <br>
      4. Editar aluno <br>
      5. Checar se o aluno foi editado no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Administrador:</strong> Acessar dashboard de gerenciamento de alunos com conta Admin válida<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> Os dados do aluno selecionado deve estar editado.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-010 i<br>Editar Aluno</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema não permite editar o aluno com e-mail e/ou cpf já existente no BD.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Natália Romero Soltau</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004	Como administrador, desejo cadastrar e gerenciar os alunos matriculados na academia para manter o controle dos usuários ativos.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de alunos <br>
      4. Editar aluno <br>
      5. Checar se o aluno foi editado no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Administrador:</strong> Acessar dashboard de gerenciamento de alunos com conta Admin válida<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> Deve ser disparada mensagem que e-mail e/ou cpf já existe no BD.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-011 S<br>Excluir Aluno</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema exclui os dados do aluno no BD.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Natália Romero Soltau</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004	Como administrador, desejo cadastrar e gerenciar os alunos matriculados na academia para manter o controle dos usuários ativos.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de alunos <br>
      4. Excluir aluno <br>
      5. Checar se o aluno foi excluido no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Administrador:</strong> Acessar dashboard de gerenciamento de alunos com conta Admin válida<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> Os dados do aluno selecionado deve ser excluido.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-012 S<br>Cadastro de Professor (Sucesso)</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Verifica se o sistema cadastra um novo professor corretamente e armazena seus dados no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Cassiano Torneiro Baptista</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: Como administrador, desejo cadastrar e gerenciar professores para garantir que apenas profissionais autorizados possam criar fichas de treino.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. No Postman, enviar requisição <code>POST /admin/professores</code>.<br>
      4. Preencher os campos obrigatórios (nome, e-mail, senha, CPF).<br>
      5. Checar resposta da API e verificar persistência no banco de dados.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      <pre>{
  "nome": "João Silva",
  "email": "joao@academia.com",
  "cpf": "12345678900",
  "senha": "123456"
}</pre>
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve retornar mensagem de sucesso e o professor deve ser salvo corretamente no banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-013 I<br>Cadastro de Professor (Insucesso)</th>
  </tr>
  <tr>
    <td><strong>Descrição</strong></td>
    <td>Verifica se o sistema impede o cadastro de um professor com e-mail ou CPF já existentes no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td>Cassiano Torneiro Baptista</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Insucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: Como administrador, desejo cadastrar e gerenciar professores para garantir que apenas profissionais autorizados possam criar fichas de treino.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Tentar cadastrar um professor com e-mail já existente.<br>
      4. Checar a resposta da API.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      <pre>{
  "nome": "João Silva",
  "email": "joao@academia.com",
  "cpf": "12345678900",
  "senha": "123456"
}</pre>
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve retornar mensagem de erro informando que o e-mail ou CPF já está cadastrado e não salvar os dados no BD.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-014 S<br>Listar Professores</th>
  </tr>
  <tr>
    <td><strong>Descrição</strong></td>
    <td>Verifica se o sistema retorna corretamente a lista de professores cadastrados no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td>Cassiano Torneiro Baptista</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: Como administrador, desejo cadastrar e gerenciar professores para garantir que apenas profissionais autorizados possam criar fichas de treino.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar backend e BD.<br>
      2. Logar como Admin.<br>
      3. Enviar requisição <code>GET /admin/professores</code>.<br>
      4. Checar se a lista retornada contém todos os professores cadastrados.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>Sem dados específicos, apenas professores previamente cadastrados no BD.</td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>A API deve retornar status 200 e a lista completa de professores cadastrados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-015 S<br>Editar Professor</th>
  </tr>
  <tr>
    <td><strong>Descrição</strong></td>
    <td>Verifica se o sistema permite a edição dos dados de um professor existente e atualiza corretamente no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td>Cassiano Torneiro Baptista</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: Como administrador, desejo cadastrar e gerenciar professores para garantir que apenas profissionais autorizados possam criar fichas de treino.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar backend e BD.<br>
      2. Logar como Admin.<br>
      3. Enviar requisição <code>PUT /admin/professores/:id</code> com dados atualizados.<br>
      4. Checar resposta e validar atualização no BD.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      <pre>{
  "nome": "João da Silva",
  "email": "joaos@academia.com"
}</pre>
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve retornar status 200 e refletir as mudanças no banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-016 S<br>Excluir Professor</th>
  </tr>
  <tr>
    <td><strong>Descrição</strong></td>
    <td>Verifica se o sistema exclui corretamente um professor selecionado e remove seus dados do banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td>Cassiano Torneiro Baptista</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: Como administrador, desejo cadastrar e gerenciar professores para garantir que apenas profissionais autorizados possam criar fichas de treino.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar backend e BD.<br>
      2. Logar como Admin.<br>
      3. Enviar requisição <code>DELETE /admin/professores/:id</code>.<br>
      4. Checar resposta e confirmar remoção no banco de dados.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>ID do professor a ser excluído.</td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve retornar status 200 e o professor não deve mais constar no banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-017 S<br>Cadastro de Ficha de treino</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se os dados de cadastro da ficha de treino são salvos no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Gabriel Victor </td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>>RF-006 Como professor, desejo criar e gerenciar fichas de treino para alunos específicos, cadastrando os exercícios necessários.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de Fichas de treino <br>
      4. Tentar criar nova Ficha de treino<br>
      4. Checar se nova Ficha de treino foi criada com sucesso no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Acessar dashboard de gerenciamento de fichas de treino com conta Admin válida<br>
      - <strong>Exercício:</strong> Inserir dados válidos na nova ficha de treino<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>Os dados de cadastro de Ficha de treino foram salvos no banco de dados.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-018 S<br>Cadastro de Ficha de treino</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se os dados de cadastro da ficha de treino foram deletados no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Gabriel Victor </td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>>RF-006 Como professor, desejo criar e gerenciar fichas de treino para alunos específicos, cadastrando os exercícios necessários.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de Fichas de treino <br>
      4. Tentar deletar Ficha de treino<br>
      4. Checar se nova Ficha de treino foi deletada com sucesso no BD<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Acessar dashboard de gerenciamento de fichas de treino com conta Admin válida<br>
      - <strong>Exercício:</strong> Clicar no botão de deletar<br>
  </tr>
    <tr>
    <td><strong> Critérios de êxito </strong></td>
    <td> Ficha de treino deletada com sucesso.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-019 I<br>Editar Ficha de treino</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste edita os dados da ficha de treino </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Gabriel Victor </td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>>RF-006 Como professor, desejo criar e gerenciar fichas de treino para alunos específicos, cadastrando os exercícios necessários.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de Fichas de treino <br>
      4. Tentar editar a ficha de treino <br>
      4. Checar se a Ficha de treino foi editada com sucesso <br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Usuário:</strong> Acessar dashboard de gerenciamento de fichas de treino com conta Admin válida<br>
      - <strong>Exercício:</strong> Clicar no botão de editar <br>
  </tr>
    <tr>
    <td><strong> Critérios de êxito </strong></td>
    <td> Dados da ficha de treino não foram alterados com sucesso. </td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="2" width="1000">CT-020 S<br>Listar Ficha de treino</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste Lista e mostra todos as fichas de treino </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Gabriel Victor </td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>>RF-006 Como professor, desejo criar e gerenciar fichas de treino para alunos específicos, cadastrando os exercícios necessários.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar frontend, backend e BD.<br>
      2. Logar e autenticar com o Admin.<br>
      3. Navegar até o dashboard de gerenciamento de Fichas de treino <br>
      4. Ver ficha de treino <br>
      4. Checar se a Ficha de treino esta presente <br>
      </td>
  </tr>



### ETAPA 4
Criar casos de teste da etapa 4
 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes de desenvolvimento
Cada funcionalidade desenvolvida deve ser testada pelo próprio desenvolvedor, utilizando casos de teste, tanto de sucesso quanto de insucesso, elaborados por ele. Todos os testes devem ser evidenciados.

### ETAPA 3
<table>
  <tr>
    <th colspan="6" width="1000">CT-004S<br>Cadastrar exercícios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Dados cadastrados com sucesso do banco de dados.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Douglas Takemi Kimura </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema cadastrou novo eercício com seucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/0470bfe6-3f4b-46db-9ed5-d6868d1ec1d5"/></td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="6" width="1000">CT-004I<br>Cadastro de exercícios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve disparar uma mensagem de erro e não cadastrar o exercício inválido.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Douglas Takemi Kimura </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema não cadastrou dados inválidos ou repetidos.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/60d92423-e5b3-4a80-aade-53f9d4c53e52"/></td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="6" width="1000">CT-005S<br>Editar exercícios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">	Os dados de cadastro de exercícios editados e salvos no banco de dados.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Douglas Takemi Kimura </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema editou o cadastro no BD com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/413f376f-e8ce-4ffb-9168-70d60237df00"/></td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="6" width="1000">CT-005I<br>Editar exercícios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Disparar uma mensagem de erro e dados inválidos de cadastro de exercícios não atualizados no banco de dados.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Douglas Takemi Kimura </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema não salvou dados inválidos ou repetidos.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/07970fde-8048-40a2-999a-5cf7a16198ad"/></td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="6" width="1000">CT-006S<br>Excluir exercícios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Dados excluídos com sucesso do banco de dados.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Douglas Takemi Kimura </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema excluiu o cadastro com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/142d0221-4717-41ba-b8ca-d67af6d1c518"/></td>
  </tr>
</table>
      
<table>
  <tr>
    <th colspan="6" width="1000">CT-007<br>Cadastro aluno</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve redirecionar o administrador para a página de gerenciamento de alunos após cadastro bem-sucedido.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Natália Romero Soltau </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está fazendo o cadastro corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/435745ed-4be0-4c22-ba59-718684c7af93"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Cadastro aluno</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve emitir uma mensagem de alerta ao colocar e-mail e/ou cpf já cadstrados.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Natália Romero Soltau </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está emitindo a mensagem ao colocar e-mail e cpf já cadstrado.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/b4941e45-40e5-475b-8298-20d685ba81e6"/></td>
      
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-009<br>Editar aluno</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve redirecionar o administrador para a página de gerenciamento de alunos após edição bem-sucedida.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Natália Romero Soltau </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está fazendo a edição de aluno corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4be1dba2-3b5b-4c60-adaf-2531d51bc987"/></td>
      
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-010<br>Editar aluno</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve emitir uma mensagem de alerta ao colocar e-mail e/ou cpf já cadstrados.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Natália Romero Soltau </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está emitindo a mensagem ao colocar e-mail e cpf já cadstrado.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/cb2dd6ea-e378-4002-a233-d6c209575f1e"/></td>
      
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-011<br>Excluir aluno</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve emitir uma mensagem de confirmação da exclusão de aluno e quando confirmar deve ser excluido.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Natália Romero Soltau </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está excluindo os dados do aluno corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/db2e9891-a1d2-4fca-a1c3-40990f9980b8"/></td>
      
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-012S<br>Cadastrar professor</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve cadastrar um novo professor com sucesso e salvar os dados no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Cassiano Torneiro Baptista</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema cadastrou corretamente o professor e retornou mensagem de sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/94808ab0-29c4-4be5-9c58-c20a40718735"></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-013I<br>Cadastrar professor (Insucesso)</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve impedir o cadastro de um professor com e-mail ou CPF já existentes, retornando mensagem de erro.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Cassiano Torneiro Baptista</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema exibiu mensagem de erro ao tentar cadastrar professor com dados repetidos.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/8b713cba-6fa6-461e-98e4-876d9ec3e4c4"></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-014S<br>Listar professores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A API deve retornar status 200 e exibir a lista de professores cadastrados no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Cassiano Torneiro Baptista</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema retornou corretamente todos os professores cadastrados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/1f38b95f-b44e-487e-a585-603d7458f7f0"></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-015S<br>Editar professor</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir editar os dados de um professor existente e atualizar corretamente no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Cassiano Torneiro Baptista</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema atualizou corretamente as informações do professor no banco de dados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/8e376a6e-9b9b-451a-bc92-845b75af30d3"></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-016S<br>Excluir professor</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve excluir corretamente o professor selecionado e removê-lo do banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Cassiano Torneiro Baptista</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">06/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema removeu o cadastro do professor com sucesso e retornou mensagem de confirmação.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4c700507-75a1-4276-b19e-7a7aee3461b8"></td>
  </tr>
</table>

### ETAPA 4
Colocar evidências de teste da etapa 4

## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes) e caso perceba a necessidade de outros casos de teste, deve acrescentá-los na sessão "Plano de Testes".

### ETAPA 2

<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve redirecionar o usuário para a página inicial do aplicativo após o login bem-sucedido.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Cassiano Torneiro Baptista (backend) e Gabriel Victor Miranda de Oliveira (frontend) </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Natália Romero Soltau </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6b0abbe6-c2c8-4e72-a238-3cee7f835dd8"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Login com credenciais inválidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema não deve permitir o login do usuário e deve exibir uma mensagem de erro</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Cassiano Torneiro Baptista (backend) e Gabriel Victor Miranda de Oliveira (frontend) </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Natália Romero Soltau </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está exibindo a mensagem de erro corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/d2679e6f-4dba-4acb-b444-6713437eea0b"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Cadastro de professores
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Os dados devem ser salvos no banco de dados.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Cassiano Torneiro Baptista (backend) </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Douglas Takemi Kimura </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Cadastro de professor salvo com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/06a94f2b-21f3-4905-821a-77a1df12f3ed"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Cadastro de alunos
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Os dados devem ser salvos no banco de dados.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Cassiano Torneiro Baptista (backend) </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Douglas Takemi Kimura </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Cadastro de aluno salvo com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/a33c0a3f-81d6-41b0-b4a0-ec5dc5201601"/></td>
  </tr>
</table>

### ETAPA 3
Colocar evidências de teste da etapa 3

### ETAPA 4
Colocar evidências de teste da etapa 4

