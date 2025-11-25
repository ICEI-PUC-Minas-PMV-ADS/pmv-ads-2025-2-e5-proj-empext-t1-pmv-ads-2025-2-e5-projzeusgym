import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroFichaTreino.css'; 
import { API_BASE_URL } from '../config/api';

const initialExerciseState = {
    nome: '', 
    idExercicio: '', // ID do exercício selecionado no dropdown
    series: '',
    repeticoes: '',
    carga: ''
};

const CadastroFichaDeTreino = () => {
    const navigate = useNavigate();
    
    // --- ESTADOS DA FICHA ---
    const [nomeFicha, setNomeFicha] = useState('');
    const [objetivo, setObjetivo] = useState(''); // O frontend usa 'objetivo'
    const [exerciciosFicha, setExerciciosFicha] = useState([]); 
    const [novoExercicio, setNovoExercicio] = useState(initialExerciseState);
    const [mensagem, setMensagem] = useState(null); 
    
    // --- ESTADOS PARA ALUNOS E EXERCÍCIOS DO BD ---
    const [alunoSelecionadoId, setAlunoSelecionadoId] = useState('');
    const [alunosBD, setAlunosBD] = useState([]);
    const [loadingAlunos, setLoadingAlunos] = useState(true);
    
    const [exerciciosBD, setExerciciosBD] = useState([]);
    const [loadingExercicios, setLoadingExercicios] = useState(true);

    const token = localStorage.getItem('token'); 

    const handleNavigate = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    // --- EFEITO: Carregar a Lista de Alunos do BD ---
    useEffect(() => {
        fetch(`${API_BASE_URL}/admin/alunos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => { throw new Error(error.message || 'Falha ao carregar lista de alunos.'); });
            }
            return response.json();
        })
        .then(data => {
            const alunosArray = Array.isArray(data) ? data : [];
            const processedData = alunosArray.map(aluno => ({
                 ...aluno,
                 nome: aluno.name 
            }));
            
            const sortedData = processedData
                .filter(aluno => aluno && typeof aluno.nome === 'string' && aluno.nome.trim() !== '')
                .sort((a, b) => a.nome.localeCompare(b.nome)); 

            setAlunosBD(sortedData);
            setLoadingAlunos(false);
        })
        .catch((err) => {
            console.error(err);
            setMensagem({ type: 'error', text: `Erro ao carregar lista de alunos: ${err.message}.` });
            setLoadingAlunos(false);
        });
    }, [token]);

    // --- EFEITO: Carregar a Lista de Exercícios do BD ---
    useEffect(() => {
        fetch(`${API_BASE_URL}/admin/exercises`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => { throw new Error(error.message || 'Falha ao carregar exercícios cadastrados.'); });
            }
            return response.json();
        })
        .then(data => {
            const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
            setExerciciosBD(sortedData);
            setLoadingExercicios(false);
        })
        .catch((err) => {
            setMensagem({ type: 'error', text: `Erro ao carregar lista de exercícios: ${err.message}` });
            setLoadingExercicios(false);
        });
    }, [token]);


    // --- Lógica de Manipulação da Ficha ---
    const handleAddExercicio = () => {
        if (!novoExercicio.idExercicio || !novoExercicio.series || !novoExercicio.repeticoes) {
            setMensagem({ type: 'error', text: 'Selecione o Nome do Exercício e preencha Séries e Repetições.' });
            return;
        }

        const exercicioParaAdicionar = {
            ...novoExercicio,
            carga: novoExercicio.carga || '-',
            // Encontra o nome completo para exibição na tabela
            nome: exerciciosBD.find(ex => ex.id === parseInt(novoExercicio.idExercicio))?.nome || 'Exercício Desconhecido'
        };

        setExerciciosFicha([...exerciciosFicha, exercicioParaAdicionar]);
        setNovoExercicio(initialExerciseState);
        setMensagem({ type: 'success', text: `Exercício '${exercicioParaAdicionar.nome}' adicionado à ficha.` });
    };

    const handleRemoveExercicio = (index) => {
        const nomeEx = exerciciosFicha[index].nome;
        const updatedExercicios = exerciciosFicha.filter((_, i) => i !== index);
        setExerciciosFicha(updatedExercicios);
        setMensagem({ type: 'info', text: `Exercício '${nomeEx}' removido da lista da ficha.` });
    };

    const handleCadastrarFicha = () => {
        if (!alunoSelecionadoId || !nomeFicha || exerciciosFicha.length === 0) {
            setMensagem({ type: 'error', text: 'Preencha o nome, selecione um aluno e adicione pelo menos um exercício.' });
            return;
        }

        const fichaCompleta = {
            nome: nomeFicha,
            // ⭐️ CORREÇÃO 1: Mapeando 'objetivo' (frontend) para 'descricao' (backend)
            descricao: objetivo,
            // ⭐️ CORREÇÃO 2: Chave do Aluno CORRETA: 'alunoId'
            alunoId: alunoSelecionadoId, 
            // ⭐️ CORREÇÃO 3: Chave do array de exercícios CORRETA: 'exercises'
            exercises: exerciciosFicha.map(ex => ({ 
                // ⭐️ CORREÇÃO 4: Chave do ID do exercício CORRETA: 'exerciseId'
                exerciseId: ex.idExercicio, 
                series: ex.series,
                repeticoes: ex.repeticoes,
                carga: ex.carga === '-' ? '0' : ex.carga,
                descanso: 'N/A' // O seu controller espera descanso, enviando um valor padrão.
            })), 
            dataCriacao: new Date().toISOString(),
        };

        console.log('Ficha de Treino a ser salva:', fichaCompleta);
        setMensagem({ type: 'info', text: 'Enviando ficha para o servidor...' });
        
        // Lógica para enviar dados à API/backend
        fetch(`${API_BASE_URL}/trainingsheets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fichaCompleta),
        })
        .then(async response => {
            if (!response.ok) {
                // Tratamento de erro aprimorado
                const errorText = await response.text();
                let errorMessage = 'Falha ao cadastrar a ficha (Erro 400).';
                try {
                    const errorData = JSON.parse(errorText);
                    // O erro: "Os campos nome (título da ficha) e alunoId (aluno) são obrigatórios" deve sumir agora!
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    console.error("Erro JSON não lido:", errorText);
                }
                throw new Error(errorMessage);
            }
            return response.json();
        })
        .then(() => {
            setMensagem({ type: 'success', text: `Ficha '${nomeFicha}' cadastrada com sucesso! Redirecionando...` });
            setTimeout(() => navigate('/fichas-treino'), 2000); 
        })
        .catch((err) => {
            setMensagem({ type: 'error', text: `Erro no cadastro: ${err.message}` });
        });
    };

    const renderExercicioRow = (item, index) => (
        <tr key={index}>
            <td>{item.nome}</td>
            <td>{item.series}</td>
            <td>{item.repeticoes}</td>
            <td>{item.carga || '-'}</td>
            <td style={{ width: '100px', textAlign: 'center' }}>
                <button 
                    onClick={() => handleRemoveExercicio(index)}
                    className="btn btn-danger btn-action" 
                    title="Remover Exercício"
                >
                    Remover
                </button>
            </td>
        </tr>
    );


    return (
        <div className="alunos-container">
            <header className="alunos-header">
                <div className="header-content-aluno">
                    <div className="button-group-aluno">
                        <button className="header-btn-aluno" onClick={() => handleNavigate('/alunos')}>Gerenciar Alunos</button>
                        <button className="header-btn-aluno active">Cadastrar Ficha</button> 
                        <button 
                            className="header-btn-aluno" 
                            onClick={() => handleNavigate('/fichas-treino')}
                        >
                            Gerenciar Fichas
                        </button>
                    </div>
                    <div className="icon-group">
                         <div className="profile-icon">
                             <span style={{ fontSize: '24px', color: '#E2760A' }}>&#x1F464;</span>
                         </div>
                    </div>
                </div>
            </header>

            <main className="alunos-main">
                <h1 className="header-main-aluno">Cadastro de Ficha de Treino</h1>

                <div className="ficha-content-card">
                    {/* Mensagem de Feedback */}
                    {mensagem && (
                        <div className={`${mensagem.type}-message`}>
                            {mensagem.text}
                        </div>
                    )}

                    <div className="ficha-form">
                        
                        {/* 1. Dados Principais da Ficha */}
                        <div className="list-controls" style={{ border: 'none', marginBottom: '0px' }}>
                           <h2 className="section-title">Informações da Ficha</h2>
                        </div>
                        
                        <div className="form-group-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr'}}>
                            {/* CAMPO: SELEÇÃO DE ALUNO */}
                            <div className="form-group full-width">
                                <label htmlFor="alunoId">Aluno (Obrigatório)</label>
                                {loadingAlunos ? (
                                    <input type="text" value="Carregando alunos..." disabled />
                                ) : (
                                    <select
                                        id="alunoId"
                                        value={alunoSelecionadoId}
                                        onChange={e => setAlunoSelecionadoId(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Selecione o Aluno --</option>
                                        {alunosBD.map(aluno => (
                                            <option key={aluno.id} value={aluno.id}>
                                                {aluno.nome} ({aluno.email || aluno.id}) 
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            
                            {/* Nome da Ficha */}
                            <div className="form-group full-width">
                                <label htmlFor="nomeFicha">Nome da Ficha</label>
                                <input
                                    id="nomeFicha"
                                    type="text"
                                    placeholder="Ex: Treino A - Peito/Tríceps"
                                    value={nomeFicha}
                                    onChange={e => setNomeFicha(e.target.value)}
                                />
                            </div>
                            
                            {/* Objetivo */}
                            <div className="form-group full-width">
                                <label htmlFor="objetivo">Objetivo do Treino</label>
                                <input
                                    id="objetivo"
                                    type="text"
                                    placeholder="Ex: Hipertrofia, Força, Resistência"
                                    value={objetivo}
                                    // Mapeado como 'objetivo' aqui, mas enviado como 'descricao' no fetch.
                                    onChange={e => setObjetivo(e.target.value)} 
                                />
                            </div>
                        </div>
                        
                        {/* 2. Lista de Exercícios Adicionados à Ficha */}
                        <div className="list-controls">
                           <h2 className="section-title">Exercícios na Ficha ({exerciciosFicha.length})</h2>
                        </div>
                        
                        <table className="data-table exercises-table">
                            <thead>
                                <tr>
                                    <th>Exercício</th>
                                    <th style={{ width: '10%' }}>Séries</th>
                                    <th style={{ width: '15%' }}>Repetições</th>
                                    <th style={{ width: '15%' }}>Carga (kg)</th>
                                    <th style={{ width: '100px' }}>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exerciciosFicha.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', fontStyle: 'italic', color: '#777' }}>
                                            Adicione exercícios na seção abaixo.
                                        </td>
                                    </tr>
                                ) : (
                                    exerciciosFicha.map(renderExercicioRow)
                                )}
                            </tbody>
                        </table>


                        {/* 3. Formulário para Adicionar Novo Exercício SELECIONADO */}
                        <div className="list-controls">
                           <h2 className="section-title">Adicionar Exercício Cadastrado</h2>
                        </div>
                        
                        <div className="form-group-grid" style={{ gridTemplateColumns: '1fr 0.5fr 0.5fr 0.5fr'}}>
                            
                            {/* CAMPO DE SELEÇÃO DO EXERCÍCIO (Puxado do BD) */}
                            <div className="form-group">
                                <label htmlFor="idExercicio">Nome do Exercício</label>
                                {loadingExercicios ? (
                                    <input type="text" value="Carregando..." disabled />
                                ) : (
                                    <select
                                        id="idExercicio"
                                        value={novoExercicio.idExercicio} 
                                        // Armazena o ID do exercício selecionado (que será enviado como 'exerciseId')
                                        onChange={e => setNovoExercicio({...novoExercicio, idExercicio: e.target.value})} 
                                        required
                                    >
                                        <option value="">-- Selecione o Exercício --</option>
                                        {exerciciosBD.map(ex => (
                                            <option key={ex.id} value={ex.id}>
                                                {ex.nome} ({ex.exerGrupo})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Séries */}
                            <div className="form-group">
                                <label htmlFor="series">Séries</label>
                                <input
                                    id="series"
                                    type="number"
                                    min="1"
                                    placeholder="Ex: 3"
                                    value={novoExercicio.series}
                                    onChange={e => setNovoExercicio({...novoExercicio, series: e.target.value})}
                                />
                            </div>

                            {/* Repetições */}
                            <div className="form-group">
                                <label htmlFor="repeticoes">Repetições</label>
                                <input
                                    id="repeticoes"
                                    type="number"
                                    min="1"
                                    placeholder="Ex: 10"
                                    value={novoExercicio.repeticoes}
                                    onChange={e => setNovoExercicio({...novoExercicio, repeticoes: e.target.value})}
                                />
                            </div>

                            {/* Carga */}
                            <div className="form-group">
                                <label htmlFor="carga">Carga (Opcional - kg)</label>
                                <input
                                    id="carga"
                                    type="number"
                                    min="0"
                                    placeholder="Ex: 50"
                                    value={novoExercicio.carga}
                                    onChange={e => setNovoExercicio({...novoExercicio, carga: e.target.value})}
                                />
                            </div>
                        </div>
                        
                        <button className="btn btn-primary" onClick={handleAddExercicio} disabled={loadingExercicios}>
                            + Adicionar Exercício Selecionado
                        </button>
                        
                        {/* 4. Botões de Ação Final */}
                        <div className="action-buttons-footer">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => {
                                    setAlunoSelecionadoId('');
                                    setNomeFicha('');
                                    setObjetivo('');
                                    setExerciciosFicha([]);
                                    setNovoExercicio(initialExerciseState);
                                    setMensagem({ type: 'info', text: 'Formulário limpo e resetado.' });
                                }}
                            >
                                Limpar Formulário
                            </button>
                            <button 
                                className="btn btn-primary" 
                                onClick={handleCadastrarFicha}
                                disabled={loadingAlunos || loadingExercicios || !alunoSelecionadoId} 
                            >
                                **CADASTRAR FICHA COMPLETA**
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="app-footer-aluno">
                {/* Conteúdo do Footer */}
            </footer>
        </div>
    );
};

export default CadastroFichaDeTreino;
