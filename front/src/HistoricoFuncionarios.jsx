import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoricoFuncionarios = ({ setCurrentPage }) => {
  // Estados principais
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingFuncionario, setEditingFuncionario] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    identificacao: '',
  });

  // Função para buscar dados do backend
  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:4000/funcionarios/');
      setFuncionarios(response.data);
      setFilteredFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      alert('Erro ao carregar os dados.');
    }
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  // Alternar o menu lateral
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Atualizar o estado de busca
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filtrar funcionários com base no termo de busca
  const handleSearch = () => {
    const filtered = funcionarios.filter((func) =>
      func.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFuncionarios(filtered);
  };

  // Excluir funcionário
  const deleteFuncionario = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/funcionarios/${id}`);
      const updatedFuncionarios = funcionarios.filter((func) => func.id !== id);
      setFuncionarios(updatedFuncionarios);
      setFilteredFuncionarios(updatedFuncionarios);
      alert('Funcionário excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
      alert('Erro ao excluir funcionário.');
    }
  };

  // Iniciar a edição de um funcionário
  const startEditing = (funcionario) => {
    setEditingFuncionario(funcionario);
    setFormData({
      nome: funcionario.nome,
      cargo: funcionario.cargo,
      identificacao: funcionario.identificacao,
    });
  };

  // Atualizar os dados do formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Atualizar funcionário
  const updateFuncionario = async (e) => {
    e.preventDefault();
    try {
      const updatedFuncionario = await axios.put(
        `http://localhost:4000/funcionarios/${editingFuncionario.id}`,
        formData
      );

      const updatedList = funcionarios.map((func) =>
        func.id === editingFuncionario.id ? updatedFuncionario.data : func
      );
      setFuncionarios(updatedList);
      setFilteredFuncionarios(updatedList);
      setEditingFuncionario(null);
      alert('Funcionário atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      alert('Erro ao atualizar funcionário.');
    }
  };

  // Cancelar a edição
  const cancelEditing = () => setEditingFuncionario(null);

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
      <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => setCurrentPage('home')}>Home</li>
          <li onClick={() => setCurrentPage('historico')}>Histórico de EPIs</li>
          <li onClick={() => setCurrentPage('historicoFuncionarios')}>Histórico de Funcionários</li>
          <li onClick={() => setCurrentPage('registroEPIs')}>Registro de EPIs</li>
          <li onClick={() => setCurrentPage('registroFuncionarios')}>Registro de Funcionários</li>
        </ul>
      </aside>

      {/* Conteúdo Principal */}
      <main className="content">
        {/* Barra de Busca */}
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar funcionário..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Buscar
          </button>
        </div>

        {/* Tabela de Funcionários */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Funcionário</th>
                <th>Cargo</th>
                <th>Identificação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredFuncionarios.length > 0 ? (
                filteredFuncionarios.map((func) => (
                  <tr key={func.id}>
                    <td>{func.id}</td>
                    <td>{func.nome}</td>
                    <td>{func.cargo || 'Não informado'}</td>
                    <td>{func.identificacao || 'Não informado'}</td>
                    <td>
                      <button
                        id="editar"
                        onClick={() => startEditing(func)}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button
                        id="deletar"
                        onClick={() => deleteFuncionario(func.id)}
                        className="delete-button"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Nenhum funcionário encontrado.</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </main>

      {/* Modal de Edição */}
      {editingFuncionario && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Funcionário</h2>
            <form onSubmit={updateFuncionario}>
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
                <label>Cargo:</label>
                <input
                  type="text"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label>Identificação:</label>
                <input
                  type="text"
                  name="identificacao"
                  value={formData.identificacao}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <button type="submit" className="submit-button">
                  Atualizar
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

export default HistoricoFuncionarios;
