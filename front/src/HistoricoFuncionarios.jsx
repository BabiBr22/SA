import React, { useState } from 'react';
import './HistoricoFuncionarios.css'; // Estilo específico para o histórico de Funcionários

const HistoricoFuncionarios = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    // Aqui você pode implementar a lógica para buscar os funcionários
    console.log("Buscando por:", searchTerm);
    alert(`Buscando por: ${searchTerm}`); // Exibe um alerta com o termo de busca
  };

  return (
    <div>
      <header className="header">
        <div className="menu-icon" onClick={toggleMenu} aria-label="Abrir menu">
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
        <div className="sidebar-content">
          <h3>Menu</h3>
          <ul>
            <li onClick={() => setCurrentPage('home')}>Home</li>
            <li onClick={() => setCurrentPage('historico')}>Histórico de EPIs</li>
            <li onClick={() => setCurrentPage('historicoFuncionarios')}>Histórico de Funcionários</li>
            <li onClick={() => setCurrentPage('registroEPIs')}>Registro de EPIs</li>
            <li onClick={() => setCurrentPage('registroFuncionarios')}>Registro de Funcionários</li>
          </ul>
        </div>
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
          <button onClick={handleSearch} className="search-button">Buscar</button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Funcionário</th>
                <th>Data de Acesso</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemplo de dados do histórico de funcionários */}
              <tr>
                <td>1</td>
                <td>João Silva</td>
                <td>01/10/2024</td>
                <td>Detalhes...</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Maria Santos</td>
                <td>02/10/2024</td>
                <td>Detalhes...</td>
              </tr>
              {/* Adicione mais linhas conforme necessário */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoricoFuncionarios;
