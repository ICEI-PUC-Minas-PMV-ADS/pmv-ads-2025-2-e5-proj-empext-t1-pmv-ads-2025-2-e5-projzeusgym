import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // ← Certifique-se que este arquivo existe
import GerenciarAluno from './pages/GerenciarAluno';
import CadastrarAluno from './pages/CadastrarAluno';
import GerenciarExercicio from './pages/GerenciarExercicios'; // ← Certifique-se que este arquivo existe  


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
          {/* Rota pública */}
          <Route path="/login" element={<Login />} />

          {/* Rota protegida */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

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
          <Route
            path="/gerenciarexercicios"
            element={
              <ProtectedRoute>
                <GerenciarExercicio />
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