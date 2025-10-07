// src/components/ProfessorForm.jsx

import { useState } from 'react';

// Este componente é o formulário em si, reutilizável para POST (Criação) e PUT (Edição)
const ProfessorForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    // Garante que a data de nascimento esteja no formato YYYY-MM-DD para o input
    birthdate: initialData.birthdate ? new Date(initialData.birthdate).toISOString().substring(0, 10) : '',
    gender: initialData.gender || 'masculino',
    cpf: initialData.cpf || '',
    cref_mg: initialData.cref_mg || '',
    email: initialData.email || '',
    // A senha é vazia por padrão, pois é nova na criação ou opcional na edição
    password: '', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envia os dados de volta para a função handleCreateSubmit na página CreateProfessor
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="professor-form">
      <h3>{isEditing ? 'Editar Professor' : 'Dados do Novo Professor'}</h3>

      <input name="name" type="text" placeholder="Nome Completo" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      
      {/* Senha: Obrigatória na criação, opcional na edição */}
      {!isEditing && (
        <input name="password" type="password" placeholder="Senha Inicial" value={formData.password} onChange={handleChange} required />
      )}
      {isEditing && (
        <input name="password" type="password" placeholder="Nova Senha (Opcional)" value={formData.password} onChange={handleChange} />
      )}
      
      <input name="cpf" type="text" placeholder="CPF" value={formData.cpf} onChange={handleChange} maxLength="11" required />
      <input name="cref_mg" type="text" placeholder="CREF/MG" value={formData.cref_mg} onChange={handleChange} required />
      <input name="birthdate" type="date" placeholder="Data de Nascimento" value={formData.birthdate} onChange={handleChange} required />
      
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="outro">Outro</option>
      </select>
      
      <button type="submit" className="btn-primary">
        {isEditing ? 'Salvar Alterações' : 'Cadastrar Professor'}
      </button>
    </form>
  );
};

export default ProfessorForm;