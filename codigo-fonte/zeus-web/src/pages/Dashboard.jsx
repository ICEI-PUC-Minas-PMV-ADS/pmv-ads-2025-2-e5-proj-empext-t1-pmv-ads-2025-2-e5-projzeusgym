import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Função para Gerenciar Alunos (JÁ EXISTIA)
  const gerenciarAluno = () => {
    navigate('/alunos');
  };
  
  // Função para Gerenciar Exercícios (JÁ EXISTIA, MAS O PATH FOI CORRIGIDO NO App.jsx)
  const gerenciarExercicio = () => {
    navigate('/gerenciarexercicios');
  };
  
  // 🚨 NOVA FUNÇÃO PARA GERENCIAR PROFESSORES
  const gerenciarProfessor = () => {
    navigate('/professores'); // Path definido no seu App.jsx
  };

  // 🚨 NOVA FUNÇÃO PARA GERENCIAR FICHAS DE TREINO
  const gerenciarFichaTreino = () => {
    navigate('/fichas-treino'); // Path definido no seu App.jsx
  };

  // 🚨 NOVA FUNÇÃO PARA GERENCIAR AVALIAÇÕES FÍSICAS
  const gerenciarAvaliacoes = () => {
    navigate('/avaliacoes'); // Path definido no App.jsx
  };

  return (  
    <div className="dashboard-container">
      {/* Header Laranja */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Zeus Gym</h1>
          <div className="profile-icon">
            <a href="#"> <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="Perfil" 
              className="profile-image"
            /> </a>
          </div>
        </div>
      </header>    

      {/* Conteúdo em Branco */}
      <main className="dashboard-main">
        <div className="dashboard-buttons">
          
          {/* 🚨 BOTÃO DE PROFESSORES CORRIGIDO */}
          <button 
            className="dashboard-btn"
            onClick={gerenciarProfessor}
          >
            Gerenciar Professores
          </button>
          
          {/* BOTÃO DE ALUNOS JÁ ESTAVA OK */}
          <button 
            className="dashboard-btn"
            onClick={gerenciarAluno}
          >
            Gerenciar Alunos
          </button>
          
          {/* BOTÃO DE EXERCÍCIOS JÁ ESTAVA OK */}
          <button 
            className="dashboard-btn"
            onClick={gerenciarExercicio}
          >
            Gerenciar Exercícios
          </button>

          {/* 🚨 BOTÃO DE FICHA DE TREINO REINSERIDO E FUNCIONAL */}
          <button 
            className="dashboard-btn"
            onClick={gerenciarFichaTreino}
          >
            Gerenciar Fichas de Treino
          </button>

          {/* 🚨 BOTÃO DE AVALIAÇÕES FÍSICAS ADICIONADO */}
          <button 
            className="dashboard-btn"
            onClick={gerenciarAvaliacoes}
          >
            Gerenciar Avaliações Físicas
          </button>
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;