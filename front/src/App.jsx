// src/App.jsx
import React, { useState } from 'react';
import Login from './Login.jsx';
import Home from './Home.jsx';
import HistoricoEPIs from './HistoricoEPIs'; // Componente de histórico de movimentação de EPIs
import HistoricoFuncionarios from './HistoricoFuncionarios';
import RegistroEPIs from './RegistroEPIs';
import RegistroFuncionarios from './RegistroFuncionarios';
import AtribuirEPI from './AtribuirEpis';
import Movimentacao from './Movimentacao.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'historico':
        return <HistoricoEPIs setCurrentPage={setCurrentPage} />;
      case 'historicoFuncionarios':
        return <HistoricoFuncionarios setCurrentPage={setCurrentPage} />;
      case 'registroEPIs':
        return <RegistroEPIs setCurrentPage={setCurrentPage} />;
      case 'registroFuncionarios':
        return <RegistroFuncionarios setCurrentPage={setCurrentPage} />;
      case 'atribuirEPI':
        return <AtribuirEPI setCurrentPage={setCurrentPage} />;
      case 'movimentacao':
        return <Movimentacao setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        renderPage() // Renderiza a página com base em currentPage
      )}
    </div>
  );
};

export default App;
