import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './CadastroFichaTreino.css'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

// URL da sua API
const API_URL = 'http://localhost:3000';

const CadastroFichaTreino = () => {
    // ESTADOS DE CADASTRO
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const initialExerciseState = { id: null, exerciseId: '', sets: '', reps: '', observation: '' }; 
    const [trainingExercises, setTrainingExercises] = useState([initialExerciseState]);

    // ESTADOS GERAIS
    const [students, setStudents] = useState([]);
    const [availableExercises, setAvailableExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState('');
    
    // ESTADOS DE CONTROLE DE TELA
    const [trainingSheets, setTrainingSheets] = useState([]); 
    const [isListingView, setIsListingView] = useState(true); 
    const [editingSheetId, setEditingSheetId] = useState(null); 
    
    // ESTADO PARA DISTINGUIR: EDIÇÃO vs. VISUALIZAÇÃO
    const [isViewingMode, setIsViewingMode] = useState(false);
    
    // ********** ESTADOS DE EDIÇÃO/DETALHE **********
    const [sheetData, setSheetData] = useState(null);
    const [loadEditError, setLoadEditError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editExercises, setEditExercises] = useState([initialExerciseState]);
    // ****************************************

    const getToken = () => localStorage.getItem('token'); 

    // ********** FUNÇÕES DE BUSCA DE DADOS GERAIS **********

    const fetchTrainingSheets = useCallback(async (showLoading = true) => {
        if (showLoading) setLoading(true);
        setError(null);
        setSuccessMessage('');
        try {
            const token = getToken();
            const response = await axios.get(`${API_URL}/trainingsheets`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setTrainingSheets(response.data); 
            setLoading(false);
        } catch (err) {
            console.error("Erro ao carregar fichas:", err.response ? err.response.data : err.message);
            setError('Falha ao carregar a lista de fichas. Verifique a rota GET /trainingsheets.');
            setLoading(false);
        }
    }, []);

    // Hook para buscar dados iniciais (alunos, exercícios, lista de fichas)
    useEffect(() => {
        const token = getToken();
        if (!token) {
            setError('Usuário não autenticado. Por favor, faça login.');
            setLoading(false);
            return;
        }

        const fetchInitialData = async () => {
            try {
                // Buscando Alunos
                const studentsRes = await axios.get(`${API_URL}/admin/alunos`, { headers: { Authorization: `Bearer ${token}` } });
                // Adaptação para diferentes estruturas de retorno do Backend para alunos
                setStudents(studentsRes.data.alunos || studentsRes.data.users || studentsRes.data); 

                // Buscando Exercícios (Rota confirmada: /admin/exercises)
                const exercisesRes = await axios.get(`${API_URL}/admin/exercises`, { headers: { Authorization: `Bearer ${token}` } });
                setAvailableExercises(exercisesRes.data); 
                
                // Buscando Fichas
                await fetchTrainingSheets(false);
                
                setLoading(false);
            } catch (err) {
                console.error("Erro ao carregar dados iniciais (Alunos/Exercícios):", err);
                setError('Falha ao carregar Alunos/Exercícios. Verifique a rota /admin/exercises e /admin/alunos.');
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [fetchTrainingSheets]);

    // ********** HOOK PARA BUSCAR DADOS DA FICHA SELECIONADA **********
    useEffect(() => {
        if (editingSheetId) {
            const fetchSheetData = async () => {
                setLoadEditError(null);
                try {
                    const token = getToken();
                    const response = await axios.get(`${API_URL}/trainingsheets/${editingSheetId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    
                    const data = response.data;
                    
                    // =============================================================
                    // [DEBUG] Log para inspecionar os dados recebidos do Backend
                    console.log(`[DEBUG] Dados da Ficha ID ${editingSheetId} Recebidos:`, data);
                    // =============================================================

                    setSheetData(data);
                    setEditTitle(data.nome || '');
                    setEditDescription(data.descricao || '');

                    // Mapeamento dos Exercícios com correção do aninhamento do Backend
                    if (data.exercises && data.exercises.length > 0) {
                        const formattedEditExercises = data.exercises.map(ex => {
                            // 1. Tenta pegar os dados diretamente da raiz do objeto
                            let series = ex.series;
                            let repeticoes = ex.repeticoes;
                            let descanso = ex.descanso;

                            // 2. PEGA OS DADOS DA PROPRIEDADE PIVÔ CORRETA (TrainingSheetExercises)
                            const pivotData = ex.TrainingSheetExercises || ex.FichaExercicio; 

                            if ((!series && pivotData)) {
                                // Os nomes das propriedades DEVEM ser iguais aos do Backend (series, repeticoes, descanso)
                                series = pivotData.series;      
                                repeticoes = pivotData.repeticoes; 
                                descanso = pivotData.descanso;    
                            }
                            
                            // 3. Retorna o objeto formatado para o estado do React (sets, reps)
                            return ({
                                id: ex.id || null, 
                                // ID do exercício (para o select)
                                exerciseId: String(ex.id), 
                                // Campos do Front-end (serão nulos se o Backend enviou null)
                                sets: String(series || ''), // Mapeia series do Backend para sets do Front
                                reps: String(repeticoes || ''), // Mapeia repeticoes do Backend para reps do Front
                                observation: descanso || '',
                                exercise: ex.exercise || ex 
                            });
                        });
                        setEditExercises(formattedEditExercises);
                    } else {
                        setEditExercises([initialExerciseState]);
                    }
                    
                } catch (err) {
                    console.error("Erro ao carregar ficha para detalhe:", err.response ? err.response.data : err.message);
                    setLoadEditError('Falha ao carregar a ficha. Verifique a rota GET /trainingsheets/:id no seu Backend.');
                }
            };

            fetchSheetData();
        } else {
            // Limpa os estados ao sair
            setSheetData(null);
            setLoadEditError(null);
            setEditTitle('');
            setEditDescription('');
            setEditExercises([initialExerciseState]);
            setIsViewingMode(false); 
        }
    }, [editingSheetId]); 

    // ********** FUNÇÕES DE MANIPULAÇÃO DE EXERCÍCIO **********
    const handleExerciseChange = (index, event, isEditMode = false) => { 
        const { name, value } = event.target;
        
        const currentExercises = isEditMode ? editExercises : trainingExercises;
        const setExercises = isEditMode ? setEditExercises : setTrainingExercises;

        const newExercises = [...currentExercises];
        
        const safeValue = (name === 'sets' || name === 'reps') ? (value || '') : value;

        newExercises[index][name] = safeValue; 
        
        if (name === 'exerciseId') {
            const selectedEx = availableExercises.find(ex => String(ex.id) === String(safeValue));
            newExercises[index]['exercise'] = selectedEx;
        }

        setExercises(newExercises);
    };

    const handleAddExercise = (isEditMode = false) => {
        const setExercises = isEditMode ? setEditExercises : setTrainingExercises;
        const currentExercises = isEditMode ? editExercises : trainingExercises;

        setExercises([...currentExercises, initialExerciseState]);
    };

    const handleRemoveExercise = (index, isEditMode = false) => {
        const setExercises = isEditMode ? setEditExercises : setTrainingExercises;
        const currentExercises = isEditMode ? editExercises : trainingExercises;

        const newExercises = currentExercises.filter((_, i) => i !== index);
        setExercises(newExercises.length === 0 ? [initialExerciseState] : newExercises);
    };
    
    // ********** FUNÇÕES DE NAVEGAÇÃO **********

    const handleBackToList = () => {
        setEditingSheetId(null); 
        setIsListingView(true); 
        fetchTrainingSheets(); 
    };

    const handleView = (id) => {
        setEditingSheetId(id); 
        setIsListingView(false);
        setIsViewingMode(true); 
    };

    const handleEdit = (id) => {
        setEditingSheetId(id); 
        setIsListingView(false);
        setIsViewingMode(false); 
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Tem certeza que deseja deletar a ficha ID ${id}?`)) return;

        try {
            const token = getToken();
            await axios.delete(`${API_URL}/trainingsheets/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccessMessage(`Ficha ID ${id} deletada com sucesso!`);
            fetchTrainingSheets(); 
        } catch (err) {
            console.error("Erro ao deletar ficha:", err);
            setError('Falha ao deletar ficha.');
        }
    };
    
    // ********** FUNÇÕES DE SUBMISSÃO (CADASTRO E EDIÇÃO) **********

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        if (!title || !selectedStudentId) {
            setError('Preencha o título e selecione um aluno.');
            return;
        }

        // 1. Mapeia e filtra entradas incompletas
        let formattedExercises = trainingExercises
            .filter(ex => ex.exerciseId && ex.sets && ex.reps) 
            .map(ex => ({
                exerciseId: parseInt(ex.exerciseId), 
                // Envia como 'series' e 'repeticoes' para o Backend
                series: ex.sets, 
                repeticoes: ex.reps, 
                descanso: ex.observation || 'Sem observação'
            }));
            
        // 2. CORREÇÃO: Remove exercícios duplicados antes de enviar ao Backend
        const uniqueExerciseIds = new Set();
        formattedExercises = formattedExercises.filter(ex => {
            const isDuplicate = uniqueExerciseIds.has(ex.exerciseId);
            uniqueExerciseIds.add(ex.exerciseId);
            return !isDuplicate; // Retorna TRUE apenas se NÃO for duplicado
        });
        // FIM DA CORREÇÃO ---------------------------------------------
        
        if (formattedExercises.length === 0) {
            setError('Adicione pelo menos um exercício completo e único.');
            return;
        }

        const formData = {
            nome: title, 
            alunoId: parseInt(selectedStudentId), 
            descricao: description || 'Treino de adaptação.', 
            exercises: formattedExercises
        };
        
        const token = getToken();

        try {
            await axios.post(`${API_URL}/trainingsheets`, formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            });

            setSuccessMessage('Ficha de treino criada com sucesso! Você pode visualizá-la na lista.');
            setTitle('');
            setDescription(''); 
            setSelectedStudentId('');
            setTrainingExercises([initialExerciseState]);

        } catch (err) {
            console.error("Erro ao criar ficha:", err);
            const backendError = err.response?.data?.error || err.response?.data?.message || 'Falha ao criar ficha de treino. Verifique o console para detalhes.';
            setError(backendError);
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setLoadEditError(null);
        setIsSaving(true);
        
        if (!editTitle) {
            setLoadEditError('O título da ficha não pode estar vazio.');
            setIsSaving(false);
            return;
        }
        
        // 1. Mapeia e filtra entradas incompletas
        let formattedEditExercises = editExercises
            .filter(ex => ex.exerciseId && ex.sets && ex.reps) 
            .map(ex => ({
                id: ex.id, 
                exerciseId: parseInt(ex.exerciseId), 
                // Envia como 'series' e 'repeticoes' para o Backend
                series: ex.sets, 
                repeticoes: ex.reps, 
                descanso: ex.observation || 'Sem observação'
            }));
            
        // 2. CORREÇÃO: Remove exercícios duplicados antes de enviar ao Backend
        const uniqueEditExerciseIds = new Set();
        formattedEditExercises = formattedEditExercises.filter(ex => {
            const isDuplicate = uniqueEditExerciseIds.has(ex.exerciseId);
            uniqueEditExerciseIds.add(ex.exerciseId);
            return !isDuplicate; // Retorna TRUE apenas se NÃO for duplicado
        });
        // FIM DA CORREÇÃO ---------------------------------------------

        if (formattedEditExercises.length === 0) {
            setLoadEditError('A ficha de treino deve ter pelo menos um exercício completo e único.');
            setIsSaving(false);
            return;
        }

        const updatedData = {
            nome: editTitle,
            descricao: editDescription,
            exercises: formattedEditExercises
        };

        try {
            const token = getToken();
            
            await axios.put(`${API_URL}/trainingsheets/${editingSheetId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            });

            setSuccessMessage(`Ficha ID ${editingSheetId} atualizada com sucesso!`);
            handleBackToList(); 
        } catch (err) {
            console.error("Erro ao salvar edição:", err);
            const backendError = err.response?.data?.error || err.response?.data?.message || 'Falha ao salvar as alterações. Verifique se o Backend aceita a estrutura de exercícios.';
            setLoadEditError(backendError);
        } finally {
            setIsSaving(false);
        }
    };
    
    // ********** RENDERIZAÇÃO DA LISTA **********
    const renderList = () => (
        <div className="ficha-card-content">
            <div className="list-controls">
                <h2 className="section-title">Fichas de Treino Cadastradas</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary" onClick={() => { setIsListingView(false); setEditingSheetId(null); setError(null); setSuccessMessage(''); }}>
                        + Cadastrar Nova Ficha
                    </button>
                    <button className="btn btn-secondary" onClick={() => fetchTrainingSheets()}>
                        &#x21bb; Recarregar Lista
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-message">Carregando fichas...</div>
            ) : trainingSheets.length === 0 ? (
                <div className="info-message">Nenhuma ficha de treino cadastrada.</div>
            ) : (
                <table className="data-table">
                    <thead><tr>
                        <th style={{width: '50px'}}>ID</th>
                        <th>Título</th>
                        <th style={{width: '150px'}}>Aluno</th>
                        <th style={{width: '120px'}}>Criação</th>
                        <th style={{width: '200px'}}>Ações</th>
                    </tr></thead>
                    <tbody>
                        {trainingSheets.map((sheet) => (
                            <tr key={sheet.id}>
                                <td>{sheet.id}</td>
                                <td>{sheet.nome}</td>
                                {/* Verifica 'nome' ou 'name' para o aluno */}
                                <td>{sheet.aluno?.nome || sheet.aluno?.name || 'N/A'}</td> 
                                <td>{new Date(sheet.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-action view" onClick={() => handleView(sheet.id)}>Ver</button>
                                    <button className="btn btn-action edit" onClick={() => handleEdit(sheet.id)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(sheet.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    // ********** RENDERIZAÇÃO DO FORMULÁRIO DE CADASTRO **********
    const renderForm = () => (
        <div className="ficha-card-content">
            <div className="list-controls">
                <h2 className="section-title">Cadastrar Nova Ficha de Treino</h2>
                <button 
                    className="btn btn-action btn-secondary" 
                    onClick={() => { 
                        setIsListingView(true); 
                        fetchTrainingSheets(); 
                        setError(null); 
                        setSuccessMessage(''); 
                    }}
                >
                    Ver Fichas Cadastradas
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="ficha-form">
                
                {/* DADOS DA FICHA */}
                <div className="form-group-grid">
                    <div className="form-group">
                        <label htmlFor="title">Título da Ficha:</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Treino A - Peito e Tríceps" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="student">Aluno:</label>
                        <select id="student" value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} required>
                            <option value="">Selecione um Aluno</option>
                            {students.map(student => (<option key={student.id} value={student.id}>{student.name || student.nome} (ID: {student.id})</option>))}
                        </select>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="description">Descrição (Opcional):</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="2" placeholder="Ex: Foco em força e hipertrofia."/>
                    </div>
                </div>

                {/* EXERCÍCIOS DA FICHA */}
                <div className="exercise-list-section">
                    <h3>Exercícios:</h3>
                    <table className="data-table exercises-table"><thead>
                        <tr>
                            <th style={{width: '30px'}}>#</th>
                            <th>Nome do Exercício</th>
                            <th style={{width: '80px', textAlign: 'center'}}>Séries</th>
                            <th style={{width: '80px', textAlign: 'center'}}>Repetições</th>
                            <th style={{width: '250px'}}>Observação/Descanso</th>
                            <th style={{width: '100px'}}>Ação</th>
                        </tr>
                        </thead><tbody>
                            {trainingExercises.map((exercise, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <select name="exerciseId" value={exercise.exerciseId} onChange={(e) => handleExerciseChange(index, e)} required>
                                            <option value="">Selecione um Exercício</option>
                                            {availableExercises.map(ex => (
                                                <option key={ex.id} value={ex.id}>{ex.nome || ex.name} ({ex.exerGrupo})</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><input type="number" name="sets" value={exercise.sets || ''} onChange={(e) => handleExerciseChange(index, e)} required min="1" /></td>
                                    <td><input type="number" name="reps" value={exercise.reps || ''} onChange={(e) => handleExerciseChange(index, e)} required min="1" /></td>
                                    <td><input name="observation" value={exercise.observation} onChange={(e) => handleExerciseChange(index, e)} placeholder="Ex: 60s descanso" /></td>
                                    <td>
                                        <button type="button" onClick={() => handleRemoveExercise(index)} disabled={trainingExercises.length === 1} className="btn btn-danger">Remover</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="action-buttons-footer">
                    <button type="button" onClick={() => handleAddExercise()} className="btn btn-secondary">
                        + Adicionar Mais Exercício
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Finalizar Cadastro da Ficha
                    </button>
                </div>
            </form>
        </div>
    );

    // ********** RENDERIZAÇÃO DA TELA DE DETALHE/EDIÇÃO **********
    const renderSheetDetail = () => {
        const isEditingMode = !isViewingMode; 

        if (loadEditError) {
            return <div className="error-message">{loadEditError}</div>;
        }

        if (!sheetData) {
            return <div className="loading-message">Carregando dados da ficha...</div>;
        }
        
        return (
            <form onSubmit={handleSaveEdit} className="ficha-form">
                <div className="list-controls">
                    <h2 className="section-title">
                        {`Ficha ID: ${editingSheetId} (${isEditingMode ? 'Modo Edição' : 'Visualização'})`}
                    </h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                            type="button" 
                            className={`btn ${isEditingMode ? 'btn-action view' : 'btn-action edit'}`} 
                            onClick={() => setIsViewingMode(!isViewingMode)}
                        >
                            {isEditingMode ? 'Mudar para Visualização' : 'Mudar para Edição'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleBackToList}>
                            &larr; Voltar para a Lista
                        </button>
                    </div>
                </div>
                
                {/* DADOS DA FICHA */}
                <div className="form-group-grid">
                    <div className="form-group">
                        <label htmlFor="editTitle">Título da Ficha:</label>
                        <input type="text" id="editTitle" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} disabled={!isEditingMode} required />
                    </div>
                    <div className="form-group">
                        <label>Aluno:</label>
                        {/* Verifica 'nome' ou 'name' para o aluno */}
                        <input type="text" value={sheetData.aluno?.nome || sheetData.aluno?.name || 'N/A'} disabled /> 
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="editDescription">Descrição:</label>
                        <textarea id="editDescription" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} disabled={!isEditingMode} rows="3"/>
                    </div>
                </div>

                {/* EXERCÍCIOS EDITÁVEIS/VISUALIZÁVEIS */}
                <div className="exercise-list-section">
                    <h3>Exercícios:</h3>
                    <table className="data-table exercises-table"><thead>
                        <tr>
                            <th style={{width: '30px'}}>#</th>
                            <th>Nome do Exercício</th>
                            <th style={{width: '80px', textAlign: 'center'}}>Séries</th>
                            <th style={{width: '80px', textAlign: 'center'}}>Repetições</th>
                            <th style={{width: '250px'}}>Observação/Descanso</th>
                            <th style={{width: '100px'}}>{isEditingMode ? 'Ação' : ''}</th>
                        </tr>
                        </thead><tbody>
                            {editExercises.map((exercise, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {/* Renderização Condicional do Nome do Exercício */}
                                        {!isEditingMode && exercise.exerciseId ? (
                                            <input 
                                                type="text" 
                                                // Tenta encontrar o exercício por 'nome' ou 'name'
                                                value={availableExercises.find(ex => String(ex.id) === String(exercise.exerciseId))?.nome 
                                                    || availableExercises.find(ex => String(ex.id) === String(exercise.exerciseId))?.name 
                                                    || 'Exercício Não Encontrado'} 
                                                disabled 
                                                className="disabled-select-display"
                                            />
                                        ) : (
                                            <select 
                                                name="exerciseId" 
                                                value={exercise.exerciseId} 
                                                onChange={(e) => handleExerciseChange(index, e, true)} 
                                                required
                                                disabled={!isEditingMode}
                                            >
                                                <option value="">Selecione um Exercício</option>
                                                {availableExercises.map(ex => (
                                                    <option key={ex.id} value={ex.id}>{ex.nome || ex.name} ({ex.exerGrupo})</option>
                                                ))}
                                            </select>
                                        )}
                                    </td>
                                    <td><input type="number" name="sets" value={exercise.sets || ''} onChange={(e) => handleExerciseChange(index, e, true)} required min="1" disabled={!isEditingMode} /></td>
                                    <td><input type="number" name="reps" value={exercise.reps || ''} onChange={(e) => handleExerciseChange(index, e, true)} required min="1" disabled={!isEditingMode} /></td>
                                    <td><input name="observation" value={exercise.observation} onChange={(e) => handleExerciseChange(index, e, true)} placeholder="Ex: 60s descanso" disabled={!isEditingMode} /></td>
                                    <td>
                                        {isEditingMode && (
                                            <button type="button" onClick={() => handleRemoveExercise(index, true)} disabled={editExercises.length === 1} className="btn btn-danger">Remover</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="action-buttons-footer">
                    {isEditingMode && (
                        <button type="button" onClick={() => handleAddExercise(true)} className="btn btn-secondary">
                            + Adicionar Mais Exercício
                        </button>
                    )}
                    
                    {isEditingMode ? (
                        <button type="submit" className="btn btn-primary" disabled={isSaving}>
                            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    ) : (
                        <button type="button" className="btn btn-action edit" onClick={() => setIsViewingMode(false)}>
                            Habilitar Edição
                        </button>
                    )}
                </div>
            </form>
        );
    };

    // ********** RENDERIZAÇÃO PRINCIPAL (SEMPRE NO FINAL) **********
    const renderContent = () => {
        if (isListingView) {
            return renderList();
        }
        if (editingSheetId) {
            return renderSheetDetail(); 
        }
        return renderForm();
    };

    return (
        <div className="ficha-main-container"> 
            <Header /> 
            
            <div className="ficha-content-area"> 
                <div className="ficha-content-card"> 
                    {/* Exibição de Mensagens */}
                    {(error || successMessage || loadEditError) && (
                        <div className={error || loadEditError ? "error-message" : "success-message"}>
                            {error || loadEditError || successMessage}
                        </div>
                    )}
                    
                    {renderContent()}
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default CadastroFichaTreino;