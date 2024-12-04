import React, { useState, useEffect } from 'react';
import './HistoricoEPIs.css';
import axios from 'axios';

const HistoricoEPIs = ({ setCurrentPage }) => {
  const [epIs, setEpIs] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEPI, setEditingEPI] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
  });

  // Buscar dados do backend
  const fetchEPIs = async () => {
    try {
      const res = await axios.get('http://localhost:4000/epis');
      setEpIs(res.data);
    } catch (error) {
      console.error('Erro ao carregar EPIs:', error);
      alert('Erro ao carregar dados dos EPIs.');
    }
  };

  useEffect(() => {
    fetchEPIs();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = () => {
    const filtered = epIs.filter((epi) =>
      epi.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEpIs(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/epis/${id}`);
      setEpIs(epIs.filter((epi) => epi.id !== id));
      alert('EPI excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir o EPI:', error);
      alert('Erro ao excluir o EPI.');
    }
  };

  // Abrir o modal de edição
  const handleEdit = (epi) => {
    setEditingEPI(epi);
    setFormData({
      nome: epi.nome,
      categoria: epi.categoria,
    });
  };

  // Atualizar os dados do formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Salvar alterações do EPI
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedEPI = await axios.put(
        `http://localhost:4000/epis/${editingEPI.id}`,
        formData
      );
      setEpIs(
        epIs.map((epi) => (epi.id === editingEPI.id ? updatedEPI.data : epi))
      );
      setEditingEPI(null);
      alert('EPI atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar EPI:', error);
      alert('Erro ao atualizar o EPI.');
    }
  };

  // Cancelar edição
  const cancelEditing = () => setEditingEPI(null);

  return (
    <div>
      {/* Cabeçalho */}
      <header className="header">
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div>
        <div className="user-photo">
          <img
            src="https://img.freepik.com/fotos-gratis/fundo_53876-32175.jpg"
            alt="Perfil"
            className="profile-picture"
          />
          <span className="username">Nome do Usuário</span>
        </div>
      </header>

      {/* Menu Lateral */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => setCurrentPage('home')}>Home</li>
          <li onClick={() => setCurrentPage('historico')}>Histórico de EPIs</li>
          <li onClick={() => setCurrentPage('historicoFuncionarios')}>
            Histórico de Funcionários
          </li>
          <li onClick={() => setCurrentPage('registroEPIs')}>Registro de EPIs</li>
          <li onClick={() => setCurrentPage('registroFuncionarios')}>
            Registro de Funcionários
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="content">
        {/* Barra de Busca */}
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar EPI..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Buscar
          </button>
        </div>
        {/* Tabela de EPIs */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do EPI</th>
                <th>Categoria</th>
                {/* <th>Data de Devolução</th> */}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {epIs.length > 0 ? (
                epIs.map((epi) => (
                  <tr key={epi.id}>
                    <td>{epi.id}</td>
                    <td>{epi.nome}</td>
                    <td>{epi.categoria}</td>
                    {/* <td>{epi.dataDevolucao}</td> */}
                    <td>
                      <button id='editar'
                        onClick={() => handleEdit(epi)}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button id='deletar'
                        onClick={() => handleDelete(epi.id)}
                        className="delete-button"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Nenhum EPI encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edição */}
      {editingEPI && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar EPI</h2>
            <form onSubmit={handleUpdate}>
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label>Categoria:</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleFormChange}
                  required
                />
              </div>
              {/* <div>
                <label>Data de Devolução:</label>
                <input
                  type="date"
                  name="dataDevolucao"
                  value={formData.dataDevolucao}
                  onChange={handleFormChange}
                />
              </div> */}
              <div>
                <button type="submit" className="submit-button">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="cancel-button"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricoEPIs;
