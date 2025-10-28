import { useState } from 'react';
import './ProfessorForm.css'; // Importa os estilos

// Adicionamos 'onCancel' para o botão de Voltar
const ProfessorForm = ({ initialData = {}, onSubmit, isEditing = false, onCancel }) => { 
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        birthdate: initialData.birthdate ? new Date(initialData.birthdate).toISOString().substring(0, 10) : '',
        gender: initialData.gender || 'masculino',
        cpf: initialData.cpf || '',
        cref_mg: initialData.cref_mg || '',
        email: initialData.email || '',
        password: '', 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="professor-form">
            <h3>{isEditing ? 'Editar Professor' : 'Dados do Novo Professor'}</h3>

            {/* 1. Nome Completo */}
            <div className="form-group">
                <label htmlFor="name">Nome Completo</label>
                <input 
                    name="name" 
                    id="name" 
                    type="text" 
                    placeholder="Nome Completo" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            {/* 2. Email */}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    name="email" 
                    id="email"
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            {/* 3. Senha (Condicional) */}
            <div className="form-group">
                {isEditing ? (
                    <>
                        <label htmlFor="password">Nova Senha (Opcional)</label>
                        <input 
                            name="password" 
                            id="password" 
                            type="password" 
                            placeholder="Nova Senha (Opcional)" 
                            value={formData.password} 
                            onChange={handleChange} 
                        />
                    </>
                ) : (
                    <>
                        <label htmlFor="password">Senha Inicial</label>
                        <input 
                            name="password" 
                            id="password" 
                            type="password" 
                            placeholder="Senha Inicial" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </>
                )}
            </div>
            
            {/* 4. CPF */}
            <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input 
                    name="cpf" 
                    id="cpf"
                    type="text" 
                    placeholder="CPF" 
                    value={formData.cpf} 
                    onChange={handleChange} 
                    maxLength="11" 
                    required 
                />
            </div>
            
            {/* 5. CREF/MG */}
            <div className="form-group">
                <label htmlFor="cref_mg">CREF/MG</label>
                <input 
                    name="cref_mg" 
                    id="cref_mg"
                    type="text" 
                    placeholder="CREF/MG" 
                    value={formData.cref_mg} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            {/* 6. Data de Nascimento */}
            <div className="form-group">
                <label htmlFor="birthdate">Data de Nascimento</label>
                <input 
                    name="birthdate" 
                    id="birthdate"
                    type="date" 
                    placeholder="DD/MM/AAAA" 
                    value={formData.birthdate} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            {/* 7. Gênero */}
            <div className="form-group">
                <label htmlFor="gender">Gênero</label>
                <select 
                    name="gender" 
                    id="gender"
                    value={formData.gender} 
                    onChange={handleChange} 
                    required
                >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                </select>
            </div>
            
            {/* 8. Campo Vazio para Alinhamento (Empurra o 9 para a 2ª coluna) */}
            <div className="form-group">
            </div>

            {/* 9. ⭐️ GRUPO DE BOTÕES DE AÇÃO (Fica na parte inferior direita) */}
            <div className="form-actions"> 
                {/* ⭐️ BOTÃO CANCELAR/VOLTAR (AZUL) */}
                <button 
                    type="button" 
                    className="btn-cancel" // Estilizado como azul no CSS
                    onClick={onCancel} // Chama a função que navega de volta
                >
                    Voltar
                </button>
                
                {/* Botão de Submissão (Verde) */}
                <button type="submit" className="btn-submit">
                    {isEditing ? 'Salvar Alterações' : 'Cadastrar Professor'}
                </button>
            </div>
            
        </form>
    );
};

export default ProfessorForm;