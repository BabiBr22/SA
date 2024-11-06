import React, { useState, useEffect } from 'react';
import './HistoricoFuncionarios.css';

const HistoricoFuncionarios = ({ setCurrentPage }) => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Carregando dados

  // Buscar os dados dos funcionários e EPIs
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch('/epis/funcionarios/historico');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }

        // Verifique se a resposta é JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setFuncionarios(data);
          setFilteredFuncionarios(data); // Inicializa com todos os funcionários
        } else {
          throw new Error('Resposta não é JSON');
        }
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    // Filtragem dos funcionários com base no nome
    const filtered = funcionarios.filter((funcionario) =>
      funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFuncionarios(filtered);
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe um texto de loading enquanto os dados são buscados
  }

  return (
    <div>
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

      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => setCurrentPage('home')}>Home</li>
          <li onClick={() => setCurrentPage('historico')}>Histórico de EPIs</li>
          <li onClick={() => setCurrentPage('historicoFuncionarios')}>Histórico de Funcionários</li>
          <li onClick={() => setCurrentPage('registroEPIs')}>Registro de EPIs</li>
          <li onClick={() => setCurrentPage('registroFuncionarios')}>Registro de Funcionários</li>
        </ul>
      </div>

      <div className="content">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar funcionário..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Buscar
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Funcionário</th>
                <th>EPIs Retirados</th>
              </tr>
            </thead>
            <tbody>
              {filteredFuncionarios.length > 0 ? (
                filteredFuncionarios.map((funcionario) => (
                  <tr key={funcionario.id}>
                    <td>{funcionario.id}</td>
                    <td>{funcionario.nome}</td>
                    <td>
                      {funcionario.EPIs && funcionario.EPIs.length > 0 ? (
                        <ul>
                          {funcionario.EPIs.map((epi, index) => (
                            <li key={index}>{epi.nome} - {epi.descricao}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>Sem EPIs</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nenhum funcionário encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoricoFuncionarios;
