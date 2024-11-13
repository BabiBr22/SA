// src/AtribuirEPI.jsx
import React, { useState } from 'react';
import axios from 'axios';
import "./AtribuirEPI.css";

const AtribuirEPI = ({ setCurrentPage }) => {
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [selectedEpi, setSelectedEpi] = useState('');
  const [quantity, setQuantity] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Função para atribuir EPI
  const handleAssignEPI = async (e) => {
    e.preventDefault();

    // Verificar se todos os campos foram preenchidos
    if (selectedFuncionario && selectedEpi && quantity) {
      try {
        // Dados a serem enviados na requisição
        const data = {
          funcionario: selectedFuncionario,
          epi: selectedEpi,
          quantidade: quantity
        };

        // Enviar os dados para a API de atribuição de EPI
        axios.post('http://localhost:4000/atribuirEpis', {});


        // Exibir mensagem de sucesso
        setResponseMessage('EPI atribuído com sucesso!');
      } catch (error) {
        // Exibir mensagem de erro em caso de falha
        setResponseMessage('Erro ao atribuir EPI.');
        console.error('Erro:', error);
      }
    } else {
      setResponseMessage('Preencha todos os campos.');
    }
  };

  return (
    <div>
      <header className="header">
        <div className="menu-icon" onClick={() => setCurrentPage('home')}>
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

      <div className="content">
        <h1>Atribuir EPI</h1>
        <form onSubmit={handleAssignEPI}>
          <div>
            <label>Funcionário:</label>
            <input
              type="text"
              value={selectedFuncionario}
              onChange={(e) => setSelectedFuncionario(e.target.value)}
              placeholder="Nome do Funcionário"
            />
          </div>
          <div>
            <label>EPI:</label>
            <input
              type="text"
              value={selectedEpi}
              onChange={(e) => setSelectedEpi(e.target.value)}
              placeholder="Nome do EPI"
            />
          </div>
          <div>
            <label>Quantidade:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantidade de EPIs"
            />
          </div>
          <button type="submit">Atribuir EPI</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default AtribuirEPI;
