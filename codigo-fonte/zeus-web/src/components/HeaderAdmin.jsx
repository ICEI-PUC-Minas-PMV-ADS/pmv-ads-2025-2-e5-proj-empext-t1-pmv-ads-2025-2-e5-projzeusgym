import React from 'react';
import { useNavigate } from 'react-router-dom';
// CORREÇÃO: CSS na mesma pasta (components)
import './HeaderAdmin.css'; 

// activePage: 'exercicios', 'professores', ou 'alunos'
const HeaderAdmin = ({ activePage }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        // Redireciona para a rota
        navigate(path);
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
                </div>
                
                {/* Ícone de Perfil */}
                <div className="icon-group">
                    <div className="profile-icon">
                        <a href="#"> 
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="Perfil"
                                className="profile-image"
                                onClick={() => handleNavigate("/dashboard")}
                            /> 
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
