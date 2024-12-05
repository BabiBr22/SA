import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AtribuirEPI.css";

const AtribuirEPI = ({ setCurrentPage }) => {
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [selectedEpi, setSelectedEpi] = useState('');
  const [quantity, setQuantity] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [epis, setEpis] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  // Buscar dados do backend
  const fetchEPIs = async () => {
    try {
      const episBanco = await axios.get('http://localhost:4000/epis');
      const funcionariosBanco = await axios.get('http://localhost:4000/funcionarios/');
      setEpis(episBanco.data);
      setFuncionarios(funcionariosBanco.data);
    } catch (error) {
      console.error('Erro ao carregar EPIs:', error);
      alert('Erro ao carregar dados dos EPIs.');
    }
  };

  useEffect(() => {
    fetchEPIs();
  }, []);

  // Função para atribuir EPI
  const handleAssignEPI = async (e) => {
    e.preventDefault();

    // Verificar se todos os campos foram preenchidos
    if (selectedFuncionario && selectedEpi && quantity) {
      try {
        // Dados a serem enviados na requisição
        const data = {
          funcionarioId: selectedFuncionario,
          epiId: selectedEpi,
          quantidade: quantity
        };

        // Enviar os dados para a API de atribuição de EPI e aguardar a resposta
        const response = await axios.post('http://localhost:4000/movimentacao', data);

        // Verificar a resposta e definir a mensagem de sucesso
        if (response.status === 201) { // ou outro status que indique sucesso
          setResponseMessage('EPI atribuído com sucesso!');
        } else {
          setResponseMessage('Erro ao atribuir EPI.');
        }
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
            <select onChange={(event) => setSelectedFuncionario(event.target.value)} value={selectedFuncionario}>
              <option value="">Selecione um funcionário</option>
              {funcionarios.map(item => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label>EPI:</label>
            <select onChange={(event) => setSelectedEpi(event.target.value)} value={selectedEpi}>
              <option value="">Selecione um EPI</option>
              {epis.map(item => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </select>
          </div>
          
          <button type="submit">Atribuir EPI</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default AtribuirEPI;
