import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // ← Certifique-se que este arquivo existe
import GerenciarAluno from './pages/GerenciarAluno';
import CadastrarAluno from './pages/CadastrarAluno';
import GerenciarAvaliacoes from './pages/GerenciarAvaliacoes';
import CadastrarAvaliacao from './pages/CadastrarAvaliacao';

// Componente para proteger rotas (só acessa se estiver autenticado)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
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
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 🚨 NOVA ROTA: GERENCIAMENTO DE FICHAS DE TREINO */}
          <Route
            path="/fichas-treino" // Liga ao botão "Gerenciar Fichas de Treino"
            element={
              <ProtectedRoute>
                <CadastroFichaTreino /> 
              </ProtectedRoute>
            }
          />
          
          {/* ROTAS DE GERENCIAMENTO DE PROFESSORES */}
          <Route
            path="/professores"
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
            path="/avaliacoes/nova"
            element={
              <ProtectedRoute>
                <CadastrarAvaliacao />
              </ProtectedRoute>
            }
          />

          <Route
            path="/avaliacoes/editar/:id"
            element={
              <ProtectedRoute>
                <CadastrarAvaliacao />
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