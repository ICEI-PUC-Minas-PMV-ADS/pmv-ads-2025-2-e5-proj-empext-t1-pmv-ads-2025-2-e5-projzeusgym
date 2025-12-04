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
            const response = await api.post('/adminLogin/login', { login, password });
            // Só autentica se status for 200 e token válido
            if (response.status === 200 && response.data.token) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // Salva o role retornado pelo backend
                setUser({ name: login, role: response.data.role });
                return { success: true };
            } else {
                return { success: false, message: response.data.message || 'Login não autorizado.' };
            }
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
