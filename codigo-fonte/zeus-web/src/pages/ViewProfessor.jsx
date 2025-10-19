import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; 
// Importações de Componentes
import HeaderAdmin from '../components/HeaderAdmin'; 
import FooterAdmin from '../components/FooterAdmin'; 

import './ViewProfessor.css'; // Usando o CSS dedicado para estilização

const ViewProfessor = () => {
    const { id } = useParams(); // Pega o ID (ex: 4) da URL
    const navigate = useNavigate();

    const [professor, setProfessor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para buscar os detalhes do professor (GET /admin/professores/:id)
    const fetchProfessorDetails = useCallback(async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token'); 
        
        if (!token) {
            // Se não houver token, redireciona para o login
            navigate('/adminlogin'); 
            return;
        }

        try {
            // Requisição GET para buscar os dados do professor pelo ID
            const response = await api.get(`/admin/professores/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfessor(response.data);
            
        } catch (err) {
            setError("Erro ao carregar detalhes do professor. Verifique o ID e o backend.");
            console.error("Erro ao buscar professor:", err);
            
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        fetchProfessorDetails();
    }, [fetchProfessorDetails]);


    if (loading) return <p className="loading-msg">Carregando detalhes do professor...</p>;
    if (error) return <p className="error-msg">{error}</p>;
    if (!professor) return <p className="error-msg">Professor não encontrado.</p>;

    return (
        <div className="alunos-container"> 
            
            <HeaderAdmin activePage="professores" />

            <main className="alunos-main">
                
                <div className="header-main-aluno">
                    Visualizar Professor (ID: {professor.id})
                </div>
                
                <div className="manage-container view-professor-card">
                    
                    {/* Mensagem de feedback */}
                    <div className="success-message">
                        Professor ID {professor.id} carregado com sucesso!
                    </div>

                    <div className="professor-details">
                        
                        {/* 🌟 NOME EM DESTAQUE E CENTRALIZADO 🌟 */}
                        <div className="professor-name-display">
                           {professor.name}
                        </div>
                        
                        <h3>Informações Pessoais</h3>
                        
                        {/* Detalhes do Professor */}
                        <div className="detail-row">
                            <p><strong>Email:</strong></p>
                            <span>{professor.email}</span>
                        </div>
                        <div className="detail-row">
                            <p><strong>CREF/MG:</strong></p>
                            <span>{professor.cref_mg}</span>
                        </div>
                        <div className="detail-row">
                            <p><strong>Data de Criação:</strong></p>
                            <span>{new Date(professor.createdAt).toLocaleDateString()}</span>
                        </div>

                        {/* Botões de Ação */}
                        <div className="action-buttons-view">
                            <button 
                                className="btn-edit" 
                                onClick={() => navigate(`/professores/editar/${professor.id}`)}
                            >
                                Editar Professor
                            </button>
                            <button 
                                className="btn-back" 
                                onClick={() => navigate('/professores')}
                            >
                                Voltar ao Gerenciamento
                            </button>
                        </div>

                    </div>
                </div> 

            </main>

            <FooterAdmin />
        </div>
    );
};

export default ViewProfessor;