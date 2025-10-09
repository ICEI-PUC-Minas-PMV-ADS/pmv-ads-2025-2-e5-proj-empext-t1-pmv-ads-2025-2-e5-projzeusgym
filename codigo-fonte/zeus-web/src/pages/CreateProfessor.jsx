// src/pages/CreateProfessor.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessorForm from '../components/ProfessorForm'; // Seu componente de formulário
import api from '../services/api'; // Sua instância de API
import './CreateProfessor.css'; // Importa os estilos, incluindo o layout laranja

const CreateProfessor = () => {
    const navigate = useNavigate();
    // Inicializa o estado 'message'
    const [message, setMessage] = useState(''); 

    const handleCreateSubmit = async (formData) => {
        setMessage('');
        const token = localStorage.getItem('token'); 
        
        if (!token) {
            setMessage('Sessão expirada. Redirecionando...');
            navigate('/adminlogin'); 
            return;
        }

        try {
            // Chamada POST para o backend
            await api.post('/admin/professores', formData, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            setMessage('Professor cadastrado com sucesso!');
            
            // Navega de volta para a lista após o sucesso
            setTimeout(() => navigate('/professores'), 2000); 
            
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Erro ao cadastrar professor. Verifique os dados.';
            setMessage(`Erro: ${errorMessage}`);
            console.error("Erro no cadastro de professor:", err);
        }
    };
    
    // Função auxiliar para navegação nos botões do header
    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        // ✅ 1. CONTAINER PRINCIPAL (usa a classe de layout padronizada)
        <div className="professor-layout-container">
            
            {/* ✅ 2. HEADER LARANJA (usa a classe de layout padronizada) */}
            <header className="layout-header">
                <div className="header-content">
                    <div className="button-group">
                        <button className="header-btn" onClick={() => handleNavigate('/exercicios')}>Gerenciar Exercícios</button>
                        <button className="header-btn" onClick={() => handleNavigate('/professores')}>Gerenciar Professores</button>
                        <button className="header-btn" onClick={() => handleNavigate('/alunos')}>Gerenciar Alunos</button>
                    </div>
                    <div className="icon-group">
                        <div className="profile-icon">
                            <a href="#"> <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="Perfil"
                                className="profile-image"
                            /> </a>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* ✅ 3. CONTEÚDO PRINCIPAL (Main) */}
            <main className="layout-main">
                
                {/* 🛑 SEU CARD BRANCO ORIGINAL - Mantenha a classe 'cadastro-professor-card' */}
                <div className="cadastro-professor-card"> 
                    
                    <h2>Cadastrar Novo Professor</h2>
                    
                    {/* Exibição de mensagens de feedback */}
                    {message && (
                        <p className={`message ${message.includes('sucesso') ? 'success-msg' : 'error-msg'}`}>
                            {message}
                        </p>
                    )}

                    {/* Renderiza o formulário e passa a função de submissão */}
                    <ProfessorForm onSubmit={handleCreateSubmit} />
                    
                    {/* Botão Voltar */}
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <button 
                            type="button" 
                            className="btn-back btn-secondary" 
                            onClick={() => navigate('/professores')}
                        >
                            Voltar para a Lista
                        </button>
                    </div>
                </div>
            </main>

            {/* ✅ 4. FOOTER LARANJA */}
            <footer className="layout-footer">
            </footer>
        </div>
    );
};

export default CreateProfessor;