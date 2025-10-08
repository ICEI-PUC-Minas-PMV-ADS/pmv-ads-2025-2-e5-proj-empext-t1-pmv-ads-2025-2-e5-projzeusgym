import './UploadAvaliacao.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import React, { useState, useEffect, useRef } from 'react';

const UploadAvaliacao = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [students, setStudents] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        studentId: '',
        assessmentDate: '',
        assessmentType: 'inicial',
        observations: ''
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await api.get('/admin/alunos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(response.data);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
            alert('Erro ao carregar lista de alunos.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type !== 'application/pdf') {
            alert('Apenas arquivos PDF são permitidos.');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert('Arquivo muito grande. Tamanho máximo: 5MB.');
            return;
        }
        
        setSelectedFile(file);
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const validateForm = () => {
        if (!formData.studentId) {
            alert('Por favor, selecione um aluno.');
            return false;
        }
        
        if (!formData.assessmentDate) {
            alert('Por favor, selecione a data da avaliação.');
            return false;
        }
        
        if (!selectedFile) {
            alert('Por favor, selecione um arquivo PDF.');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const submitData = new FormData();
        submitData.append('studentId', formData.studentId);
        submitData.append('assessmentDate', formData.assessmentDate);
        submitData.append('assessmentType', formData.assessmentType);
        submitData.append('observations', formData.observations);
        submitData.append('pdfFile', selectedFile);
        
        try {
            const token = localStorage.getItem('authToken');
            const response = await api.post('/physical-assessments', submitData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            alert('Avaliação física registrada com sucesso!');
            navigate('/avaliacoes');
            
        } catch (error) {
            console.error('Erro ao registrar avaliação:', error);
            const errorMessage = error.response?.data?.error || 'Erro ao registrar avaliação.';
            alert(`Falha ao registrar: ${errorMessage}`);
        }
    };

    const handleCancel = () => {
        navigate('/avaliacoes');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="upload-avaliacao-container">
            <header className="upload-avaliacao-header">
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

            <main className="upload-avaliacao-main">
                <div className="header-main">
                    <h1>Fazer upload da avaliação física</h1>
                </div>

                <form className="upload-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Informações da Avaliação</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentId">Aluno *</label>
                                <select 
                                    id="studentId" 
                                    name="studentId" 
                                    value={formData.studentId} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Selecione um aluno</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="assessmentDate">Data da Avaliação *</label>
                                <input 
                                    type="date" 
                                    id="assessmentDate" 
                                    name="assessmentDate" 
                                    value={formData.assessmentDate} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="assessmentType">Tipo de Avaliação *</label>
                                <select 
                                    id="assessmentType" 
                                    name="assessmentType" 
                                    value={formData.assessmentType} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="inicial">Inicial</option>
                                    <option value="trimestral">Trimestral</option>
                                    <option value="semestral">Semestral</option>
                                    <option value="anual">Anual</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Upload do Arquivo PDF</h3>
                        <div 
                            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="upload-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7,10 12,15 17,10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                            </div>
                            <p className="upload-text">
                                {selectedFile ? selectedFile.name : 'Arraste e solte o arquivo para enviar'}
                            </p>
                            {selectedFile && (
                                <p className="file-info">
                                    Tamanho: {formatFileSize(selectedFile.size)}
                                </p>
                            )}
                            <button 
                                type="button" 
                                className="btn btn-select-file"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                            >
                                Selecionar arquivo
                            </button>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileInput}
                            style={{ display: 'none' }}
                        />
                        <p className="upload-help">
                            Apenas arquivos PDF são aceitos. Tamanho máximo: 5MB.
                        </p>
                    </div>

                    <div className="form-section">
                        <h3>Observações</h3>
                        <div className="form-group full-width">
                            <label htmlFor="observations">Observações adicionais (opcional)</label>
                            <textarea 
                                id="observations" 
                                name="observations" 
                                value={formData.observations} 
                                onChange={handleChange}
                                rows="4"
                                placeholder="Digite observações sobre a avaliação física..."
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-cancelar" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-enviar">
                            Enviar
                        </button>
                    </div>
                </form>
            </main>

            <footer className="app-footer">
            </footer>
        </div>
    );
};

export default UploadAvaliacao;
