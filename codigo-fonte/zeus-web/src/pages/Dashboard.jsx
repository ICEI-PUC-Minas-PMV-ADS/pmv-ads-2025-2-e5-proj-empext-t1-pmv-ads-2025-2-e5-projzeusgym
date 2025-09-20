// src/pages/Dashboard.jsx
import './Dashboard.css';

const Dashboard = () => {
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
          <button className="dashboard-btn">
            Gerenciar Professores
          </button>
          <button className="dashboard-btn">
            Gerenciar Alunos
          </button>
          <button className="dashboard-btn">
            Gerenciar Exercícios
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;