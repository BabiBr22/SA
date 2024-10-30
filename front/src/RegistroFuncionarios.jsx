// src/RegistroFuncionarios.jsx
import React, { useState } from 'react';
import './RegistroFuncionarios.css'; // Adicione o estilo específico para o registro de funcionários

const RegistroFuncionarios = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegisterEmployee = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    // Aqui você pode adicionar a lógica para registrar o funcionário, como enviar para a API
    if (employeeName.trim() && position.trim() && employeeId.trim()) {
      console.log('Funcionário Registrado:', { employeeName, position, employeeId });
      // Limpa os campos de entrada após o envio
      setEmployeeName('');
      setPosition('');
      setEmployeeId('');
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
          <h1>Registro de Funcionários</h1>
          <form onSubmit={handleRegisterEmployee}>
            <div className="form-group">
              <input 
                type="text" 
                value={employeeName} 
                onChange={(e) => setEmployeeName(e.target.value)} 
                placeholder="Nome do Funcionário" 
                className="employee-input"
                required 
              />
              <input 
                type="text" 
                value={position} 
                onChange={(e) => setPosition(e.target.value)} 
                placeholder="Cargo" 
                className="employee-input"
                required 
              />
              <input 
                type="text" 
                value={employeeId} 
                onChange={(e) => setEmployeeId(e.target.value)} 
                placeholder="Número de Identificação" 
                className="employee-input"
                required 
              />
              <button type="submit" className="register-button">Registrar Funcionário</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroFuncionarios;
