// src/pages/CreateProfessor.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessorForm from '../components/ProfessorForm'; 
import api from '../services/api'; 
import './CreateProfessor.css'; 

// 🎯 IMPORTAÇÃO DOS COMPONENTES REUTILIZÁVEIS
import HeaderAdmin from '../components/HeaderAdmin'; 
import FooterAdmin from '../components/FooterAdmin'; 
// Importa o CSS de layout comum para aplicar as classes do container
import '../styles/AdminLayout.css'; 


const CreateProfessor = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(''); 

    const handleCreateSubmit = async (formData) => {
        setMessage('');
        const token = localStorage.getItem('token'); 
        
        if (!token) {
            setMessage('Sessão expirada. Redirecionando...');
            setTimeout(() => navigate('/adminlogin'), 1500);
            return;
        }

        try {
            await api.post('/admin/professores', formData, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            setMessage('Professor cadastrado com sucesso!');
            setTimeout(() => navigate('/professores'), 2000); 
            
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Erro ao cadastrar professor. Verifique os dados.';
            setMessage(`Erro: ${errorMessage}`);
            console.error("Erro no cadastro de professor:", err);
        }
    };
    
    // Usa a classe de layout padronizada (.alunos-container)
    return (
        <div className="alunos-container">
            
            {/* COMPONENTE HEADER - Botão "Gerenciar Professores" ativo */}
            <HeaderAdmin activePage="professores" /> 
            
            {/* Main usa a classe de layout padronizada (.alunos-main) */}
            <main className="alunos-main"> 
                
                {/* Seu card de cadastro específico */}
                <div className="cadastro-professor-card"> 
                    
                    <h2>Cadastrar Novo Professor</h2>
                    
                    {message && (
                        <p className={`message ${message.includes('sucesso') ? 'success-msg' : 'error-msg'}`}>
                            {message}
                        </p>
                    )}

                    <ProfessorForm onSubmit={handleCreateSubmit} />
                    
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

            {/* COMPONENTE FOOTER */}
            <FooterAdmin />
        </div>
    );
};

export default CreateProfessor;