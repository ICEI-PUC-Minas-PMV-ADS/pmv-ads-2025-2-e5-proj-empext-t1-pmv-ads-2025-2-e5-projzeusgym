import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroFichaTreino.css'; 

// URL base da sua API
const baseURL = 'http://localhost:3000';

const ManageFichasTreino = () => {
    const navigate = useNavigate();
    const [fichas, setFichas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState(null);
    
    const token = localStorage.getItem('token'); 

    // --- Função auxiliar para navegação ---
    const handleNavigate = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    // --- 1. FUNÇÃO PARA CARREGAR AS FICHAS ---
    const fetchFichas = useCallback(async () => {
        setLoading(true);
        setMensagem(null);
        
        try {
            const response = await fetch(`${baseURL}/trainingsheets`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                // Tenta ler o erro do corpo da resposta, se houver
                const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
                throw new Error(`Falha ao carregar as fichas de treino. Status: ${response.status}. Detalhe: ${errorData.message}`);
            }

            const data = await response.json();
            
            // Se a API retornar a lista diretamente (que é o esperado)
            setFichas(data); 

        } catch (err) {
            setMensagem({ type: 'error', text: `Erro ao buscar fichas: ${err.message}` });
            setFichas([]);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchFichas();
    }, [fetchFichas]);


    // --- 2. FUNÇÕES DE AÇÃO ---

    const handleVerFicha = (fichaId) => {
        navigate(`/fichas-treino/${fichaId}/view`);
    };

    const handleEditarFicha = (fichaId) => {
        navigate(`/fichas-treino/${fichaId}/edit`);
    };

    const handleDeletarFicha = async (fichaId, titulo) => {
        if (!window.confirm(`Tem certeza que deseja DELETAR a ficha "${titulo}" (ID: ${fichaId})? Esta ação é irreversível!`)) {
            return;
        }

        setMensagem({ type: 'info', text: `Deletando ficha "${titulo}"...` });

        try {
            const response = await fetch(`${baseURL}/trainingsheets/${fichaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
                throw new Error(`Falha ao deletar a ficha. Detalhe: ${errorData.message}`);
            }

            setMensagem({ type: 'success', text: `Ficha "${titulo}" deletada com sucesso!` });
            fetchFichas(); // Recarrega a lista após a exclusão

        } catch (err) {
            setMensagem({ type: 'error', text: `Erro ao deletar: ${err.message}` });
        }
    };

    // --- 3. RENDERIZAÇÃO DA LINHA DA TABELA (COM CORREÇÃO DE OBJETO) ---
    const renderFichaRow = (ficha) => (
        <tr key={ficha.id}>
            <td>{ficha.id}</td>
            <td>{ficha.titulo || ficha.nome}</td>
            {/* ✅ CORREÇÃO: Verifica se o aluno é um objeto (API) ou uma string (Simulação/Backend) */}
            <td>
                {
                    ficha.aluno && typeof ficha.aluno === 'object' 
                        ? (ficha.aluno.nome || ficha.aluno.name || 'Aluno sem nome')
                        : (ficha.aluno || 'Não Atribuído')
                }
            </td>
            <td>{ficha.dataCriacao ? new Date(ficha.dataCriacao).toLocaleDateString() : '-'}</td>
            <td className="action-buttons-cell">
                <button 
                    className="btn btn-action btn-success" 
                    onClick={() => handleVerFicha(ficha.id)}
                >
                    Ver
                </button>
                <button 
                    className="btn btn-action btn-warning" 
                    onClick={() => handleEditarFicha(ficha.id)}
                >
                    Editar
                </button>
                <button 
                    className="btn btn-action btn-danger" 
                    onClick={() => handleDeletarFicha(ficha.id, ficha.titulo || ficha.nome)}
                >
                    Deletar
                </button>
            </td>
        </tr>
    );


    return (
        <div className="alunos-container">
            {/* HEADER */}
            <header className="alunos-header">
                <div className="header-content-aluno">
                    <div className="button-group-aluno">
                        <button className="header-btn-aluno" onClick={() => handleNavigate('/alunos')}>Gerenciar Alunos</button>
                        <button className="header-btn-aluno" onClick={() => handleNavigate('/cadastrar-ficha')}>Cadastrar Ficha</button> 
                        <button className="header-btn-aluno active">Gerenciar Fichas</button>
                    </div>
                    <div className="icon-group">
                        <div className="profile-icon">
                            <span style={{ fontSize: '24px', color: '#E2760A' }}>&#x1F464;</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="alunos-main">
                <h1 className="header-main-aluno">Gerenciamento de Fichas de Treino</h1>

                <div className="ficha-content-card">
                    {/* Mensagem de Feedback */}
                    {mensagem && (
                        <div className={`${mensagem.type}-message`}>
                            {mensagem.text}
                        </div>
                    )}
                    
                    <div className="list-controls" style={{ justifyContent: 'space-between', marginBottom: '15px' }}>
                        <h2 className="section-title" style={{ margin: 0 }}>Fichas de Treino Cadastradas ({fichas.length})</h2>
                        <div className="button-group-list">
                            <button className="btn btn-success" onClick={() => handleNavigate('/cadastrar-ficha')}>
                                + Cadastrar Nova Ficha
                            </button>
                            <button className="btn btn-secondary" onClick={fetchFichas} disabled={loading}>
                                {loading ? 'Carregando...' : '↻ Recarregar Lista'}
                            </button>
                        </div>
                    </div>

                    <table className="data-table exercises-table">
                        <thead>
                            <tr>
                                <th style={{ width: '5%' }}>ID</th>
                                <th style={{ width: '30%' }}>TÍTULO</th>
                                <th style={{ width: '30%' }}>ALUNO</th>
                                <th style={{ width: '15%' }}>CRIAÇÃO</th>
                                <th style={{ width: '20%' }}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>Carregando dados...</td></tr>
                            ) : fichas.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', fontStyle: 'italic', color: '#777' }}>Nenhuma ficha encontrada.</td></tr>
                            ) : (
                                fichas.map(renderFichaRow)
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="app-footer-aluno">
                 {/* Conteúdo do Footer */}
            </footer>
        </div>
    );
};

export default ManageFichasTreino;