// src/pages/EditProfessor.jsx

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfessorForm from '../components/ProfessorForm';
import api from '../services/api'; 
import './EditProfessor.css'; // Mantenha ou use o CadastrarAluno.css se ele for o principal

const EditProfessor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // 1. Efeito para carregar os dados atuais do professor
  useEffect(() => {
    const fetchProfessor = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/adminlogin');
        return;
      }
      
      try {
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
    if (!token) return;

    try {
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

  // Telas de Carregamento/Erro usando a estrutura de layout
  if (loading || !professorData) {
    return (
      <div className="alunos-container">
        <main className="alunos-main">
          <div className="card-professor"> {/* Usei uma classe genérica para o card de conteúdo */}
            <p className={loading ? "loading-msg" : "error-msg"}>
              {loading ? 'Carregando dados para edição...' : 'Professor não encontrado.'}
            </p>
          </div>
        </main>
      </div>
    );
  }


  return (
    <div className="alunos-container">
      
      {/* HEADER EXATAMENTE COMO NO CADASTRARALUNO */}
      <header className="alunos-header">
        <div className="header-content-aluno">
          <div className="button-group-aluno">
            <button className="header-btn-aluno" onClick={() => handleNavigate('/exercicios')}>Gerenciar Exercícios</button>
            {/* Botão 'Gerenciar Professores' ativo para indicar a seção */}
            <button className="header-btn-aluno active" onClick={() => handleNavigate('/professores')}>Gerenciar Professores</button>
            <button className="header-btn-aluno" onClick={() => handleNavigate('/alunos')}>Gerenciar Alunos</button>
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

      <main className="alunos-main">
        <div className="card-professor"> {/* Usando uma classe para o container principal do formulário */}
          <h2 className="header-main-aluno">Editar Professor (ID: {id})</h2>
          
          {message && (
            <p className={`message ${message.includes('sucesso') ? 'success-msg' : 'error-msg'}`}>
              {message}
            </p>
          )}

          <ProfessorForm 
            initialData={professorData} 
            onSubmit={handleEditSubmit} 
            isEditing={true} 
          />
          
          <div className="form-actions-aluno" style={{ justifyContent: 'flex-start', borderTop: 'none', paddingTop: '0' }}>
            <button type="button" className="btn-aluno btn-cancelar-aluno" onClick={() => navigate('/professores')}>
              Voltar para Lista
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER EXATAMENTE COMO NO CADASTRARALUNO */}
      <footer className="app-footer-aluno">
        {/* Conteúdo do Rodapé */}
      </footer>
    </div>
  );
};

export default EditProfessor;