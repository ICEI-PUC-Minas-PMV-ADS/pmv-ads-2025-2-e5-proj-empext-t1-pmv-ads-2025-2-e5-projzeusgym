import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CadastroFichaTreino.css';  

// URL base do seu Backend. Se for diferente, ajuste aqui.
const API_URL = 'http://localhost:3000';

const CadastroFichaTreino = () => {
    // Estados do Formulário Principal
    const [title, setTitle] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [students, setStudents] = useState([]);
    const [availableExercises, setAvailableExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Estado da Lista de Exercícios (para a ficha)
    const initialExerciseState = { name: '', sets: '', reps: '', observation: '' };
    const [trainingExercises, setTrainingExercises] = useState([initialExerciseState]);

    // Função auxiliar para obter o token do armazenamento local (localStorage)
    const getToken = () => {
        // Ajuste 'token' para a chave que você usa no localStorage
        return localStorage.getItem('token'); 
    };

    // 1. Efeito para carregar Alunos e Exercícios disponíveis
    useEffect(() => {
        const token = getToken();
        if (!token) {
            setError('Usuário não autenticado. Por favor, faça login.');
            setLoading(false);
            return;
        }

        const fetchInitialData = async () => {
            try {
                // ROTA 1: Carregar Alunos
                const studentsRes = await axios.get(`${API_URL}/admin/alunos`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStudents(studentsRes.data.alunos || studentsRes.data.users || studentsRes.data); 

                // ROTA 2: Carregar Exercícios
                const exercisesRes = await axios.get(`${API_URL}/admin/exercises`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAvailableExercises(exercisesRes.data); 

                setLoading(false);
            } catch (err) {
                console.error("Erro ao carregar dados iniciais:", err.response ? err.response.data : err.message);
                
                let customError = 'Erro ao carregar dados. Verifique o console do servidor Backend.';
                
                if (err.response && err.response.status === 403) {
                     customError = 'Acesso negado (403). Seu token pode não ter a permissão (role) correta para listar Alunos/Exercícios.';
                } else if (err.response && err.response.status === 401) {
                     customError = 'Não autorizado (401). Token inválido ou expirado. Faça o login novamente.';
                }
                
                setError(customError);
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Função para lidar com mudanças nos campos de um exercício específico
    const handleExerciseChange = (index, event) => {
        const { name, value } = event.target;
        const newExercises = [...trainingExercises];

        if (name === 'name') {
            newExercises[index][name] = value;
        } else {
            // Converte sets/reps para string
            newExercises[index][name] = String(value);
        }
        setTrainingExercises(newExercises);
    };

    // Função para adicionar um novo campo de exercício vazio
    const handleAddExercise = () => {
        setTrainingExercises([...trainingExercises, initialExerciseState]);
    };

    // Função para remover um campo de exercício
    const handleRemoveExercise = (index) => {
        const newExercises = trainingExercises.filter((_, i) => i !== index);
        // Se a lista ficar vazia, adiciona um campo vazio para garantir a obrigatoriedade
        setTrainingExercises(newExercises.length === 0 ? [initialExerciseState] : newExercises);
    };

    // 2. Função para enviar o formulário e criar a ficha
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        // Validação básica
        if (!title || !selectedStudentId || trainingExercises.length === 0) {
            setError('Preencha o título, selecione um aluno e adicione pelo menos um exercício.');
            return;
        }

        // Mapeia os dados para o formato exato que o Backend espera
        const formattedExercises = trainingExercises
            .filter(ex => ex.name && ex.sets && ex.reps) // Filtra exercicios incompletos
            .map(ex => ({
                nome: ex.name,           
                series: ex.sets,           
                carga: ex.reps,           
                descanso: ex.observation // Usado como observação/descanso
            }));
        
        if (formattedExercises.length === 0) {
             setError('Adicione pelo menos um exercício completo.');
             return;
        }

        const formData = {
            title: title,
            student_id: parseInt(selectedStudentId), // Backend espera integer
            exercises: formattedExercises
        };
        
        const token = getToken();
        if (!token) {
             setError('Token não encontrado. Faça o login novamente.');
             return;
        }

        try {
            // Requisição POST para o Backend (/trainingsheets)
            const response = await axios.post(`${API_URL}/trainingsheets`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setSuccessMessage(response.data.message || 'Ficha de treino criada com sucesso!');
            // Limpa o formulário após o sucesso
            setTitle('');
            setSelectedStudentId('');
            setTrainingExercises([initialExerciseState]);

        } catch (err) {
            console.error("Erro ao criar ficha:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Falha ao criar ficha de treino. Verifique a permissão (403) ou o servidor.');
        }
    };

    if (loading) return <div className="loading-message">Carregando dados...</div>;
    if (error && error.includes('autenticado')) return <div className="error-message">{error}</div>;
    // Se houver um erro, exibe a mensagem de erro. Se houver sucesso, exibe a de sucesso.
    if (error && !successMessage) return <div className="error-message">Erro: {error}</div>;

    // 3. Renderização do Componente
    return (
        <div className="cadastro-ficha-container">
            <h2>Cadastrar Nova Ficha de Treino</h2>
            {error && !successMessage && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form onSubmit={handleSubmit}>
                {/* Campos da Ficha Principal */}
                <div className="form-header-controls">
                    <div className="form-group">
                        <label>Título da Ficha:</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Aluno:</label>
                        <select 
                            value={selectedStudentId} 
                            onChange={(e) => setSelectedStudentId(e.target.value)} 
                            required
                        >
                            <option value="">Selecione um Aluno</option>
                            {students.map(student => (
                                <option key={student.id} value={student.id}>
                                    {student.name || student.nome} (ID: {student.id})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Seção de Exercícios */}
                <div className="exercise-list-section">
                    <h3>Exercícios da Ficha</h3>
                    
                    {/* AQUI ESTÁ A CORREÇÃO DE WHITESPACE/HIDRATAÇÃO */}
                    <table className="added-exercises-table"><thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Séries</th>
                            <th>Repetições</th>
                            <th>Observação</th>
                            <th>Ação</th>
                        </tr>
                    </thead><tbody>
                        {trainingExercises.map((exercise, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <select
                                        name="name"
                                        value={exercise.name}
                                        onChange={(e) => handleExerciseChange(index, e)}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        {availableExercises.map(ex => (
                                            <option key={ex.id} value={ex.nome}>
                                                {ex.nome} ({ex.exerGrupo})
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input type="number" name="sets" value={exercise.sets} onChange={(e) => handleExerciseChange(index, e)} required min="1" />
                                </td>
                                <td>
                                    <input type="number" name="reps" value={exercise.reps} onChange={(e) => handleExerciseChange(index, e)} required min="1" />
                                </td>
                                <td>
                                    <textarea name="observation" value={exercise.observation} onChange={(e) => handleExerciseChange(index, e)} />
                                </td>
                                <td>
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveExercise(index)} 
                                        disabled={trainingExercises.length === 1}
                                        className="btn-danger"
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody></table>
                </div>

                <div className="action-buttons-footer">
                    <button 
                        type="button" 
                        onClick={handleAddExercise} 
                        className="btn btn-secondary"
                    >
                        Adicionar Mais Exercício
                    </button>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Finalizar Cadastro da Ficha
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastroFichaTreino;