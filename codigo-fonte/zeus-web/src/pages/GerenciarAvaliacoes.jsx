import './GerenciarAvaliacoes.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';

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
            const token = localStorage.getItem('token');
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
            const token = localStorage.getItem('token');
            await api.delete(`/physical-assessments/${assessmentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Avaliação física excluída com sucesso!');
            fetchAssessments();
        } catch (error) {
            console.error('Erro ao excluir avaliação:', error);
            
            // Extrair mensagem específica do erro
            const errorMessage = error.response?.data?.error || 
                               error.response?.data?.message || 
                               error.message || 
                               'Erro ao excluir avaliação física.';
            
            alert(errorMessage);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

 const handleDownload = async (assessmentId) => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Fazer requisição para o backend que redireciona para o Azure
    const response = await api.get(`/physical-assessments/${assessmentId}/download`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
      responseType: 'blob' // Importante para downloads
    });

    // Criar blob URL e forçar download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Tentar extrair nome do arquivo do header
    const contentDisposition = response.headers['content-disposition'];
    let filename = `avaliacao_${assessmentId}.pdf`;
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    
  } catch (error) {
    console.error('Erro no download:', error);
    alert('Erro ao fazer download do arquivo');
  } finally {
    setLoading(false);
  }
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
                            <button 
                                className="header-btn"
                                onClick={() => navigate('/gerenciarexercicios')}
                            >
                                Gerenciar Exercícios
                            </button>
                            <button 
                                className="header-btn"
                                onClick={() => navigate('/professores')}
                            >
                                Gerenciar Professores
                            </button>
                            <button 
                                className="header-btn"
                                onClick={() => navigate('/alunos')}
                            >
                                Gerenciar Alunos
                            </button>
                            <button className="header-btn active">Avaliações Físicas</button>
                        </div>
                    <div className="icon-group">
                        <div className="profile-icon">
                            <button 
                                onClick={() => navigate('/dashboard')}
                                style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    alt="Página Principal"
                                    className="profile-image"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="avaliacoes-main">
                <div className="content-wrapper-avaliacoes">
                    <div className="header-main">
                        <h1>Gerenciar Avaliações Físicas</h1>
                        <button 
                            className="btn-new-evaluation"
                            onClick={() => navigate('/avaliacoes/upload')}
                        >
                            <span className="add-icon">+</span>
                            Nova Avaliação
                        </button>
                    </div>

                    <SearchBar 
                        value={filterStudent}
                        onChange={setFilterStudent}
                        placeholder="Pesquisar por nome do aluno..."
                        className="full-width"
                    />

                    <div className="content-box">
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
                                    
                                    <div className="assessment-info">
                                        <div className="data-item">
                                            <span className="label">Tipo:</span>
                                            <span className="value">{assessment.assessmentType}</span>
                                        </div>
                                        {assessment.fileName && (
                                            <div className="data-item">
                                                <span className="label">Arquivo:</span>
                                                <span className="value file-name">{assessment.fileName}</span>
                                            </div>
                                        )}
                                        {assessment.fileSize && (
                                            <div className="data-item">
                                                <span className="label">Tamanho:</span>
                                                <span className="value">{formatFileSize(assessment.fileSize)}</span>
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
                                        {assessment.fileUrl && (
                                            <>
                                            
                                                <button 
                                                    className="btn btn-download"
                                                    onClick={() => handleDownload(assessment.id)}
                                                >
                                                    Baixar
                                                </button>
                                            </>
                                        )}
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
                </div>
            </main>

            <footer className="app-footer">
            </footer>
        </div>
    );
};

export default GerenciarAvaliacoes;
