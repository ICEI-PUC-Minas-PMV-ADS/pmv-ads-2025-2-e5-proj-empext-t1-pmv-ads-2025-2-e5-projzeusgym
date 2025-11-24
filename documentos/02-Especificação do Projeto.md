# Especificações do Projeto

## Usuários

| Tipo de Usuário | Descrição | Responsabilidades |
|-----------------|-----------|-------------------|
| **Administrador** | Representa o gestor da academia ou responsável pelo sistema. Tem visão global sobre usuários e exercícios disponíveis. | - Cadastrar e gerenciar professores e alunos.<br> - Garantir segurança e integridade dos dados.<br>- Monitorar uso do sistema.<br>- Redefinir acessos quando necessário. |
| **Professor** | Profissional de educação física responsável por planejar e acompanhar treinos personalizados. | - Criar e gerenciar fichas de treino.<br>- Registrar e atualizar avaliações físicas (peso, altura, medidas, etc.).<br>- Acompanhar a evolução dos alunos.<br>- Ajustar treinos com base no desempenho.<br>- Orientar os alunos via sistema. |
| **Aluno** | Usuário final do sistema, matriculado na academia. Recebe, executa e acompanha seus treinos. | - Consultar fichas de treino e avaliações físicas.<br>- Registrar dados de desempenho (carga, repetições, peso corporal).<br>- Calcular IMC.<br>- Gerenciar sua própria conta (editar dados permitidos, trocar senha, exclusão da conta do aplicativo.). |



## Arquitetura e Tecnologias

<img width="1201" height="471" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym/blob/main/documentos/img/Arquitetura%20da%20aplica%C3%A7%C3%A3o%20atualizada.png" />


## Project Model Canvas

<img width="1170" height="643" alt="image" src="https://github.com/user-attachments/assets/6a336947-d817-49b3-ae0b-8629fe2d6a9f" />


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

Para mais informações, consulte os microfundamentos Fundamentos de Engenharia de Software e Engenharia de Requisitos de Software. 

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Como usuário, desejo redefinir minha senha em caso de esquecimento, para não perder acesso ao sistema.| ALTA | 
|RF-002| Como usuário, desejo realizar login seguro com autenticação para proteger meu acesso ao sistema. | ALTA |
|RF-003| Como administrador, desejo cadastrar e gerenciar professores para garantir que apenas profissionais autorizados possam criar fichas de treino. | ALTA | 
|RF-004| Como administrador, desejo cadastrar e gerenciar os alunos matriculados na academia para manter o controle dos usuários ativos. | ALTA |
|RF-005| Como administrador e professor, desejo cadastrar e gerenciar exercicios. | ALTA | 
|RF-006| Como professor, desejo criar e gerenciar fichas de treino para alunos específicos, cadastrando os exercícios necessários. | ALTA | 
|RF-007| Como professor, desejo registrar avaliações físicas dos alunos (peso, altura, medidas corporais, etc.) para acompanhar sua evolução corporal | MÉDIA | 
|RF-008| Como aluno, desejo ter acesso aos meus treinos na aplicação mobile. | ALTA |
|RF-009| Como aluno, desejo acessar um histórico de avaliações físicas para acompanhar minha evolução ao longo do tempo  | MÉDIA |
|RF-010| Como aluno, desejo baixar minha avaliação física em PDF para guardar ou compartilhar quando necessário. | BAIXA |
|RF-011| Como aluno, desejo poder gerenciar minha conta a qualquer momento para ter controle sobre meus dados pessoais.| MÉDIA |
|RF-012| Como aluno, desejo calcular meu IMC para acompanhar minha condição física atual. | BAIXA |
|RF-013| Como aluno, desejo registar meu peso e poder acompanhar o histórico. | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 5s |  BAIXA | 
|RNF-003| O sistema deve utilizar autenticação segura por token (JWT) | ALTA | 
|RNF-004| A interface deve ser intuitiva e de fácil utilização, mesmo para usuários com pouca experiência em tecnologia | MÉDIA |
|RNF-005| As atualizações do sistema devem ser realizadas sem causar interrupções no serviço | MÉDIA |
|RNF-006| O sistema deverá ser compatívem com sistemas operacionais Android e IOS| ALTA|

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| As funcionalidades do sistema deverão se restringir à gestão das fichas de treino, sem módulos de agendamento de aulas, vendas ou controle financeiro. |
|03| A segurança dos dados dos alunos é prioritária, e o sistema deve ter mecanismos para proteger as informações pessoais e de saúde. |
|04| A usabilidade do sistema deve ser intuitiva e de fácil acesso para todos os usuários. |

## Diagrama de Caso de Uso


<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym/blob/6f7bc37b127032a14f830951cc8c52f4492d2836/documentos/img/diagrama.png" />



## Projeto da Base de Dados
Diagrama Entidade Relacionamento</br></br>
![DER (2)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t1-pmv-ads-2025-2-e5-projzeusgym/blob/main/documentos/img/Diagrama%20relacionamento%20corrigido.png) />

</br>
</br>
Esquema Relacional</br></br>


<img width="560" height="1600" alt="image" src="https://github.com/user-attachments/assets/340ef23a-3d7e-4d96-a11e-071066b0e720" />


