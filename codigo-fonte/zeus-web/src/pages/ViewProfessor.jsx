import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout'; 
import './ViewProfessor.css'; // <<< CORREÇÃO AQUI: Importa da mesma pasta!

/**
 * Componente para Visualização Detalhada de Professor.
 * Rota: /professores/ver/:id
 */
const ViewProfessor = () => {
    // Captura o ID do professor da URL
    const { id } = useParams();

    // Dados de exemplo (Será substituído por chamada API)
    const professor = {
        id: id,
        nome: "João Silva",
        email: "joao.silva@academia.com",
        cpf: "123.456.789-00",
        dataCadastro: "2023-01-15",
        status: "Ativo",
        especialidade: "Musculação, Funcional"
    };

    return (
        <AdminLayout>
            <div className="view-professor-container">
                <h1 className="page-title">Visualizar Professor: {professor.nome}</h1>
                
                <div className="professor-details-card">
                    
                    <div className="detail-item">
                        <span className="detail-label">ID:</span>
                        <span className="detail-value">{professor.id}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">E-mail:</span>
                        <span className="detail-value">{professor.email}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">CPF:</span>
                        <span className="detail-value">{professor.cpf}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Status:</span>
                        <span className="detail-value status-active">{professor.status}</span>
                    </div>
                    
                    <div className="detail-item full-width">
                        <span className="detail-label">Especialidade:</span>
                        <span className="detail-value">{professor.especialidade}</span>
                    </div>

                </div>

                <div className="action-buttons-group">
                    <Link to={`/professores/editar/${professor.id}`} className="btn-edit-details">
                        Editar Dados
                    </Link>
                    <button className="btn-back-list" onClick={() => window.history.back()}>
                        Voltar para a Lista
                    </button>
                </div>

            </div>
        </AdminLayout>
    );
}

export default ViewProfessor;
