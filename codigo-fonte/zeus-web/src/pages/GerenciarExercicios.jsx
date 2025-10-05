import './GerenciarExercicios.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
  import { AiFillDelete, AiFillEdit}from 'react-icons/ai';
  

const baseURL = 'http://localhost:3000';

const GerenciarExercicio = () => {
  const navigate = useNavigate();
  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedId, setHighlightedId] = useState(null);

  // Pop-up states
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [formData, setFormData] = useState({
    nome: '',
    grupoMuscular: '',
    descricao: '',
    id: null
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${baseURL}/admin/exercises`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setExercicios(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar exercícios.');
        setLoading(false);
      });
  }, [token, showForm]);

  useEffect(() => {
    if (search.trim() === '') {
      setSuggestions([]);
      return;
    }
    const lowerSearch = search.toLowerCase();
    const filtered = exercicios.filter(ex =>
      ex.nome.toLowerCase().includes(lowerSearch)
    );
    setSuggestions(filtered.slice(0, 5));
  }, [search, exercicios]);

  const handleSuggestionClick = (exercicio) => {
    setSearch(exercicio.nome);
    setSuggestions([]);
    setHighlightedId(exercicio.id);
    setExercicios(prev => {
      const others = prev.filter(e => e.id !== exercicio.id);
      return [exercicio, ...others];
    });
  };

  const gerenciarAluno = () => {
    navigate('/alunos');
  };

  // Abrir formulário para criar novo exercício
  const openCreateForm = () => {
    setFormMode('create');
    setFormData({ nome: '', grupoMuscular: '', descricao: '', id: null });
    setShowForm(true);
  };

  // Abrir formulário para editar exercício
  const openEditForm = (exercicio) => {
    setFormMode('edit');
    setFormData({
      nome: exercicio.nome,
      grupoMuscular: exercicio.exerGrupo || '',
      descricao: exercicio.comentario || '',
      id: exercicio.id
    });
    setShowForm(true);
  };

  // Fechar pop-up
  const closeForm = () => {
    setShowForm(false);
    setFormData({ nome: '', grupoMuscular: '', descricao: '', id: null });
  };

  // Salvar exercício (criar ou editar)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const method = formMode === 'create' ? 'POST' : 'PUT';
      const url =
        formMode === 'create'
          ? `${baseURL}/admin/exercises`
          : `${baseURL}/admin/exercises/${formData.id}`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: formData.nome,
          exerGrupo: formData.grupoMuscular,
          comentario: formData.descricao,
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao salvar exercício.');
      }
      closeForm();
    } catch (err) {
      setError('Erro ao salvar exercício.');
    } finally {
      setLoading(false);
    }
  };

  // Atualiza campos do formulário
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este exercício?')) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/admin/exercises/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir exercício.');
      }
      setExercicios(prev => prev.filter(ex => ex.id !== id));
    } catch (err) {
      setError('Erro ao excluir exercício.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header Laranja */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Zeus Gym</h1>
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
      </header>

      {/* Conteúdo em Branco */}
      <main className="dashboard-main">
        <div className="dashboard-buttons">
          <button className="dashboard-btn">
            Gerenciar Professores
          </button>
          <button className="dashboard-btn" onClick={gerenciarAluno}>
            Gerenciar Alunos
          </button>
          <button className="dashboard-btn" onClick={openCreateForm}>
            Criar novo exercício
          </button>
        </div>

        {/* Campo de pesquisa */}
        <section style={{ marginTop: '2rem' }}>
          <h2>Gerenciar de Exercícios</h2>
          <input
            type="text"
            placeholder="Pesquisar exercício..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          />
          {/* Sugestões */}
          {suggestions.length > 0 && (
            <ul style={{
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '8px',
              listStyle: 'none',
              padding: '4px'
            }}>
              {suggestions.map(exercicio => (
                <li
                  key={exercicio.id}
                  style={{ cursor: 'pointer', padding: '4px' }}
                  onClick={() => handleSuggestionClick(exercicio)}
                >
                  {exercicio.nome}
                </li>
              ))}
            </ul>
          )}
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {(!loading && exercicios.length === 0) && (
            <p style={{ color: 'gray' }}>Não há exercícios cadastrados.</p>
          )}
          {/* Área de rolagem para lista de exercícios */}
          <div style={{
            maxHeight: '480px',
            overflowY: 'auto',
            border: '1px solid #eee',
            borderRadius: '6px',
            padding: '8px',
            background: '#fafafa'
          }}>
            <ul style={{ margin: 0, padding: 0 }}>
              {(() => {
                let sorted = [...exercicios].sort((a, b) => a.nome.localeCompare(b.nome));
                if (search.trim()) {
                  const lowerSearch = search.toLowerCase();
                  const closest = sorted.find(ex => ex.nome.toLowerCase().includes(lowerSearch));
                  if (closest) {
                    sorted = [closest, ...sorted.filter(ex => ex.id !== closest.id)];
                  }
                }
                return sorted.map((exercicio, idx) => (
                  <li
                    key={exercicio.id}
                    className={
                      search.trim() &&
                      idx === 0 &&
                      exercicio.nome.toLowerCase().includes(search.toLowerCase())
                        ? 'highlighted'
                        : ''
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px',
                      padding: '4px 0',
                      listStyle: 'none'
                    }}
                  >
                    <span style={{ flex: 1 }}>{exercicio.nome}</span>
                    <AiFillEdit style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => openEditForm(exercicio)} />
                    <AiFillDelete style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => handleDelete(exercicio.id)} />
                  </li>
                ));
              })()}
            </ul>
          </div>
        </section>
      </main>

      {/* Pop-up do formulário */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>{formMode === 'create' ? 'Criar Exercício' : 'Editar Exercício'}</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Nome do exercício:
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', marginBottom: '8px' }}
                />
              </label>
              <label>
                Grupo muscular:
                <input
                  type="text"
                  name="grupoMuscular"
                  value={formData.grupoMuscular}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', marginBottom: '8px' }}
                />
              </label>
              <label>
                Descrição:
                <input
                  type="text"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  style={{ width: '100%', marginBottom: '16px' }}
                />
              </label>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="submit" style={{ flex: 1 }}>
                  {formMode === 'create' ? 'Criar' : 'Salvar'}
                </button>
                <button type="button" style={{ flex: 1 }} onClick={closeForm}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
          {/* Estilo simples para o pop-up */}
          <style>{`
            .popup-overlay {
              position: fixed;
              top: 0; left: 0; right: 0; bottom: 0;
              background: rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
            }
            .popup-form {
              background: #fff;
              padding: 24px;
              border-radius: 8px;
              min-width: 320px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default GerenciarExercicio;