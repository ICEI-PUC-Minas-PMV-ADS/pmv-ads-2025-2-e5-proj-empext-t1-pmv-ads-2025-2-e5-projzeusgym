import './GerenciarAvaliacoes.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import React, { useState, useEffect } from 'react';

const GerenciarAvaliacoes = () => {
    const navigate = useNavigate();
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStudent, setFilterStudent] = useState('');

    useEffect(() => {
        fetchAssessments();
    }, []);

    const fetchAssessments = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await api.get('/physical-assessments', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssessments(response.data);
        } catch (error) {
            console.error('Erro ao buscar avaliações:', error);
            alert('Erro ao carregar avaliações físicas.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (assessmentId) => {
        if (!window.confirm('Tem certeza que deseja excluir esta avaliação física?')) {
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            await api.delete(`/physical-assessments/${assessmentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Avaliação física excluída com sucesso!');
            fetchAssessments();
        } catch (error) {
            console.error('Erro ao excluir avaliação:', error);
            alert('Erro ao excluir avaliação física.');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const filteredAssessments = assessments.filter(assessment => 
        !filterStudent || 
        assessment.student.name.toLowerCase().includes(filterStudent.toLowerCase())
    );

    if (loading) {
        return (
            <div className="avaliacoes-container">
                <div className="loading">Carregando avaliações...</div>
            </div>
        );
    }

    return (
        <div className="avaliacoes-container">
            <header className="avaliacoes-header">
                <div className="header-content">
                    <div className="button-group">
                        <button className="header-btn">Gerenciar Exercícios</button>
                        <button className="header-btn">Gerenciar Professores</button>
                        <button className="header-btn">Gerenciar Alunos</button>
                        <button className="header-btn active">Avaliações Físicas</button>
                    </div>
                    <div className="icon-group">
                        <div className="profile-icon">
                            <a href="#">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    alt="Perfil"
                                    className="profile-image"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="avaliacoes-main">
                <div className="header-main">
                    <h1>Gerenciar Avaliações Físicas</h1>
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/avaliacoes/nova')}
                    >
                        Nova Avaliação
                    </button>
                </div>

                <div className="filters">
                    <div className="filter-group">
                        <label htmlFor="filterStudent">Filtrar por aluno:</label>
                        <input
                            type="text"
                            id="filterStudent"
                            value={filterStudent}
                            onChange={(e) => setFilterStudent(e.target.value)}
                            placeholder="Digite o nome do aluno..."
                        />
                    </div>
                </div>

                <div className="assessments-list">
                    {filteredAssessments.length === 0 ? (
                        <div className="no-data">
                            <p>Nenhuma avaliação física encontrada.</p>
                        </div>
                    ) : (
                        <div className="assessments-grid">
                            {filteredAssessments.map((assessment) => (
                                <div key={assessment.id} className="assessment-card">
                                    <div className="assessment-header">
                                        <h3>{assessment.student.name}</h3>
                                        <span className="assessment-date">
                                            {formatDate(assessment.assessmentDate)}
                                        </span>
                                    </div>
                                    
                                    <div className="assessment-data">
                                        {assessment.weight && (
                                            <div className="data-item">
                                                <span className="label">Peso:</span>
                                                <span className="value">{assessment.weight} kg</span>
                                            </div>
                                        )}
                                        {assessment.height && (
                                            <div className="data-item">
                                                <span className="label">Altura:</span>
                                                <span className="value">{assessment.height} cm</span>
                                            </div>
                                        )}
                                        {assessment.bodyFat && (
                                            <div className="data-item">
                                                <span className="label">% Gordura:</span>
                                                <span className="value">{assessment.bodyFat}%</span>
                                            </div>
                                        )}
                                        {assessment.muscleMass && (
                                            <div className="data-item">
                                                <span className="label">Massa Muscular:</span>
                                                <span className="value">{assessment.muscleMass} kg</span>
                                            </div>
                                        )}
                                    </div>

                                    {assessment.observations && (
                                        <div className="assessment-observations">
                                            <strong>Observações:</strong>
                                            <p>{assessment.observations}</p>
                                        </div>
                                    )}

                                    <div className="assessment-actions">
                                        <button 
                                            className="btn btn-edit"
                                            onClick={() => navigate(`/avaliacoes/editar/${assessment.id}`)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="btn btn-delete"
                                            onClick={() => handleDelete(assessment.id)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer className="app-footer">
            </footer>
        </div>
    );
};

export default GerenciarAvaliacoes;
