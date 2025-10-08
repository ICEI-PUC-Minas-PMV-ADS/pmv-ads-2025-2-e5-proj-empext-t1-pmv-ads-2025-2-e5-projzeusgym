import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GerenciarAluno from './pages/GerenciarAluno';
import CadastrarAluno from './pages/CadastrarAluno';

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
          <Route
            path="/fichas-treino" 
            element={
              <ProtectedRoute>
                <CadastroFichaTreino /> 
              </ProtectedRoute>
            }
          />
          
          {/*  NOVA ROTA DE EXERCÍCIOS (PARA RESOLVER O ERRO DE NAVEGAÇÃO) */}
          <Route
            path="/gerenciarexercicios" // O path que seu botão estava chamando
            element={
              <ProtectedRoute>
                <GerenciarExercicios /> 
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

          {/* Rota padrão redireciona para login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;