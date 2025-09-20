import { createContext, useContext, useState } from 'react';
import api from '../services/api';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext);

// 3. Provedor que envolverá a aplicação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (login, password) => {
    try {
      const response = await api.post('/adminLogin', { login, password });
      const { token } = response.data;

      // Salva o token no localStorage
      localStorage.setItem('token', token);
      // Configura o token no cabeçalho das próximas requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // COMENTADO: Rota /me não existe no backend
      // const userResponse = await api.get('/me');
      // setUser(userResponse.data);
      
      // SOLUÇÃO ALTERNATIVA: Usa os dados do login
      setUser({ name: login, role: 'admin' });
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login ou senha inválidos.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Valores que ficarão disponíveis para toda a app
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};