// Arquivo: src/pages/CreateProfessor.jsx
// Objetivo: Orquestrar a tela, importando layout (HeaderAdmin/FooterAdmin) e o formulário reutilizável.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// IMPORTAÇÕES CORRIGIDAS DE COMPONENTES DE LAYOUT
import HeaderAdmin from '../components/HeaderAdmin'; 
import FooterAdmin from '../components/FooterAdmin'; 

// IMPORTAÇÃO DO COMPONENTE DE FORMULÁRIO REUTILIZÁVEL
import ProfessorForm from '../components/ProfessorForm'; 

// Caminhos confirmados:
import api from '../services/api'; 
import './CreateProfessor.css'; // CSS na mesma pasta que o JSX

const CreateProfessor = () => {
    const navigate = useNavigate();
    
    const [mensagem, setMensagem] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const lidarComEnvio = async (formData) => {
        setCarregando(true);
        setMensagem(null);
        
        const token = localStorage.getItem('token');
        if (!token) {
            setMensagem({ type: 'error-msg', text: 'Sessão expirada. Faça login novamente.' });
            setCarregando(false);
            navigate('/adminlogin');
            return;
        }

        try {
            await api.post('admin/professores', formData, { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            
            setMensagem({ type: 'success-msg', text: 'Professor cadastrado com sucesso!' });
            
            setTimeout(() => navigate('/professores/gerenciar'), 2000);

        } catch (erro) {
            const msgErro = erro.response?.data?.error || "Falha ao cadastrar professor. Verifique os dados.";
            setMensagem({ type: 'error-msg', text: msgErro });
            console.error("Erro no cadastro:", erro);

        } finally {
            setCarregando(false);
        }
    };
    
    const lidarComCancelamento = () => {
        navigate('/professores/gerenciar'); 
    };

    return (
        <div className="admin-container"> 
            
            <HeaderAdmin /> 

            <main className="admin-main">
                
                <div className="cadastro-professor-card">
                    
                    <h2>Cadastrar Novo Professor</h2>
                    
                    {/* Mensagem de Feedback */}
                    {mensagem && (
                        <div className={`message ${mensagem.type}`}>
                            {mensagem.text}
                        </div>
                    )}
                    
                    {/* REMOVIDO: O bloco do botão de Voltar/Cancelar que estava em cima! */}
                    {/* <div style={{ marginBottom: '20px' }}>
                        <button 
                            type="button" 
                            className="botao-acao botao-cancelar"
                            onClick={lidarComCancelamento}
                        >
                            Voltar
                        </button>
                    </div> 
                    */}

                    {/* ⭐️ ADICIONADO: O onCancel é passado para o formulário reutilizável */}
                    <ProfessorForm 
                        onSubmit={lidarComEnvio} 
                        onCancel={lidarComCancelamento} 
                        isEditing={false} 
                        disabled={carregando} 
                    />

                </div>

            </main>

            <FooterAdmin />
        </div>
    );
};

export default CreateProfessor;