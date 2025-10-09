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
            // CORREÇÃO FINAL: Usando a rota COMPLETA (prefixo '/adminLogin' + endpoint '/login')
            const response = await api.post('/adminLogin/login', { login, password });
            
            const { token } = response.data;

            // Salva o token no localStorage
            localStorage.setItem('token', token);
            
            // Configura o token no cabeçalho das próximas requisições
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // SOLUÇÃO ALTERNATIVA: Usa os dados do login
            setUser({ name: login, role: 'admin' });
            
            return { success: true };
            
        } catch (error) {
            console.error('Erro no login:', error);
            // Seu log original mostrava: AuthContext.jsx:33
            // É aqui que o erro de 404 será capturado.
            return { 
                success: false, 
                // Tenta pegar a mensagem de erro do backend ou usa uma genérica
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