import { StrictMode } from 'react'; // Importa o modo estrito do React
import { createRoot } from 'react-dom/client'; // Importa a função para criar a raiz da aplicação
import './index.css'; // Importa o arquivo de estilo principal
import App from './App.jsx'; // Importa o componente principal da aplicação

// Cria a raiz da aplicação e renderiza o componente App
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
