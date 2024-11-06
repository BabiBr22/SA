import React, { useState, useEffect } from 'react';
import './HistoricoEPIs.css';

const HistoricoEPIs = ({ setCurrentPage }) => {
  const [epIs, setEpIs] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Carregando dados

  // Buscar os dados dos EPIs
  useEffect(() => {
    const fetchEPIs = async () => {
      try {
        const response = await fetch('/api/epis/historico');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }
        const data = await response.json();
        setEpIs(data);
      } catch (error) {
        console.error('Erro ao buscar EPIs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEPIs();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    // Implementar lógica de busca (filtragem de EPIs)
    const filtered = epIs.filter((epi) =>
      epi.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEpIs(filtered);
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
            placeholder="Pesquisar EPI..."
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
                <th>Nome do EPI</th>
                <th>Data de Retirada</th>
                <th>Data de Devolução</th>
              </tr>
            </thead>
            <tbody>
              {epIs.length > 0 ? (
                epIs.map((epi) => (
                  <tr key={epi.id}>
                    <td>{epi.id}</td>
                    <td>{epi.nome}</td>
                    <td>{epi.dataRetirada}</td>
                    <td>{epi.dataDevolucao}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nenhum EPI encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoricoEPIs;
