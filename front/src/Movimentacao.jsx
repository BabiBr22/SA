// src/HistoricoEPIs.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Movimentacao.css";

const HistoricoEPI = ({ setCurrentPage }) => {
  const [historico, setHistorico] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchHistorico = async () => {
    try {
      const response = await axios.get('http://localhost:4000/movimentacao');
      setHistorico(response.data);
    } catch (error) {
      console.error('Erro ao carregar o histórico:', error);
      alert('Erro ao carregar o histórico.');
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const groupByDate = (historico) => {
    return historico.reduce((groups, item) => {
      const date = new Date(item.dataHora).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});
  };

  const handleDevolucao = async (itemId) => {
    try {
      // Atualiza o status no banco de dados
      await axios.put(`http://localhost:4000/movimentacao/${itemId}`, { status: 'Devolvido' });
      // Atualiza o estado local
      setHistorico((prevHistorico) =>
        prevHistorico.map((item) =>
          item.id === itemId ? { ...item, status: 'Devolvido' } : item
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
      alert('Erro ao atualizar o status.');
    }
  };

  const groupedHistorico = groupByDate(historico);

  return (
    <div className="app">
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? 'Close' : 'Open'} Menu
      </button>

      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => setCurrentPage('home')}>Home</li>
          <li onClick={() => setCurrentPage('historico')}>Histórico de EPIs</li>
          <li onClick={() => setCurrentPage('historicoFuncionarios')}>Histórico de Funcionários</li>
          <li onClick={() => setCurrentPage('registroEPIs')}>Registro de EPIs</li>
          <li onClick={() => setCurrentPage('registroFuncionarios')}>Registro de Funcionários</li>
          <li onClick={() => setCurrentPage('atribuirEPI')}>Atribuir EPI</li>
        </ul>
      </div>

      <div className="historico-container">
        <header className="header">
          <h1>Histórico de Atribuição de EPIs</h1>
        </header>
        <div className="historico-content">
          {Object.keys(groupedHistorico).length > 0 ? (
            Object.keys(groupedHistorico).map((date, index) => (
              <div key={index} className="historico-date-group">
                <h2>{date}</h2>
                <div className="table-container">
                  <table className="historico-table">
                    <thead>
                      <tr>
                        <th>Data e Hora</th>
                        <th>Funcionário</th>
                        <th>EPI</th>
                        <th>Ações</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedHistorico[date].map((item, index) => (
                        <tr key={index}>
                          <td>{new Date(item.data_retirada).toLocaleString()}</td>
                          <td>{item.funcionarioId}</td>
                          <td>{item.epiId}</td>
                          <td>
                            <button onClick={() => handleDevolucao(item.id)}>
                              Devolução
                            </button>
                          </td>
                          <td>
                            {item.status ? item.status : 'Pendente'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <p>Não há registros de atribuição de EPIs.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricoEPI;