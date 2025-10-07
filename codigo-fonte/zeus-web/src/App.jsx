import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import GerenciarAluno from './pages/GerenciarAluno.jsx';
import CadastrarAluno from './pages/CadastrarAluno.jsx';

// Importações de Professor
import ManageProfessors from './pages/ManageProfessors.jsx';
import CreateProfessor from './pages/CreateProfessor.jsx';
import EditProfessor from './pages/EditProfessor.jsx'; 

// 🚨 CORREÇÃO: Importa o componente CadastroFichaTreino (sem o subdiretório /professor)
import CadastroFichaTreino from './pages/CadastroFichaTreino.jsx';


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

          {/* A rota de cadastro de aluno pode receber um :id para edição */}
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