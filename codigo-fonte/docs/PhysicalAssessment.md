# Sistema de Avaliações Físicas - FR-07

## Descrição
Sistema completo para upload, gerenciamento e visualização de avaliações físicas em PDF dos alunos, permitindo acompanhar sua evolução corporal ao longo do tempo através de documentos digitalizados.

## Funcionalidades Implementadas

### Backend (Node.js + Express + Sequelize)

#### Modelo PhysicalAssessment
- **Campos principais:**
  - `studentId`: ID do aluno
  - `professorId`: ID do professor responsável
  - `assessmentDate`: Data da avaliação
  - `assessmentType`: Tipo de avaliação (inicial, trimestral, semestral, anual)
  - `fileName`: Nome original do arquivo PDF
  - `filePath`: Caminho do arquivo no servidor
  - `fileSize`: Tamanho do arquivo em bytes
  - `observations`: Observações adicionais

#### Validações Implementadas
- Apenas arquivos PDF são aceitos
- Tamanho máximo de arquivo: 5MB
- Data de avaliação obrigatória
- Uma avaliação por aluno por data
- Relacionamentos com Users (aluno e professor)
- Validação de tipo MIME no backend

#### Endpoints da API
```
POST   /physical-assessments          # Criar avaliação (com upload de PDF)
GET    /physical-assessments          # Listar avaliações do professor
GET    /physical-assessments/:id      # Buscar avaliação específica
PUT    /physical-assessments/:id      # Atualizar avaliação
DELETE /physical-assessments/:id      # Excluir avaliação
GET    /physical-assessments/student/:studentId  # Avaliações de um aluno
GET    /physical-assessments/:id/download  # Download do PDF
GET    /physical-assessments/:id/view      # Visualizar PDF no navegador
```

### Frontend (React + Vite)

#### Páginas Implementadas

1. **GerenciarAvaliacoes.jsx**
   - Lista todas as avaliações do professor
   - Filtro por nome do aluno
   - Ações: visualizar PDF, baixar PDF, excluir
   - Interface responsiva com cards
   - Exibição de informações do arquivo

2. **UploadAvaliacao.jsx**
   - Formulário para upload de avaliações
   - Drag & drop para arquivos PDF
   - Seleção de aluno e tipo de avaliação
   - Validação de arquivo (tipo e tamanho)
   - Preview do arquivo selecionado

#### Características da Interface
- Design consistente com o sistema existente
- Formulários organizados em seções
- Validação de campos obrigatórios
- Feedback visual para ações
- Responsividade para mobile
- Drag & drop para upload de arquivos
- Visualização e download de PDFs

## Tecnologias Utilizadas

### Backend
- **Node.js** + **Express**: Framework web
- **Sequelize**: ORM para banco de dados
- **MySQL**: Banco de dados
- **JWT**: Autenticação
- **bcrypt**: Criptografia de senhas
- **Multer**: Upload de arquivos

### Frontend
- **React 19**: Biblioteca de interface
- **Vite**: Build tool
- **Axios**: Cliente HTTP
- **React Router**: Roteamento
- **CSS3**: Estilização

## Estrutura de Arquivos

```
codigo-fonte/
├── src/
│   ├── models/
│   │   └── PhysicalAssessment.js
│   ├── controllers/
│   │   └── physicalAssessmentController.js
│   ├── routes/
│   │   └── physicalAssessmentRoutes.js
│   ├── config/
│   │   └── upload.js
│   ├── uploads/
│   │   └── physical-assessments/
│   └── app.js (atualizado)
└── zeus-web/
    └── src/
        ├── pages/
        │   ├── GerenciarAvaliacoes.jsx
        │   ├── GerenciarAvaliacoes.css
        │   ├── UploadAvaliacao.jsx
        │   └── UploadAvaliacao.css
        ├── services/
        │   └── api.js (já existente)
        └── App.jsx (atualizado)
```

## Boas Práticas Implementadas

### Backend
- ✅ Separação de responsabilidades (MVC)
- ✅ Validações de dados e arquivos
- ✅ Tratamento de erros
- ✅ Middleware de autenticação
- ✅ Relacionamentos entre entidades
- ✅ Validações de negócio
- ✅ Upload seguro de arquivos
- ✅ Gerenciamento de arquivos estáticos

### Frontend
- ✅ Componentes reutilizáveis
- ✅ Gerenciamento de estado
- ✅ Validações de formulário
- ✅ Feedback ao usuário
- ✅ Navegação consistente
- ✅ Design responsivo
- ✅ Drag & drop para upload
- ✅ Download e visualização de PDFs

## Como Usar

### 1. Iniciar o Backend
```bash
cd codigo-fonte
npm run dev
```

### 2. Iniciar o Frontend
```bash
cd zeus-web
npm run dev
```

### 3. Acessar as Funcionalidades
- Login como professor
- Navegar para "Avaliações Físicas"
- Fazer upload de nova avaliação em PDF
- Visualizar, baixar e gerenciar avaliações existentes

## Testes

Execute o script de teste:
```bash
node codigo-fonte/scripts/testPhysicalAssessment.js
```

## Próximos Passos Sugeridos

1. **Relatórios**: Implementar gráficos de evolução
2. **Notificações**: Lembretes de avaliações
3. **Histórico**: Comparação entre avaliações
4. **Métricas**: Cálculo automático de IMC, etc.
5. **Backup**: Sistema de backup automático dos PDFs
6. **Compressão**: Otimização de arquivos PDF

## Conclusão

A implementação do FR-07 está completa e segue todas as boas práticas do projeto, integrando-se perfeitamente com o sistema existente e fornecendo uma interface intuitiva para o upload, gerenciamento e visualização de avaliações físicas em PDF dos alunos. O sistema permite que professores façam upload de documentos de avaliação física, organizem por aluno e tipo, e forneçam acesso fácil para visualização e download dos arquivos.
