import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import './ManageProfessors.css'; 

const ManageProfessors = () => {
    const navigate = useNavigate();
    
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    // Função para buscar os professores (GET /admin/professores)
    const fetchProfessors = useCallback(async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token'); 
        
        if (!token) {
            navigate('/adminlogin'); 
            return;
        }

        try {
            const response = await api.get('admin/professores', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfessors(response.data);
            
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError("Acesso negado ou token expirado. Faça login novamente.");
                // navigate('/adminlogin'); // Não navegaremos aqui para evitar loops, mas esta é a lógica
            } else {
                setError("Erro ao carregar professores. Tente novamente.");
            }
            console.error("Erro na listagem de professores:", err);
            
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchProfessors();
    }, [fetchProfessors]);


    // Função para excluir um professor (DELETE /admin/professores/:id)
    const handleDelete = async (professorId) => {
        if (!window.confirm(`Tem certeza que deseja excluir o professor ID ${professorId}?`)) {
            return;
        }
        
        const token = localStorage.getItem('token');
        
        try {
            await api.delete(`/admin/professores/${professorId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setProfessors(prev => prev.filter(prof => prof.id !== professorId));
            alert(`Professor ID ${professorId} excluído com sucesso!`);
            
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Falha ao excluir professor.";
            alert(errorMessage);
            setError(errorMessage);
            console.error("Erro na exclusão:", err);
        }
    };
    
    // Função auxiliar para navegação nos botões do header
    const handleNavigate = (path) => {
        navigate(path);
    };


    if (loading && !professors.length) return <p className="loading-msg">Carregando professores...</p>;
    if (error && !professors.length) return <p className="error-msg">{error}</p>;


    return (
        // Usando o container do padrão Natália (alunos-container)
        <div className="alunos-container"> 
            
            {/* HEADER LARANJA */}
            <header className="layout-header">
                <div className="header-content">
                    <div className="button-group">
                        <button className="header-btn" onClick={() => handleNavigate('/exercicios')}>Gerenciar Exercícios</button>
                        <button className="header-btn active" onClick={() => handleNavigate('/professores')}>Gerenciar Professores</button>
                        <button className="header-btn" onClick={() => handleNavigate('/alunos')}>Gerenciar Alunos</button>
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

            {/* MAIN (Seu conteúdo de gerenciamento) */}
            <main className="alunos-main">
                
                <div className="header-main-aluno">
                    Gerenciamento de Professores
                </div>
                
                {/* Seu card branco de gerenciamento */}
                <div className="manage-container">
                    
                    {/* Botões de Ação */}
                    <div className="actions-header">
                        <button 
                            className="btn-add-professor" 
                            onClick={() => navigate('/professores/cadastrar')}
                        >
                            + Cadastrar Novo Professor
                        </button>
                    </div>

                    {/* Tabela de Professores */}
                    <div className="table-responsive">
                        <table className="professors-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>CREF/MG</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.length > 0 ? (
                                    professors.map(prof => (
                                        <tr key={prof.id}>
                                            <td>{prof.id}</td>
                                            <td>{prof.name}</td>
                                            <td>{prof.email}</td>
                                            <td>{prof.cref_mg}</td>
                                            <td className="table-actions">
                                                <button className="btn-edit" onClick={() => navigate(`/professores/editar/${prof.id}`)}>Editar</button>
                                                <button className="btn-remove" onClick={() => handleDelete(prof.id)}>Remover</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>Nenhum professor cadastrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div> 

            </main>

            {/* FOOTER (Padrão Natália) */}
            <footer className="app-footer-aluno">
            </footer>
        </div>
    );
};

export default ManageProfessors;