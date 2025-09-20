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

### ETAPA 3
Criar casos de teste da etapa 3

### ETAPA 4
Criar casos de teste da etapa 4
 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes de desenvolvimento
Cada funcionalidade desenvolvida deve ser testada pelo próprio desenvolvedor, utilizando casos de teste, tanto de sucesso quanto de insucesso, elaborados por ele. Todos os testes devem ser evidenciados.

### Exemplo
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
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">José da Silva </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">08/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym/blob/main/documentos/img/Login_sucesso.mkv"/></td>
  </tr>
</table>

### ETAPA 3
Colocar evidências de teste da etapa 3

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
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym/blob/main/documentos/img/Login_invalido.mkv"/></td>
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
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
  </tr>
</table>

### ETAPA 3
Colocar evidências de teste da etapa 3

### ETAPA 4
Colocar evidências de teste da etapa 4

