import './CadastrarAluno.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import React, { useState, useEffect } from 'react';

const CadastrarAluno = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        gender: '',
        cpf: '',
        cellphone: '',
        email: '',
        restriction: ''
    });

    useEffect(() => {
        const fetchAlunoData = async () => {
            if (isEditing) {
                try {
                    const response = await api.get(`/admin/alunos/${id}`);
                    const alunoData = response.data;
                    
                    setFormData(prevState => ({
                        ...prevState,
                        name: alunoData.name || '',
                        birthdate: alunoData.birthdate || '',
                        gender: alunoData.gender || '',
                        cpf: alunoData.cpf || '',
                        cellphone: alunoData.cellphone || '',
                        email: alunoData.email || '',
                        restriction: alunoData.restriction || '',
                    }));
                } catch (error) {
                    console.error('Erro ao buscar dados do aluno:', error);
                    alert('Não foi possível carregar os dados para edição.');
                    navigate('/alunos'); 
                }
            }
        };

        fetchAlunoData();
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            { key: 'name', label: 'Nome' },
            { key: 'birthdate', label: 'Data de nascimento' },
            { key: 'gender', label: 'Sexo' },
            { key: 'cpf', label: 'CPF' },
            { key: 'cellphone', label: 'Celular' },
            { key: 'email', label: 'E-mail' },
        ];

        for (let field of requiredFields) {
            if (!formData[field.key] || String(formData[field.key]).trim() === '') {
                alert(`Por favor, preencha o campo obrigatório: ${field.label}.`);
                return false;
            }
        }

        return true;
    };

     const handleSalvar = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        
        let dataToSubmit = { ...formData };
        
        const method = isEditing ? api.put : api.post; 
        const url = isEditing ? `/admin/alunos/${id}` : '/admin/alunos';

        try {
            const token = localStorage.getItem('authToken'); 
            const response = await method(url, dataToSubmit);
            
            const successMessage = isEditing 
                 ? 'Aluno atualizado com sucesso!' 
                : `Aluno cadastrado com sucesso! A senha inicial foi enviada para o e-mail: ${formData.email}`;
            
            alert(successMessage);
            navigate(-1);

        } catch (error) {
            console.error(`Erro na ${isEditing ? 'edição' : 'criação'} do aluno:`, error);
            const errorMessage = error.response
                ? error.response.data.error || 'Erro ao salvar. Verifique os dados e permissões.'
                : 'Erro de conexão com o servidor. Tente novamente.';
            alert(`Falha ao salvar: ${errorMessage}`);
        }
    };

    const handleCancelar = () => {
        navigate(-1);
    };

    return (
        <div className="alunos-container">
            <header className="alunos-header">
                <div className="header-content">
                    <div className="button-group">
                        <button className="header-btn">Gerenciar Exercícios</button>
                        <button className="header-btn">Gerenciar Professores</button>
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
                <div className="header-main">
                    {isEditing ? 'Editar Aluno' : 'Cadastrar novo aluno'}
                </div>
                <form className="cadastro-aluno-form" onSubmit={handleSalvar}>
                   <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="birthdate">Data de nascimento</label>
                            <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cellphone">Celular</label>
                            <input type="tel" id="cellphone" name="cellphone" value={formData.cellphone} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            {!isEditing && (
                                <p className="info-text">A senha inicial será gerada e enviada por e-mail.</p>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="gender">Sexo</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Selecione</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        <div className="form-group large-textarea">
                            <label htmlFor="restriction">Possui alguma restrição?</label>
                            <textarea id="restriction" name="restriction" value={formData.restriction} onChange={handleChange} rows="4"></textarea>
                        </div>
                        <div className="form-group placeholder-group"></div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-cancelar" onClick={handleCancelar}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-salvar">
                            Salvar
                        </button>
                    </div>
                </form>
            </main>

            <footer className="app-footer">
            </footer>

        </div>
    );
};

export default CadastrarAluno;