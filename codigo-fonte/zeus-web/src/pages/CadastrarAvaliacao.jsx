import './CadastrarAvaliacao.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import React, { useState, useEffect } from 'react';

const CadastrarAvaliacao = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        studentId: '',
        assessmentDate: '',
        weight: '',
        height: '',
        bodyFat: '',
        muscleMass: '',
        chest: '',
        waist: '',
        hip: '',
        arm: '',
        thigh: '',
        calf: '',
        neck: '',
        observations: ''
    });

    useEffect(() => {
        fetchStudents();
        if (isEditing) {
            fetchAssessmentData();
        }
    }, [id, isEditing]);

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

    const fetchAssessmentData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await api.get(`/physical-assessments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const assessment = response.data;
            
            setFormData({
                studentId: assessment.studentId,
                assessmentDate: assessment.assessmentDate,
                weight: assessment.weight || '',
                height: assessment.height || '',
                bodyFat: assessment.bodyFat || '',
                muscleMass: assessment.muscleMass || '',
                chest: assessment.chest || '',
                waist: assessment.waist || '',
                hip: assessment.hip || '',
                arm: assessment.arm || '',
                thigh: assessment.thigh || '',
                calf: assessment.calf || '',
                neck: assessment.neck || '',
                observations: assessment.observations || ''
            });
        } catch (error) {
            console.error('Erro ao buscar dados da avaliação:', error);
            alert('Não foi possível carregar os dados para edição.');
            navigate('/avaliacoes');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            { key: 'studentId', label: 'Aluno' },
            { key: 'assessmentDate', label: 'Data da avaliação' }
        ];

        for (let field of requiredFields) {
            if (!formData[field.key] || String(formData[field.key]).trim() === '') {
                alert(`Por favor, preencha o campo obrigatório: ${field.label}.`);
                return false;
            }
        }

        // Validar se pelo menos um campo de medida foi preenchido
        const measurementFields = ['weight', 'height', 'bodyFat', 'muscleMass', 'chest', 'waist', 'hip', 'arm', 'thigh', 'calf', 'neck'];
        const hasMeasurements = measurementFields.some(field => 
            formData[field] && String(formData[field]).trim() !== ''
        );

        if (!hasMeasurements) {
            alert('Por favor, preencha pelo menos uma medida corporal.');
            return false;
        }

        return true;
    };

    const handleSalvar = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        
        // Converter campos numéricos
        const dataToSubmit = {
            ...formData,
            weight: formData.weight ? parseFloat(formData.weight) : null,
            height: formData.height ? parseFloat(formData.height) : null,
            bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : null,
            muscleMass: formData.muscleMass ? parseFloat(formData.muscleMass) : null,
            chest: formData.chest ? parseFloat(formData.chest) : null,
            waist: formData.waist ? parseFloat(formData.waist) : null,
            hip: formData.hip ? parseFloat(formData.hip) : null,
            arm: formData.arm ? parseFloat(formData.arm) : null,
            thigh: formData.thigh ? parseFloat(formData.thigh) : null,
            calf: formData.calf ? parseFloat(formData.calf) : null,
            neck: formData.neck ? parseFloat(formData.neck) : null
        };
        
        const method = isEditing ? api.put : api.post; 
        const url = isEditing ? `/physical-assessments/${id}` : '/physical-assessments';

        try {
            const token = localStorage.getItem('authToken'); 
            const response = await method(url, dataToSubmit, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const successMessage = isEditing 
                ? 'Avaliação física atualizada com sucesso!' 
                : 'Avaliação física registrada com sucesso!';
            
            alert(successMessage);
            navigate('/avaliacoes');

        } catch (error) {
            console.error(`Erro na ${isEditing ? 'edição' : 'criação'} da avaliação:`, error);
            const errorMessage = error.response
                ? error.response.data.error || 'Erro ao salvar. Verifique os dados e permissões.'
                : 'Erro de conexão com o servidor. Tente novamente.';
            alert(`Falha ao salvar: ${errorMessage}`);
        }
    };

    const handleCancelar = () => {
        navigate('/avaliacoes');
    };

    return (
        <div className="avaliacao-container">
            <header className="avaliacao-header">
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

            <main className="avaliacao-main">
                <div className="header-main">
                    {isEditing ? 'Editar Avaliação Física' : 'Registrar Nova Avaliação Física'}
                </div>

                <form className="avaliacao-form" onSubmit={handleSalvar}>
                    <div className="form-section">
                        <h3>Informações Básicas</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentId">Aluno *</label>
                                <select 
                                    id="studentId" 
                                    name="studentId" 
                                    value={formData.studentId} 
                                    onChange={handleChange} 
                                    required
                                    disabled={isEditing}
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
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Medidas Corporais</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="weight">Peso (kg)</label>
                                <input 
                                    type="number" 
                                    id="weight" 
                                    name="weight" 
                                    value={formData.weight} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="height">Altura (cm)</label>
                                <input 
                                    type="number" 
                                    id="height" 
                                    name="height" 
                                    value={formData.height} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bodyFat">% Gordura Corporal</label>
                                <input 
                                    type="number" 
                                    id="bodyFat" 
                                    name="bodyFat" 
                                    value={formData.bodyFat} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="muscleMass">Massa Muscular (kg)</label>
                                <input 
                                    type="number" 
                                    id="muscleMass" 
                                    name="muscleMass" 
                                    value={formData.muscleMass} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="chest">Peito (cm)</label>
                                <input 
                                    type="number" 
                                    id="chest" 
                                    name="chest" 
                                    value={formData.chest} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="waist">Cintura (cm)</label>
                                <input 
                                    type="number" 
                                    id="waist" 
                                    name="waist" 
                                    value={formData.waist} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="hip">Quadril (cm)</label>
                                <input 
                                    type="number" 
                                    id="hip" 
                                    name="hip" 
                                    value={formData.hip} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="arm">Braço (cm)</label>
                                <input 
                                    type="number" 
                                    id="arm" 
                                    name="arm" 
                                    value={formData.arm} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="thigh">Coxa (cm)</label>
                                <input 
                                    type="number" 
                                    id="thigh" 
                                    name="thigh" 
                                    value={formData.thigh} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="calf">Panturrilha (cm)</label>
                                <input 
                                    type="number" 
                                    id="calf" 
                                    name="calf" 
                                    value={formData.calf} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="neck">Pescoço (cm)</label>
                                <input 
                                    type="number" 
                                    id="neck" 
                                    name="neck" 
                                    value={formData.neck} 
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>
                            <div className="form-group"></div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Observações</h3>
                        <div className="form-group full-width">
                            <label htmlFor="observations">Observações adicionais</label>
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
                        <button type="button" className="btn btn-cancelar" onClick={handleCancelar}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-salvar">
                            {isEditing ? 'Atualizar' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </main>

            <footer className="app-footer">
            </footer>
        </div>
    );
};

export default CadastrarAvaliacao;
