import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';
import bracoLogo from '../assets/braco.png'; // ← Importação correta da logo

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authLogin(login, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleForgotPassword = () => {
    alert('Entre em contato com o administrador para redefinir sua senha.');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {/* Logo da Zeus */}
        <div className="logo-container">
          <img 
            src={bracoLogo} // ← Usando o objeto importado
            alt="Zeus Gym Logo" 
            className="login-logo"
          />
        </div>
        
        <h2>Zeus Gym</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label >Login:</label>
            <input 
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label >Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
          
          <div className="forgot-password-container">
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="forgot-password-button"
            >
              Esqueci minha senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;