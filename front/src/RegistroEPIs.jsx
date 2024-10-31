// src/RegistroEPIs.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Importe o axios se decidir usar
import './RegistroEPIs.css'; // Adicione o estilo específico para o registro de EPIs

const RegistroEPIs = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [epiName, setEpiName] = useState('');
  const [epiCode, setEpiCode] = useState('');
  const [quantity, setQuantity] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegisterEPI = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    // Aqui você pode adicionar a lógica para registrar o EPI, como enviar para a API
    if (epiName.trim() && epiCode.trim() && quantity.trim()) {
      try {
        // Envie os dados do EPI para a API
        const response = await axios.post('http://localhost:4000/epis', {
          nome: epiName,
          codigo: epiCode,
          quantidade: quantity
        });
        console.log('EPI Registrado:', response.data); 
        
        // Limpa os campos de entrada após o envio
        setEpiName('');
        setEpiCode('');
        setQuantity('');
      } catch (error) {
        console.error('Erro ao registrar EPI:', error.response.data);
      }
    }
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
        <div className="form-container"> {/* Div cinza para os campos de registro */}
          <h1>Registro de EPIs</h1>
          <form onSubmit={handleRegisterEPI}>
            <div className="form-group">
              <input 
                type="text" 
                value={epiName} 
                onChange={(e) => setEpiName(e.target.value)} 
                placeholder="Nome do EPI" 
                className="epi-input"
                required 
              />
              <input 
                type="text" 
                value={epiCode} 
                onChange={(e) => setEpiCode(e.target.value)} 
                placeholder="Código do EPI" 
                className="epi-input"
                required 
              />
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                placeholder="Quantidade" 
                className="epi-input"
                required 
              />
              <button type="submit" className="register-button">Registrar EPI</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroEPIs;
