import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import './ManageProfessors.css'; 

<<<<<<< HEAD
import HeaderAdmin from '../components/HeaderAdmin'; 
import FooterAdmin from '../components/FooterAdmin'; 

const DeleteIcon = () => <span className="icon-delete">🗑️</span>; 
const EditIcon = () => <span className="icon-edit">📝</span>;   
const PlusIcon = () => <span className="icon-plus">+</span>;    
const SearchIcon = () => <span className="icon-search">🔍</span>; 

=======
>>>>>>> c7e02893dc8da3deebd1227eff7702125cc2fbed
const ManageProfessors = () => {
    const navigate = useNavigate();
    
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

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
            const dataWithIds = response.data.map((prof, index) => ({
                ...prof,
                id: prof.id || index + 1, 
                name: prof.name || `Professor ${index + 1}`
            }));
            setProfessors(dataWithIds);
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

    const handleDelete = async (professorId) => {
        if (!window.confirm(`Tem certeza que deseja excluir o professor ID ${professorId}?`)) return;
        const token = localStorage.getItem('token');
        try {
            await api.delete(`/admin/professores/${professorId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfessors(prev => prev.filter(prof => prof.id !== professorId));
            alert(`Professor excluído com sucesso!`);
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Falha ao excluir professor.";
            alert(errorMessage);
            setError(errorMessage);
            console.error("Erro na exclusão:", err);
        }
    };
<<<<<<< HEAD

    const filteredProfessors = professors.filter(prof =>
        prof.name && prof.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
=======
    
    // Função auxiliar para navegação nos botões do header
    const handleNavigate = (path) => {
        navigate(path);
    };

>>>>>>> c7e02893dc8da3deebd1227eff7702125cc2fbed

    if (loading && !professors.length) return <p className="loading-msg">Carregando professores...</p>;
    if (error && !professors.length) return <p className="error-msg">{error}</p>;

    return (
<<<<<<< HEAD
        <div className="professors-page-container">
            <HeaderAdmin activePage="professores" />

            <main className="professors-main-content">
                <div className="page-title">Professores</div>

                <div className="manage-professors-wrapper">
                    <button 
                        className="btn-add-professor-icon-text" 
                        onClick={() => navigate('/professores/cadastrar')}
                    >
                        <PlusIcon /> Cadastrar professor
                    </button>

                    <div className="search-bar-container">
                        <input
                            type="text"
                            placeholder="Procurar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="professor-search-input"
                        />
                        <SearchIcon />
                    </div>

                    <ul className="professor-list">
                        {filteredProfessors.length > 0 ? (
                            filteredProfessors.map(prof => (
                                <li key={prof.id} className="professor-list-item">
                                    <span className="professor-name">{prof.name}</span> 
                                    <div className="item-actions">
                                        <button 
                                            className="action-btn delete-btn" 
                                            onClick={() => handleDelete(prof.id)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                        <button 
                                            className="action-btn edit-btn" 
                                            onClick={() => navigate(`/professores/editar/${prof.id}`)}
                                        >
                                            <EditIcon />
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="no-results-msg">
                                {searchTerm ? `Nenhum professor encontrado com o nome "${searchTerm}".` : 'Nenhum professor cadastrado.'}
                            </li>
                        )}
                    </ul>
                </div>
=======
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
>>>>>>> c7e02893dc8da3deebd1227eff7702125cc2fbed

                {error && <p className="error-msg" style={{marginTop: '20px'}}>{error}</p>}
            </main>

            {/* FOOTER (Padrão Natália) */}
            <footer className="app-footer-aluno">
            </footer>
        </div>
    );
};

export default ManageProfessors;
