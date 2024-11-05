import React, { useState } from 'react';
import './Login.css'; // Importa o CSS para estilização

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }), // Atualização aqui: senha em vez de password
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        onLogin(); // Chama a função onLogin ao fazer login
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Erro desconhecido'); 
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setErrorMessage('Erro ao realizar login'); 
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default Login;
