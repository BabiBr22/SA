import React, { useState } from 'react';
import axios from 'axios';
import './RegistroFuncionarios.css';

const RegistroFuncionarios = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegisterEmployee = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (employeeName.trim() && position.trim() && employeeId.trim()) {
      try {
        const response = await axios.post('http://localhost:4000/funcionarios', {
          nome: employeeName,
          cargo: position,
          identificacao: employeeId,
        });
        console.log('Funcionário Registrado:', response.data);
        setSuccess('Funcionário registrado com sucesso!');

        setEmployeeName('');
        setPosition('');
        setEmployeeId('');
      } catch (error) {
        console.error('Erro ao registrar funcionário:', error.response.data);
        setError('Erro ao registrar funcionário: ' + error.response.data.error);
      } finally {
        setIsSubmitting(false);
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
        <div className="form-container">
          <h1>Registro de Funcionários</h1>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
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
              <button type="submit" className="register-button" disabled={isSubmitting}>
                {isSubmitting ? 'Registrando...' : 'Registrar Funcionário'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroFuncionarios;
