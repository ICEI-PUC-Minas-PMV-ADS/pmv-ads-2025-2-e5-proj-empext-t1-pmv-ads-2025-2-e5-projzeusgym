import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
// CORREÇÃO: CSS na mesma pasta (components)
import './HeaderAdmin.css'; 

// activePage: 'exercicios', 'professores', 'alunos', 'fichas', ou 'avaliacoes'
const HeaderAdmin = ({ activePage }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        // Redireciona para a rota
        navigate(path);
    };

    const handleLogout = () => {
        // Confirmar logout
        if (window.confirm('Tem certeza que deseja sair?')) {
            // Limpar dados de autenticação
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userRole');
            
            // Redirecionar para página de login
            navigate('/login');
        }
    };

    return (
        <header className="alunos-header">
            <div className="header-content-aluno">
                <div className="button-group-aluno">
                    {/* Botão Gerenciar Exercícios */}
                    <button 
                        className={`header-btn-aluno ${activePage === 'exercicios' ? 'active' : ''}`}
                        onClick={() => handleNavigate('/gerenciarexercicios')}
                    >
                        Gerenciar Exercícios
                    </button>
                    {/* Botão Gerenciar Professores */}
                    <button 
                        className={`header-btn-aluno ${activePage === 'professores' ? 'active' : ''}`}
                        onClick={() => handleNavigate('/professores/gerenciar')}
                    >
                        Gerenciar Professores
                    </button>
                    {/* Botão Gerenciar Alunos */}
                    <button 
                        className={`header-btn-aluno ${activePage === 'alunos' ? 'active' : ''}`}
                        onClick={() => handleNavigate('/alunos')}
                    >
                        Gerenciar Alunos
                    </button>
                    {/* Botão Gerenciar Fichas de Treino */}
                    <button 
                        className={`header-btn-aluno ${activePage === 'fichas' ? 'active' : ''}`}
                        onClick={() => handleNavigate('/manage-fichas-treino')}
                    >
                        Fichas de Treino
                    </button>
                    {/* Botão Gerenciar Avaliações */}
                    <button 
                        className={`header-btn-aluno ${activePage === 'avaliacoes' ? 'active' : ''}`}
                        onClick={() => handleNavigate('/gerenciar-avaliacoes')}
                    >
                        Avaliações Físicas
                    </button>
                </div>
                
                {/* Grupo de Ícones */}
                <div className="icon-group">
                    {/* Ícone de Perfil */}
                    <div className="profile-icon">
                        <a href="#"> 
                            <img
                                src="/assets/braco.png"
                                alt="Perfil"
                                className="profile-image"
                                onClick={() => handleNavigate("/dashboard")}
                            /> 
                        </a>
                    </div>
                    {/* Botão de Logout */}
                    <button 
                        className="logout-btn"
                        onClick={handleLogout}
                        title="Sair do sistema"
                    >
                        <FaSignOutAlt />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
