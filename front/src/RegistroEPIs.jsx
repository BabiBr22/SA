// src/RegistroEPIs.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Importe o axios se decidir usar
import './RegistroEPIs.css'; // Adicione o estilo específico para o registro de EPIs

const RegistroEPIs = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [epiName, setEpiName] = useState('');
  const [epiCode, setEpiCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [responseMessage, setResponseMessage] = useState('');  // Mensagem de resposta da API

  // Função para alternar o menu lateral
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegisterEPI = async () => {
    try {

      const data = {
        nome: epiName.trim(),
        codigo: epiCode.trim(),
        quantidade: quantity
      }

      console.log(data)
      
      const response = await axios.post('http://localhost:4000/epis', data);

      // Exibe uma mensagem de sucesso caso a criação seja bem-sucedida
      setResponseMessage('EPI registrado com sucesso!');
      console.log('EPI Registrado:', response.data);

      // Limpa os campos após o envio
      setEpiName('');
      setEpiCode('');
      setQuantity('');
    } catch (error) {
      // Exibe um erro caso ocorra algum problema com a API
      setResponseMessage('Erro ao registrar EPI.');
      console.error('Erro ao registrar EPI:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <div>
      {/* Header com foto de usuário e menu */}
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

      {/* Menu lateral */}
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

      {/* Conteúdo principal */}
      <div className="content">
        <div className="form-container"> {/* Div cinza para os campos de registro */}
          <h1>Registro de EPIs</h1>
          <div>
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
              <button type="submit" className="register-button" onClick={() => handleRegisterEPI()}>Registrar EPI</button>
            </div>
          </div>

          {/* Exibe a mensagem de resposta da API */}
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegistroEPIs;
