import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CadastroFichaTreino.css'; // Reutilizando o CSS para layout

const baseURL = 'https://teste-zeusgym-50b8de268016.herokuapp.com';

const ViewFichaTreino = () => {
    const navigate = useNavigate();
    const { id: fichaId } = useParams(); // Captura o ID da URL
    
    const [ficha, setFicha] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState(null); 

    const token = localStorage.getItem('token'); 

    // --- Função auxiliar para navegação ---
    const handleNavigate = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    // --- Efeito para Carregar Dados da Ficha ---
    useEffect(() => {
        if (!fichaId) {
            setMensagem({ type: 'error', text: 'ID da Ficha não fornecido.' });
            setLoading(false);
            return;
        }

        setLoading(true);
        setMensagem(null);
        
        // Rota GET para buscar UMA ficha: /trainingsheets/:id
        fetch(`${baseURL}/trainingsheets/${fichaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                // Se a API retornar 404 ou erro, lança exceção
                throw new Error('Ficha não encontrada ou falha ao carregar os dados.');
            }
            return response.json();
        })
        .then(data => {
            // Assume que a API retorna o objeto da ficha
            setFicha(data); 
            setMensagem({ type: 'success', text: `Ficha ID ${fichaId} carregada com sucesso!` });
        })
        .catch((err) => {
            setMensagem({ type: 'error', text: `Erro ao carregar a ficha: ${err.message}` });
            setFicha(null);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [fichaId, token]);


    // --- Renderização da Linha da Tabela de Exercícios ---
    const renderExercicioRow = (item, index) => {
        // Acessa as propriedades da tabela de associação (pivô)
        const details = item.TrainingSheetExercises || item.through || {}; 

        return (
            <tr key={index}>
                <td>{item.nome || item.name || '-'}</td>
                <td>{details.series || '-'}</td>
                <td>{details.repeticoes || '-'}</td>
                <td>{details.carga === 0 ? '0' : (details.carga || '-')}</td>
            </tr>
        );
    };

    // --- Status de Carregamento e Erro (Mantido) ---
    if (loading) {
        return (
            <div className="alunos-container">
                <main className="alunos-main">
                    <h1 className="header-main-aluno">Visualização de Ficha</h1>
                    <div className="ficha-content-card">
                        <p>Carregando dados da ficha ID: {fichaId}...</p>
                        {mensagem && <div className={`${mensagem.type}-message`}>{mensagem.text}</div>}
                    </div>
                </main>
            </div>
        );
    }

    if (!ficha) {
        return (
            <div className="alunos-container">
                <main className="alunos-main">
                    <h1 className="header-main-aluno">Ficha Não Encontrada</h1>
                    <div className="ficha-content-card">
                        <p style={{ color: 'red', fontWeight: 'bold' }}>Não foi possível carregar a ficha ou ela não existe.</p>
                        {mensagem && <div className={`${mensagem.type}-message`}>{mensagem.text}</div>}
                        <div className="action-buttons-footer">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => handleNavigate('/fichas-treino')}
                            >
                                Voltar ao Gerenciamento
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
    
    // --- Variáveis de Exibição (CORRIGIDO) ---
    const alunoNome = ficha.aluno ? ficha.aluno.name : 'Não Atribuído';
    const exercisesList = ficha.exercises || [];
    const dataCriacaoFormatada = ficha.createdAt ? new Date(ficha.createdAt).toLocaleDateString() : '-'; // Usando createdAt, que vem da API
    
    // --- Renderização Principal (Ficha Carregada) ---
    return (
        <div className="alunos-container">
            <header className="alunos-header">
                <div className="header-content-aluno">
                    <div className="button-group-aluno">
                        <button className="header-btn-aluno" onClick={() => handleNavigate('/alunos')}>Gerenciar Alunos</button>
                        <button className="header-btn-aluno" onClick={() => handleNavigate('/cadastrar-ficha')}>Cadastrar Ficha</button> 
                        <button className="header-btn-aluno active" onClick={() => handleNavigate('/fichas-treino')}>Gerenciar Fichas</button>
                    </div>
                    <div className="icon-group">
                        <div className="profile-icon">
                            <span style={{ fontSize: '24px', color: '#E2760A' }}>&#x1F464;</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="alunos-main">
                <h1 className="header-main-aluno">Visualizar Ficha de Treino: {ficha.nome} (ID: {fichaId})</h1>

                <div className="ficha-content-card">
                    {mensagem && (
                        <div className={`${mensagem.type}-message`}>
                            {mensagem.text}
                        </div>
                    )}

                    {/* 1. Dados Principais da Ficha (Somente Leitura) */}
                    <div className="list-controls" style={{ border: 'none', marginBottom: '0px' }}>
                        <h2 className="section-title">Informações da Ficha</h2>
                    </div>
                    <div className="form-group-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="view-field">
                            <label>Nome da Ficha:</label>
                            <p className="view-value">{ficha.nome}</p>
                        </div>
                        <div className="view-field">
                            <label>Objetivo do Treino:</label>
                            <p className="view-value">{ficha.descricao}</p> {/* CORRIGIDO: Usando 'descricao' */}
                        </div>
                        <div className="view-field">
                            <label>Aluno Atribuído:</label>
                            <p className="view-value">{alunoNome}</p> {/* CORRIGIDO */}
                        </div>
                        <div className="view-field">
                            <label>Data de Criação:</label>
                            <p className="view-value">{dataCriacaoFormatada}</p> {/* CORRIGIDO */}
                        </div>
                    </div>
                    
                    <hr style={{ margin: '20px 0', borderColor: '#ccc' }} />

                    {/* 2. Tabela de Exercícios (Somente Leitura) */}
                    <div className="list-controls">
                       <h2 className="section-title">Exercícios da Ficha ({exercisesList.length})</h2> {/* CORRIGIDO */}
                    </div>
                    
                    <table className="data-table exercises-table">
                        <thead>
                            <tr>
                                <th>Exercício</th>
                                <th style={{ width: '10%' }}>Séries</th>
                                <th style={{ width: '15%' }}>Repetições</th>
                                <th style={{ width: '15%' }}>Carga (kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercisesList.length > 0 ? (
                                exercisesList.map(renderExercicioRow)
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', fontStyle: 'italic', color: '#777' }}>
                                        Nenhum exercício encontrado nesta ficha.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Botões de Ação para Navegação */}
                    <div className="action-buttons-footer" style={{ justifyContent: 'flex-end' }}>
                        <button 
                            className="btn btn-warning"
                            onClick={() => handleNavigate(`/fichas-treino/${fichaId}/edit`)}
                        >
                            ✏️ **Editar esta Ficha**
                        </button>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => handleNavigate('/fichas-treino')} 
                        >
                            Voltar ao Gerenciamento
                        </button>
                    </div>
                </div>
            </main>

            <footer className="app-footer-aluno">
                {/* Conteúdo do Footer */}
            </footer>
        </div>
    );
};

export default ViewFichaTreino;