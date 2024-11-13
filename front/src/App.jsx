// src/App.jsx
import React, { useState } from 'react';
import Login from './Login.jsx';
import Home from './Home.jsx';
import HistoricoEPIs from './HistoricoEPIs';
import HistoricoFuncionarios from './HistoricoFuncionarios'; // Importe o novo componente
import RegistroEPIs from './RegistroEPIs'; // Importe o componente de Registro de EPIs
import RegistroFuncionarios from './RegistroFuncionarios'; // Importe o componente de Registro de Funcionários
import AtribuirEPI from './AtribuirEpis'; // Corrigido para 'AtribuirEPI' com 'E' maiúsculo

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Estado para a página atual

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
      case 'atribuirEPI': // Corrigido para 'atribuirEPI'
        return <AtribuirEPI setCurrentPage={setCurrentPage} />; 
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
