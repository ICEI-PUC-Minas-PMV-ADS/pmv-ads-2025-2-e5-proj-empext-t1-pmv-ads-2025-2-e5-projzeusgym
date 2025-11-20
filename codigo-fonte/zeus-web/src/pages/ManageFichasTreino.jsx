"use client"

import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa"
import HeaderAdmin from "../components/HeaderAdmin"
import FooterAdmin from "../components/FooterAdmin"
import "./ManageFichasTreino.css"
import { API_BASE_URL } from '../config/api';

const ManageFichasTreino = () => {
  const navigate = useNavigate()
  const [fichas, setFichas] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [mensagem, setMensagem] = useState(null)

  const token = localStorage.getItem("token")

  const fetchFichas = useCallback(async () => {
    setLoading(true)
    setMensagem(null)

    try {
      const response = await fetch(`${API_BASE_URL}/trainingsheets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erro desconhecido." }))
        throw new Error(
          `Falha ao carregar as fichas de treino. Status: ${response.status}. Detalhe: ${errorData.message}`,
        )
      }

      const data = await response.json()
      setFichas(data)
    } catch (err) {
      setMensagem({ type: "error", text: `Erro ao buscar fichas: ${err.message}` })
      setFichas([])
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchFichas()
  }, [fetchFichas])

  const handleDeletarFicha = async (fichaId, titulo) => {
    if (!window.confirm(`Tem certeza que deseja deletar a ficha "${titulo}"?`)) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainingsheets/${fichaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erro desconhecido." }))
        throw new Error(`Falha ao deletar a ficha. Detalhe: ${errorData.message}`)
      }

      setMensagem({ type: "success", text: `Ficha "${titulo}" deletada com sucesso!` })
      fetchFichas()
    } catch (err) {
      setMensagem({ type: "error", text: `Erro ao deletar: ${err.message}` })
    }
  }

  const fichasFiltradas = fichas.filter((ficha) => {
    const titulo = ficha.titulo || ficha.nome || ""
    const alunoNome =
      ficha.aluno && typeof ficha.aluno === "object" ? ficha.aluno.nome || ficha.aluno.name || "" : ficha.aluno || ""

    return (
      titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alunoNome.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="manage-fichas-container">
      <HeaderAdmin />

      <main className="manage-fichas-content">
        <h1 className="page-title">Fichas de Treino</h1>

        <div className="add-ficha-section">
          <button className="add-ficha-circle" onClick={() => navigate("/cadastrar-ficha")}>
            +
          </button>
          <span className="add-ficha-text">Cadastrar ficha</span>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Procurar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Mensagem de feedback */}
        {mensagem && <div className={`message ${mensagem.type}`}>{mensagem.text}</div>}

        <div className="fichas-list">
          {loading ? (
            <div className="loading-message">Carregando fichas...</div>
          ) : fichasFiltradas.length === 0 ? (
            <div className="empty-message">
              {searchTerm ? "Nenhuma ficha encontrada." : "Nenhuma ficha cadastrada."}
            </div>
          ) : (
            fichasFiltradas.map((ficha) => (
              <div key={ficha.id} className="ficha-item">
                <div className="ficha-info">
                  <div className="ficha-title">{ficha.titulo || ficha.nome}</div>
                  <div className="ficha-student">
                    Aluno:{" "}
                    {ficha.aluno && typeof ficha.aluno === "object"
                      ? ficha.aluno.nome || ficha.aluno.name || "Sem nome"
                      : ficha.aluno || "Não atribuído"}
                  </div>
                  {ficha.dataCriacao && (
                    <div className="ficha-date">Criado em: {new Date(ficha.dataCriacao).toLocaleDateString()}</div>
                  )}
                </div>
                <div className="ficha-actions">
                  <button
                    className="action-btn"
                    onClick={() => navigate(`/fichas-treino/${ficha.id}/view`)}
                    title="Ver ficha"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => navigate(`/fichas-treino/${ficha.id}/edit`)}
                    title="Editar ficha"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => handleDeletarFicha(ficha.id, ficha.titulo || ficha.nome)}
                    title="Deletar ficha"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <FooterAdmin />
    </div>
  )
}

export default ManageFichasTreino
