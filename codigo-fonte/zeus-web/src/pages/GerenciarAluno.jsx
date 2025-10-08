import './GerenciarAluno.css';
import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaPencilAlt, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const GerenciarAluno = () => {
    const { user, logout } = useAuth();
    const [alunos, setAlunos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alunoToDelete, setAlunoToDelete] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const cadastrarAluno = () => {
        navigate('/cadastraralunos');
    };

    const gerenciarProf = () => {
        navigate('/professores');
    };

    const gerenciarExercicio = () => {
        navigate('/gerenciarexercicio');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

      const normalizeString = (str) => {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "");
      };

    const filteredAlunos = alunos.filter(aluno => { 
        const normalizedName = normalizeString(aluno.name);
        const normalizedSearchTerm = normalizeString(searchTerm);
        return normalizedName.includes(normalizedSearchTerm);
    });

    const listToRender = filteredAlunos;

    const fetchAlunos = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get('/admin/alunos');
            console.log(alunos)
            setAlunos(response.data);

        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    setError("Você não tem permissão para visualizar a lista de alunos.");
                } else if (err.response.status === 401) {
                    setError("Sessão expirada ou não autorizada. Por favor, faça login novamente.");
                    logout();
                } else {
                    setError(`Erro ${err.response.status}: Falha ao carregar a lista de alunos.`);
                }
            } else {
                console.error("Erro no fetchAlunos:", err);
                setError("Erro de rede. Verifique a conexão com o servidor.");
            }

        } finally {
            setIsLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        fetchAlunos();
    }, [fetchAlunos]);

    const openDeleteModal = (aluno) => {
        setAlunoToDelete(aluno);
    };

    const closeDeleteModal = () => {
        setAlunoToDelete(null);
    };

    const confirmDelete = async () => {
        if (!alunoToDelete) return;

        const id = alunoToDelete.id;
        closeDeleteModal();

        try {
            await api.delete(`/admin/alunos/${id}`);

            // Sucesso: atualiza o estado local
            setAlunos(alunos.filter(aluno => aluno.id !== id));
            alert(`Aluno ${alunoToDelete.name} deletado com sucesso.`);

        } catch (err) {
            if (err.response && err.response.status === 403) {
                alert("Falha ao deletar: Você não tem permissão para esta ação.");
            } else {
                console.error("Erro ao deletar aluno:", err);
                alert(`Falha ao deletar: ${err.message || 'Erro de conexão/servidor'}`);
            }
        }
    };

    const handleDelete = (aluno) => {
        openDeleteModal(aluno);
    }

    const handleEdit = async (id) => {
        console.log(`Abrir modal/página para editar aluno com ID: ${id}`);
        navigate(`/cadastraralunos/${id}`);

    };

    if (isLoading) {
        return <div className="alunos-container loading-state">Carregando alunos...</div>;
    }

    if (error) {
        return (
            <div className="alunos-container error-state">
                <p className="error-message">Erro: {error}</p>
                {/* Permite que o usuário tente novamente, se o erro não for de permissão 403 */}
                {error.includes("permissão") || <button onClick={fetchAlunos} className="retry-btn">Tentar Novamente</button>}
            </div>
        );
    }

    return (
        <div className="alunos-container">
            <header className="alunos-header">
                <div className="header-content">
                    <div className="button-group">
                        <button className="header-btn" onClick={gerenciarExercicio}>Gerenciar Exercícios</button>
                        <button className="header-btn" onClick={gerenciarProf}>Gerenciar Professores</button>
                        <button className="header-btn">Gerenciar Alunos</button>
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

            <main className="alunos-main">
                <div className="content-wrapper">
                    <div className="main-header">
                        <h2 className="main-title">Alunos</h2>
                        <button className="add-aluno-btn"
                            onClick={cadastrarAluno}>
                            <FaPlus className="add-icon" />
                            Cadastrar aluno
                        </button>
                    </div>

                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Procurar"
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <FaSearch className="search-icon" />
                    </div>
                </div>
                <div className="alunos-list-container">
                    {listToRender.length > 0 ? (
                        listToRender.map(aluno => (
                            <div key={aluno.id} className="aluno-item">
                                <span className="aluno-name">{aluno.name}</span>
                                <div className="aluno-actions">
                                    {/* Botões visíveis apenas se tiver permissão de admin/professor */}
                                    {(user?.role === 'admin' || user?.role === 'professor') && (
                                        <>
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => handleDelete(aluno)}
                                            >
                                                <FaTrash />
                                            </button>
                                            <button
                                                className="action-btn edit-btn"
                                                onClick={() => handleEdit(aluno.id)}
                                            >
                                                <FaPencilAlt />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-alunos-message">Nenhum aluno cadastrado.</p>
                    )}
                </div>
            </main>

            <footer className="app-footer">

            </footer>

            {alunoToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Deletar aluno</h3>
                            <button className="modal-close-btn" onClick={closeDeleteModal}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Tem certeza que deseja apagar o aluno <strong>{alunoToDelete.name}</strong>?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn btn-nao" onClick={closeDeleteModal}>
                                Não
                            </button>
                            <button className="modal-btn btn-sim" onClick={confirmDelete}>
                                Sim
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );

};

export default GerenciarAluno;