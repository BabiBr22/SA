import React, { useState } from 'react';
import './Login.css'; // Estilo

const Login = ({ onLogin }) => {
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
        body: JSON.stringify({ email, password }), // Correto: 'password'
      });

      console.log('Response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        onLogin(); // Chama a função onLogin ao fazer login
      } else {
        const errorData = await response.json();
        console.log('Error Data:', errorData);
        setErrorMessage(errorData.error || 'Erro desconhecido'); // Exibe a mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setErrorMessage('Erro ao realizar login'); // Exibe mensagem de erro genérica
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
