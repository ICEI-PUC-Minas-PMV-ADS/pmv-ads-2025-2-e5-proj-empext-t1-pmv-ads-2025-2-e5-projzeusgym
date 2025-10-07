// src/pages/EditProfessor.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfessorForm from '../components/ProfessorForm'; // Reutiliza o formulário
import api from '../services/api'; // Sua instância de API simples
import './CreateProfessor.css'; // Reutiliza o estilo de formulário

const EditProfessor = () => {
  const navigate = useNavigate();
  // Obtém o ID da URL (Ex: /professores/editar/15)
  const { id } = useParams(); 
  
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 1. Efeito para carregar os dados atuais do professor
  useEffect(() => {
    const fetchProfessor = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/adminlogin');
        return;
      }
      
      try {
        // CHAMADA GET para obter dados (GET /admin/professores/:id)
        const response = await api.get(`/admin/professores/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfessorData(response.data);
        
      } catch (err) {
        setMessage('Erro ao carregar dados do professor.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessor();
  }, [id, navigate]); 

  // 2. Função de Submissão para o PUT
  const handleEditSubmit = async (formData) => {
    setMessage('');
    const token = localStorage.getItem('token'); 

    try {
      // CHAMADA PUT para atualizar (PUT /admin/professores/:id)
      // Inclui o Header Authorization manualmente
      await api.put(`/admin/professores/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage('Professor atualizado com sucesso!');
      
      // Volta para a lista de professores após a atualização
      setTimeout(() => navigate('/professores'), 2000); 

    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erro ao atualizar professor.';
      setMessage(`Erro: ${errorMessage}`);
      console.error(err);
    }
  };

  if (loading) return <p className="loading-msg">Carregando dados para edição...</p>;
  if (!professorData) return <p className="error-msg">Professor não encontrado.</p>;

  return (
    <div className="container create-professor-container">
      <h2>Editar Professor (ID: {id})</h2>
      
      {message && <p className={`message ${message.includes('sucesso') ? 'success-msg' : 'error-msg'}`}>{message}</p>}

      {/* Passamos isEditing=true e os dados atuais do professor */}
      <ProfessorForm 
        initialData={professorData} 
        onSubmit={handleEditSubmit} 
        isEditing={true} 
      />
      
      <button type="button" className="btn-back" onClick={() => navigate('/professores')}>
        Voltar para Lista
      </button>
    </div>
  );
};

export default EditProfessor;