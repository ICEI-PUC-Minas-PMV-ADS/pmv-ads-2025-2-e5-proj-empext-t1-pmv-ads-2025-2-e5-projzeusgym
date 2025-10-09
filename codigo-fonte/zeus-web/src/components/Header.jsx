// src/components/Header.jsx

import React from 'react';
import './Header.css';

// NOTA: Se você usa o React Router, substitua as tags <button> por <Link to="...">

const Header = () => {
    return (
        <header className="alunos-header">
            <div className="header-content">
                {/* Botões de Navegação */}
                <div className="button-group">
                    <button className="header-btn">Gerenciar Exercícios</button>
                    <button className="header-btn">Gerenciar Professores</button>
                    <button className="header-btn">Gerenciar Alunos</button>
                </div>
                
                {/* Ícone de Perfil */}
                <div className="icon-group">
                    <div className="profile-icon">
                        <a href="#"> 
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="Perfil"
                                className="profile-image"
                            /> 
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;