import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CadastroFichaTreino.css'; 

import HeaderAdmin from '../components/HeaderAdmin'; 
import FooterAdmin from '../components/FooterAdmin'; 
import '../styles/LayoutBase.css';

const baseURL = ' https://guarded-shelf-40573-5295222ff305.herokuapp.com';

const initialExerciseState = {
    idExercicio: '', 
    nome: '', 
    series: '',
    repeticoes: '',
    carga: ''
};

// FUNÇÃO UTILITY CRÍTICA: TRATA NULL/UNDEFINED E CONVERTE PARA STRING
const safeString = (value) => {
    // Retorna string vazia se o valor for null ou undefined. Senão, converte para String.
    return value != null ? String(value) : '';
};

const EditFichaTreino = () => {
    const navigate = useNavigate();
    const { id: fichaId } = useParams();
    
    const [nomeFicha, setNomeFicha] = useState('');
    const [descricao, setDescricao] = useState(''); 
    
    const [exerciciosFicha, setExerciciosFicha] = useState([]); 
    const [novoExercicio, setNovoExercicio] = useState(initialExerciseState); 
    const [mensagem, setMensagem] = useState(null); 
    
    const [isLoading, setIsLoading] = useState(true); 

    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState(''); 
    const [exerciciosBD, setExerciciosBD] = useState([]);

    const token = localStorage.getItem('token'); 

    // --- Efeito 1: Carregar Listas Essenciais (Alunos e Exercícios) ---
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const promises = [
                fetch(`${baseURL}/admin/alunos`, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                }).then(res => res.json()),
                fetch(`${baseURL}/admin/exercises`, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                }).then(res => res.json())
            ];

            try {
                const [alunosData, exerciciosBDData] = await Promise.all(promises);

                if (isMounted) {
                    const safeAlunosData = Array.isArray(alunosData) ? alunosData : [];
                    
                    // ✅ CORREÇÃO: Usando 'name' para filtrar e ordenar, conforme o retorno do Backend
                    const sortedAlunos = safeAlunosData
                        .filter(a => a && a.name) // Filtra pela propriedade 'name'
                        .sort((a, b) => a.name.localeCompare(b.name)); // Ordena pela propriedade 'name'

                    setAlunos(sortedAlunos);

                    const safeExerciciosData = Array.isArray(exerciciosBDData) ? exerciciosBDData : [];
                    const sortedExercicios = safeExerciciosData
                        .filter(ex => ex && ex.nome)
                        .sort((a, b) => a.nome.localeCompare(b.nome));

                    setExerciciosBD(sortedExercicios);
                }

            } catch (err) {
                console.error("Erro ao carregar listas essenciais:", err);
                if (isMounted) {
                    setMensagem({ type: 'error', text: `Erro ao carregar dados iniciais: ${err.message}.` });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [token]);

    // --- Efeito 2: Carregar Dados da Ficha a ser Editada ---
    useEffect(() => {
        // CRÍTICO: Só tenta carregar a ficha se já tiver os dados mínimos necessários (alunos)
        if (alunos.length === 0 && fichaId) {
             // Se estiver carregando, espera. Se não estiver, prossegue para dar a mensagem de erro.
             if (isLoading) return;
        }

        if (!fichaId) {
            setMensagem({ type: 'error', text: 'ID da Ficha não fornecido.' });
            setIsLoading(false);
            return;
        }

        fetch(`${baseURL}/trainingsheets/${fichaId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ficha não encontrada ou falha ao carregar.');
            }
            return response.json();
        })
        .then(data => {
            
            const idDoAlunoDaFicha = data.alunoId || data.aluno?.id;
            
            setNomeFicha(data.nome || '');
            setDescricao(data.descricao || ''); 
            
            // ✅ CORREÇÃO 1: Conversão robusta do ID para STRING para o <select>
            setAlunoSelecionado(safeString(idDoAlunoDaFicha)); 
            
            // Tratamento dos exercícios carregados
            const loadedExercises = (data.exercises || []).map(ex => {
                const sheetData = ex.TrainingSheetExercises || {};
                
                return {
                    idExercicio: safeString(ex.id), 
                    nome: ex.nome, 
                    // Carrega os dados da tabela de associação
                    series: safeString(sheetData.series), 
                    repeticoes: safeString(sheetData.repeticoes),
                    carga: safeString(sheetData.carga)          
                };
            });

            setExerciciosFicha(loadedExercises); 
            setMensagem({ type: 'info', text: `Ficha ID ${fichaId} carregada com sucesso!` });
        })
        .catch((err) => {
            setMensagem({ type: 'error', text: `Erro ao carregar a ficha: ${err.message}` });
        })
        .finally(() => {
            setIsLoading(false);
        });

    }, [fichaId, token, alunos.length]); // Dependência de alunos.length forçará recarregar após a lista de alunos

    // --- Lógica de Manipulação dos Exercícios ---
    const handleAddExercicio = () => {
        if (!novoExercicio.idExercicio || !novoExercicio.series || !novoExercicio.repeticoes) {
            setMensagem({ type: 'error', text: 'Selecione o Exercício e preencha Séries e Repetições.' });
            return;
        }

        const selectedEx = exerciciosBD.find(ex => safeString(ex.id) === novoExercicio.idExercicio);
        
        const isDuplicate = exerciciosFicha.some(ex => ex.idExercicio === novoExercicio.idExercicio);
        if (isDuplicate) {
            setMensagem({ type: 'error', text: `O exercício '${selectedEx?.nome || 'Selecionado'}' já foi adicionado.` });
            return;
        }

        const exercicioParaAdicionar = { 
            ...novoExercicio, 
            nome: selectedEx?.nome || 'Exercício Desconhecido',
            carga: novoExercicio.carga === '' ? '0' : novoExercicio.carga
        };

        setExerciciosFicha([...exerciciosFicha, exercicioParaAdicionar]);
        setNovoExercicio(initialExerciseState); 
        setMensagem({ type: 'success', text: `Exercício '${exercicioParaAdicionar.nome}' adicionado à lista de edições.` });
    };

    const handleRemoveExercicio = (index) => {
        const nomeEx = exerciciosFicha[index].nome;
        const updatedExercicios = exerciciosFicha.filter((_, i) => i !== index);
        setExerciciosFicha(updatedExercicios);
        setMensagem({ type: 'info', text: `Exercício '${nomeEx}' removido da lista da ficha.` });
    };


    // --- Função: Salvar Edição ---
    const handleSalvarEdicao = () => {
        if (!nomeFicha || !descricao || exerciciosFicha.length === 0 || !alunoSelecionado) {
            setMensagem({ type: 'error', text: 'Preencha todos os campos e adicione pelo menos um exercício.' });
            return;
        }
        
        const fichaAtualizada = {
            nome: nomeFicha,
            descricao: descricao,
            alunoId: alunoSelecionado, 
            exercises: exerciciosFicha.map(ex => ({
                exerciseId: ex.idExercicio, 
                series: ex.series,
                repeticoes: ex.repeticoes,
                // Envia NULL se for 0 ou string vazia, para o banco de dados
                carga: (ex.carga === '' || ex.carga === '0' || ex.carga === 0) ? null : ex.carga, 
                descanso: 'N/A', 
            })), 
        };

        setMensagem({ type: 'info', text: `Enviando atualização para Ficha ID ${fichaId}...` });

        fetch(`${baseURL}/trainingsheets/${fichaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fichaAtualizada),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || 'Falha ao salvar a edição da ficha.');
                }).catch(() => {
                    throw new Error('Falha ao salvar a edição da ficha.');
                });
            }
            return response.json();
        })
        .then(() => {
            setMensagem({ type: 'success', text: `Ficha '${nomeFicha}' (ID: ${fichaId}) atualizada com sucesso!` });
            setTimeout(() => navigate('/fichas-treino'), 2000); 
        })
        .catch((err) => {
            setMensagem({ type: 'error', text: `Erro ao salvar: ${err.message}` });
        });
    };

    // --- Renderização de Linhas ---
    const renderExercicioRow = (item, index) => (
        <tr key={index}>
            <td>{item.nome}</td>
            <td>{safeString(item.series)}</td>
            <td>{safeString(item.repeticoes)}</td>
            {/* Se for string vazia ('') ou '0', exibe '0' na tabela para fins visuais */}
            <td>{item.carga === '' ? '0' : safeString(item.carga)}</td> 
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

    // --- Loading States ---
    if (isLoading) {
        return (
            <div className="alunos-container">
                <HeaderAdmin activePage="fichas-treino" />
                <main className="alunos-main">
                    <h1 className="header-main-aluno">Carregando Ficha...</h1>
                    <p>Aguarde enquanto os dados da ficha ID: **{fichaId}** são carregados.</p>
                    {mensagem && <div className={`${mensagem.type}-message`}>{mensagem.text}</div>}
                </main>
                <FooterAdmin />
            </div>
        );
    }

    if (!fichaId && !isLoading) {
        return (
             <div className="alunos-container">
                <HeaderAdmin activePage="fichas-treino" />
                <main className="alunos-main">
                    <h1 className="header-main-aluno">Erro na Ficha</h1>
                    {mensagem && <div className={`${mensagem.type}-message`}>{mensagem.text}</div>}
                    <button 
                        className="btn btn-secondary"
                        onClick={() => navigate('/fichas-treino')}
                        style={{ marginTop: '20px' }}
                    >
                        Voltar para Gerenciamento
                    </button>
                </main>
                <FooterAdmin />
            </div>
        );
    }


    return (
        <div className="alunos-container">
            <HeaderAdmin activePage="fichas-treino" />
            <main className="alunos-main">
                <h1 className="header-main-aluno">Editar Ficha de Treino (ID: {fichaId})</h1>

                <div className="ficha-content-card">
                    {mensagem && (
                        <div className={`${mensagem.type}-message`}>
                            {mensagem.text}
                        </div>
                    )}

                    <div className="ficha-form">
                        
                        <div className="list-controls" style={{ border: 'none', marginBottom: '0px' }}>
                            <h2 className="section-title">Informações da Ficha</h2>
                        </div>
                        <div className="form-group-grid">
                            
                            {/* CAMPO DE SELEÇÃO DO ALUNO (CORRIGIDO) */}
                            <div className="form-group">
                                <label htmlFor="alunoSelecionado">Aluno</label>
                                <select
                                    id="alunoSelecionado"
                                    value={alunoSelecionado}
                                    onChange={e => setAlunoSelecionado(e.target.value)} 
                                    required
                                    disabled={isLoading} 
                                >
                                    <option value="">-- Selecione o Aluno --</option>
                                    {alunos.map((aluno) => (
                                        <option key={aluno.id} value={safeString(aluno.id)}>
                                            {/* ✅ CORREÇÃO AQUI: Usando aluno.name */}
                                            **{aluno.name}** ({aluno.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Campos Nome e Descrição (inalterados) */}
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
                            <div className="form-group full-width">
                                <label htmlFor="descricao">Objetivo do Treino (Descrição)</label>
                                <input
                                    id="descricao"
                                    type="text"
                                    placeholder="Ex: Hipertrofia, Força, Resistência"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />
                                
                            </div>
                        </div>
                        
                        {/* 2. Lista de Exercícios Adicionados à Ficha */}
                        <div className="list-controls">
                            <h2 className="section-title">Exercícios na Ficha ({exerciciosFicha.length})</h2>
                        </div>
                        
                        <table className="data-table exercises-table">
                            <thead><tr>
                                <th>Exercício</th>
                                <th style={{ width: '10%' }}>Séries</th>
                                <th style={{ width: '15%' }}>Repetições</th>
                                <th style={{ width: '15%' }}>Carga (kg)</th>
                                <th style={{ width: '100px' }}>Ação</th>
                            </tr></thead>
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
                            <h2 className="section-title">Adicionar/Modificar Exercício</h2>
                        </div>
                        
                        <div className="form-group-grid" style={{ gridTemplateColumns: '1fr 0.5fr 0.5fr 0.5fr'}}>
                            <div className="form-group">
                                <label htmlFor="idExercicio">Nome do Exercício</label>
                                <select
                                    id="idExercicio"
                                    value={novoExercicio.idExercicio}
                                    onChange={e => {
                                        const selectedId = e.target.value;
                                        const selectedName = exerciciosBD.find(ex => safeString(ex.id) === selectedId)?.nome || '';
                                        setNovoExercicio(prev => ({ 
                                            ...prev, 
                                            idExercicio: selectedId, 
                                            nome: selectedName 
                                        }));
                                    }}
                                    required
                                >
                                    <option value="">-- Selecione um Exercício --</option>
                                    {exerciciosBD.map((ex) => (
                                        <option key={ex.id} value={safeString(ex.id)}>
                                            {ex.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* CAMPOS DE DETALHES DO EXERCÍCIO */}
                            <div className="form-group">
                                <label htmlFor="series">Séries</label>
                                <input
                                    id="series"
                                    type="number"
                                    placeholder="Ex: 3"
                                    value={novoExercicio.series}
                                    onChange={e => setNovoExercicio({...novoExercicio, series: e.target.value})}
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="repeticoes">Repetições</label>
                                <input
                                    id="repeticoes"
                                    type="text"
                                    placeholder="Ex: 8-12 ou 10"
                                    value={novoExercicio.repeticoes}
                                    onChange={e => setNovoExercicio({...novoExercicio, repeticoes: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carga">Carga (kg)</label>
                                <input
                                    id="carga"
                                    type="number"
                                    placeholder="Opcional"
                                    value={novoExercicio.carga}
                                    onChange={e => setNovoExercicio({...novoExercicio, carga: e.target.value})}
                                    min="0"
                                />
                            </div>
                        </div>
                        
                        {/* BOTÃO ADICIONAR */}
                        <div className="form-group full-width" style={{ marginTop: '10px' }}>
                            <button type="button" onClick={handleAddExercicio} className="btn btn-primary">
                                Adicionar Exercício à Ficha
                            </button>
                        </div>
                    </div> 
                    
                    {/* BOTÃO SALVAR EDIÇÃO */}
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <button onClick={handleSalvarEdicao} className="btn btn-success" style={{ marginRight: '10px' }}>
                            Salvar Edição
                        </button>
                        <button onClick={() => navigate('/fichas-treino')} className="btn btn-secondary">
                            Cancelar
                        </button>
                    </div>

                </div>
            </main>
            <FooterAdmin />
        </div>
    );
};

export default EditFichaTreino;