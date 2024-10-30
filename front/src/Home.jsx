// src/Home.jsx
import React, { useState } from 'react';
import './Home.css';

const Home = ({ setCurrentPage }) => {
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
        <div className="profile-container">
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
            <li onClick={() => setCurrentPage('registroFuncionarios')}>Registro de Funcionários</li> {/* Novo item no menu */}
          </ul>
        </div>
      </div>
      <div className="image-container">
        <img 
          src="https://img.freepik.com/fotos-premium/quadro-retangular-quadro-de-madeira-antigo-estilo-vintage-com-vazio-e-isolado_545033-2817.jpg?semt=ais_hybrid" 
          alt="Descrição" 
        />
      </div>
      <div className="content">
        <div className="cards-container">
          <div className="card" onClick={() => setCurrentPage('historico')}>
            <h3>Histórico de EPIs</h3>
          </div>
          <div className="card" onClick={() => setCurrentPage('historicoFuncionarios')}>
            <h3>Histórico de Funcionários</h3>
          </div>
          <div className="card" onClick={() => setCurrentPage('registroEPIs')}>
            <h3>Registro de EPIs</h3>
          </div>
          <div className="card" onClick={() => setCurrentPage('registroFuncionarios')}>
            <h3>Registro de Funcionários</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
