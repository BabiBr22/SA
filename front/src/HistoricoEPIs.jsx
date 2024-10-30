// HistoricoEPIs.jsx
import React, { useState } from 'react';
import './HistoricoEPIs.css';

const HistoricoEPIs = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <input type="text" placeholder="Pesquisar EPI..." className="search-input" />
          <button className="search-button">Buscar</button>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do EPI</th>
                <th>Data de Retirada</th>
                <th>Data de Devolução</th>
                <th>Funcionário</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Capacete</td>
                <td>01/10/2024</td>
                <td>05/10/2024</td>
                <td>João Silva</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Óculos de Proteção</td>
                <td>02/10/2024</td>
                <td>06/10/2024</td>
                <td>Maria Santos</td>
              </tr>
              {/* Adicione mais linhas conforme necessário */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoricoEPIs;
