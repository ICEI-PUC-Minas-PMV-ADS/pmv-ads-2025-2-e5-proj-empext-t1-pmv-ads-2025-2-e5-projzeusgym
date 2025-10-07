// src/pages/CreateProfessor.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessorForm from '../components/ProfessorForm'; // Importa o componente de formulário
import api from '../services/api'; // Importa sua instância de API simples
import './CreateProfessor.css'; // Importa o estilo desta página

const CreateProfessor = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleCreateSubmit = async (formData) => {
    setMessage('');
    const token = localStorage.getItem('token'); 
    
    // 1. Verifica se o token existe antes de enviar
    if (!token) {
        setMessage('Sessão expirada. Redirecionando...');
        navigate('/adminlogin'); 
        return;
    }

    try {
      // 2. Chamada POST para o backend
      // Inclui o Header Authorization manualmente (melhor para sua situação de grupo)
      await api.post('/admin/professores', formData, {
         headers: { 
             'Authorization': `Bearer ${token}` 
         }
      });

      setMessage('Professor cadastrado com sucesso!');
      
      // Navega de volta para a lista após o sucesso
      setTimeout(() => navigate('/professores'), 2000); 
      
    } catch (err) {
      // Tenta pegar a mensagem de erro do backend (ex: CPF já cadastrado)
      const errorMessage = err.response?.data?.error || 'Erro ao cadastrar professor. Verifique os dados.';
      setMessage(`Erro: ${errorMessage}`);
      console.error(err);
    }
  };

  return (
    <div className="container create-professor-container">
      <h2>Cadastrar Novo Professor</h2>
      
      {/* Exibição de mensagens de feedback */}
      {message && (
        <p className={`message ${message.includes('sucesso') ? 'success-msg' : 'error-msg'}`}>
          {message}
        </p>
      )}

      {/* Renderiza o formulário e passa a função de submissão */}
      <ProfessorForm onSubmit={handleCreateSubmit} />
      
      <button type="button" className="btn-back" onClick={() => navigate('/professores')}>
        Voltar para a Lista
      </button>
    </div>
  );
};

export default CreateProfessor;