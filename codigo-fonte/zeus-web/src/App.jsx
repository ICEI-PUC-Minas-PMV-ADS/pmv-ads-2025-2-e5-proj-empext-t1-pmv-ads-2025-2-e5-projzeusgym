import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Componentes Públicos
import Login from './pages/Login';

// Componentes Protegidos
import Dashboard from './pages/Dashboard';

// Alunos
import GerenciarAluno from './pages/GerenciarAluno';
import CadastrarAluno from './pages/CadastrarAluno';

// Fichas de Treino
import ManageFichasTreino from './pages/ManageFichasTreino';
import CadastroFichaTreino from './pages/CadastroFichaTreino';
import EditFichaTreino from './pages/EditFichaTreino'; 
import ViewFichaTreino from './pages/ViewFichaTreino'; 

// Exercícios
import GerenciarExercicios from './pages/GerenciarExercicios'; 

// Professores
import ManageProfessors from './pages/ManageProfessors';
import CreateProfessor from './pages/CreateProfessor';
import EditProfessor from './pages/EditProfessor';
import ViewProfessor from './pages/ViewProfessor'; // <<<< NOVA IMPORTAÇÃO

// Avaliações Físicas
import GerenciarAvaliacoes from './pages/GerenciarAvaliacoes';
import UploadAvaliacao from './pages/UploadAvaliacao';

// Componente para proteger rotas (só acessa se estiver autenticado)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // Se não estiver autenticado, redireciona para a tela de login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ------------------ ROTAS PÚBLICAS ------------------ */}
          <Route path="/login" element={<Login />} />

          {/* ------------------ ROTAS PROTEGIDAS ------------------ */}
          
          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ROTAS DE GERENCIAMENTO DE FICHAS DE TREINO */}
          
          {/* 1. Rota de Listagem/Gerenciamento */}
          <Route
            path="/fichas-treino" 
            element={
              <ProtectedRoute>
                <ManageFichasTreino />
              </ProtectedRoute>
            }
          />

          {/* 2. Rota de Cadastro de Nova Ficha */}
          <Route
            path="/cadastrar-ficha" 
            element={
              <ProtectedRoute>
                <CadastroFichaTreino /> 
              </ProtectedRoute>
            }
          />

          {/* 3. Rota de Edição (Usa parâmetro ':id') */}
          <Route
            path="/fichas-treino/:id/edit"
            element={
              <ProtectedRoute>
                <EditFichaTreino />
              </ProtectedRoute>
            }
          />

          {/* 4. Rota de Visualização (Usa parâmetro ':id') */}
          <Route
            path="/fichas-treino/:id/view"
            element={
              <ProtectedRoute>
                <ViewFichaTreino />
              </ProtectedRoute>
            }
          />
          
          {/* ROTA DE EXERCÍCIOS */}
          <Route
            path="/gerenciarexercicios" 
            element={
              <ProtectedRoute>
                <GerenciarExercicios /> 
              </ProtectedRoute>
            }
          />

          {/* ROTAS DE GERENCIAMENTO DE PROFESSORES */}
          
          {/* ⭐️ ADICIONADO: Redireciona a rota antiga /professores para a nova /professores/gerenciar */}
          <Route 
            path="/professores"
            element={<Navigate to="/professores/gerenciar" replace />} 
          />
          
          {/* ROTA PRINCIPAL: Listagem/Gerenciamento de Professores */}
          <Route
            path="/professores/gerenciar" 
            element={
              <ProtectedRoute>
                <ManageProfessors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professores/cadastrar"
            element={
              <ProtectedRoute>
                <CreateProfessor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professores/editar/:id"
            element={
              <ProtectedRoute>
                <EditProfessor />
              </ProtectedRoute>
            }
          />
          
          {/* ROTA DE VISUALIZAÇÃO DE PROFESSOR */}
          <Route
            path="/professores/ver/:id" 
            element={
              <ProtectedRoute>
                <ViewProfessor /> 
              </ProtectedRoute>
            }
          />

          {/* ROTAS DE GERENCIAMENTO DE ALUNOS */}

          <Route
            path="/alunos"
            element={
              <ProtectedRoute>
                <GerenciarAluno />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cadastraralunos/:id?"
            element={
              <ProtectedRoute>
                <CadastrarAluno />
              </ProtectedRoute>
            }
          />

          {/* ROTAS DE GERENCIAMENTO DE AVALIAÇÕES FÍSICAS */}
          <Route
            path="/avaliacoes"
            element={
              <ProtectedRoute>
                <GerenciarAvaliacoes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/avaliacoes/upload"
            element={
              <ProtectedRoute>
                <UploadAvaliacao />
              </ProtectedRoute>
            }
          />

          {/* Rota padrão redireciona para login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;