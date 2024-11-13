// src/Home.jsx
import React, { useState } from 'react';
import './Home.css';

const Home = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);  // Fecha o menu após clicar em um item
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
            <li onClick={() => handleMenuItemClick('home')}>Home</li>
            <li onClick={() => handleMenuItemClick('historico')}>Histórico de EPIs</li>
            <li onClick={() => handleMenuItemClick('historicoFuncionarios')}>Histórico de Funcionários</li>
            <li onClick={() => handleMenuItemClick('registroEPIs')}>Registro de EPIs</li>
            <li onClick={() => handleMenuItemClick('registroFuncionarios')}>Registro de Funcionários</li>
            <li onClick={() => handleMenuItemClick('atribuirEPI')}>Atribuir EPI</li> {/* Nova opção no menu */}
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
          <div className="card" onClick={() => handleMenuItemClick('historico')}>
            <h3>Histórico de EPIs</h3>
          </div>
          <div className="card" onClick={() => handleMenuItemClick('historicoFuncionarios')}>
            <h3>Histórico de Funcionários</h3>
          </div>
          <div className="card" onClick={() => handleMenuItemClick('registroEPIs')}>
            <h3>Registro de EPIs</h3>
          </div>
          <div className="card" onClick={() => handleMenuItemClick('registroFuncionarios')}>
            <h3>Registro de Funcionários</h3>
          </div>
          <div className="card" onClick={() => handleMenuItemClick('atribuirEPI')}>
            <h3>Atribuir EPI</h3> {/* Cartão para a nova página */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
