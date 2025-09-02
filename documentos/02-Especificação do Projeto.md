# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. 

## Usuários

| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **Administrador** | Gerenciar aplicação e os usuários | Gerencia usuários, configura o sistema, ou seja, os exercicios disponíveis |
| **Professor** | Usa a aplicação para suas tarefas principais | Cria treinos personalizados para cada aluno e acompanha seu progresso |
| **Aluno** | Usa a aplicação para acompanhar seu treino e evolução | Consulta os treinos criados pelo professor, registra carga, repetições e peso corporal |


## Arquitetura e Tecnologias


![Arquitetura da solução](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym/blob/main/documentos/img/Arquitetura%20da%20solu%C3%A7%C3%A3o.png)

## Project Model Canvas

![Project model canvas](https://github.com/user-attachments/assets/f6ad9f61-f3b4-4c4e-a581-ab3305417e7a)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

Para mais informações, consulte os microfundamentos Fundamentos de Engenharia de Software e Engenharia de Requisitos de Software. 

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Como administrador, desejo cadastrar e gerenciar professores para garantir que apenas profissionais autorizados possam criar fichas de treino. | ALTA | 
|RF-002| Como administrador, desejo cadastrar e gerenciar os alunos matriculados na academia para manter o controle dos usuários ativos. | ALTA |
|RF-003| Como administrador, desejo realizar login seguro com autenticação para proteger meu acesso ao sistema. | ALTA | 
|RF-004| Como administrador, desejo redefinir minha senha em caso de esquecimento, para não perder acesso ao sistema | MÉDIA | 
|RF-005| Como professor, desejo criar e gerenciar fichas de treino para alunos específicos, cadastrando os exercícios necessários. | ALTA | 
|RF-006| Como professor, desejo registrar avaliações físicas dos alunos (peso, altura, medidas corporais, etc.) para acompanhar sua evolução corporal | MÉDIA | 
|RF-007| Como professor, desejo realizar login seguro com autenticação para proteger meu acesso ao sistema. | MÉDIA |
|RF-008| Como professor, desejo redefinir minha senha em caso de esquecimento, para não perder acesso ao sistema | MÉDIA |
|RF-009| Como aluno, desejo inserir informações do treino (peso, repetições etc.) para registrar meu desempenho. | MÉDIA |
|RF-010| Como aluno, desejo acessar um histórico de avaliações físicas para acompanhar minha evolução ao longo do tempo  | MÉDIA |
|RF-011| Como aluno, desejo baixar minha avaliação física em PDF para guardar ou compartilhar quando necessário. | BAIXA |
|RF-012| Como aluno, desejo realizar login seguro com autenticação para proteger minha conta e meus dados. | ALTA |
|RF-013| Como aluno, desejo redefinir minha senha em caso de esquecimento, para não perder acesso ao sistema | MÉDIA |
|RF-014| Como aluno, desejo poder deletar minha conta do aplicativo de fichas de treino a qualquer momento para ter controle sobre meus dados pessoais.| Baixa |
|RF-015| Como aluno, desejo calcular meu IMC para acompanhar minha condição física atual. | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 5s |  BAIXA | 
|RNF-003| O sistema deve utilizar autenticação segura por token (JWT) | ALTA | 
|RNF-004| A interface deve ser intuitiva e de fácil utilização, mesmo para usuários com pouca experiência em tecnologia | MÉDIA |
|RNF-005| As atualizações do sistema devem ser realizadas sem causar interrupções no serviço | MÉDIA |
|RNF-006| O sistema deverá ser compatívem com sistemas operacionais Android e IOS| ALTA|

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| As funcionalidades do sistema deverão se restringir à gestão das fichas de treino, sem módulos de agendamento de aulas, vendas ou controle financeiro. |
|03| A segurança dos dados dos alunos é prioritária, e o sistema deve ter mecanismos para proteger as informações pessoais e de saúde. |
|04| A usabilidade do sistema deve ser intuitiva e de fácil acesso para todos os usuários. |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Caso de Uso

<img width="1003" height="683" alt="CasosDeUsoZeus1" src="https://github.com/user-attachments/assets/134731da-d92b-4cea-99aa-725f346d3961" />


## Projeto da Base de Dados
Diagrama Entidade Relacionamento
![Diagrama ER](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym/blob/main/documentos/img/Diagrama%20Entidade%20Relacionamento.png)
</br>
</br>
Esquema Relacional


![Esquema ER](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym/blob/main/documentos/img/Database%20ER%20diagram.png)

