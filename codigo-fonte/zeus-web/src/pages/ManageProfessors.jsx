"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import api from "../services/api"
import HeaderAdmin from "../components/HeaderAdmin"
import FooterAdmin from "../components/FooterAdmin"
import SearchBar from "../components/SearchBar"
import "./ManageProfessors.css"

const ManageProfessors = () => {
  const navigate = useNavigate()
  const [professors, setProfessors] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchProfessors()
  }, [])

  const fetchProfessors = async () => {
    try {
      const response = await api.get("/admin/professores")
      setProfessors(response.data)
    } catch (error) {
      console.error("Erro ao buscar professores:", error)
      alert("Erro ao carregar lista de professores.")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este professor?")) {
      try {
        await api.delete(`/admin/professores/${id}`)
        alert("Professor excluído com sucesso!")
        fetchProfessors()
      } catch (error) {
        console.error("Erro ao excluir professor:", error)
        alert("Falha ao excluir professor.")
      }
    }
  }

  const filteredProfessors = professors.filter((prof) => prof.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="professors-container">
      <HeaderAdmin />

      <main className="professors-main">
        <h1 className="professors-title">Professores</h1>

        <div className="add-professor-section">
          <button className="add-professor-btn" onClick={() => navigate("/professores/cadastrar")}>
            <FaPlus />
          </button>
          <span className="add-professor-text">Cadastrar professor</span>
        </div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Pesquisar por nome do professor..."
          className="full-width"
        />

        <div className="professors-list">
          {filteredProfessors.length > 0 ? (
            filteredProfessors.map((prof) => (
              <div key={prof.id} className="professor-item">
                <span className="professor-name">{prof.name}</span>
                <div className="professor-actions">
                  <button className="action-btn" onClick={() => navigate(`/professores/editar/${prof.id}`)}>
                    <FaEdit />
                  </button>
                  <button className="action-btn" onClick={() => handleDelete(prof.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">Nenhum professor encontrado.</p>
          )}
        </div>
      </main>

      <FooterAdmin />
    </div>
  )
}

export default ManageProfessors
