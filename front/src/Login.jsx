import React, { useState } from 'react';
import './Login.css'; // Estilo

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Lista fixa de usuários
  const usuariosFixos = [
    { email: 'usuario1@empresa.com', senha: 'senha1' },
    { email: 'usuario2@empresa.com', senha: 'senha2' },
    { email: 'usuario3@empresa.com', senha: 'senha3' },
    { email: 'usuario4@empresa.com', senha: 'senha4' },
    { email: 'usuario5@empresa.com', senha: 'senha5' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Verifica se o email e senha existem na lista de usuários fixos
    const usuarioValido = usuariosFixos.find(
      (usuario) => usuario.email === email && usuario.senha === password
    );

    if (!usuarioValido) {
      alert('Email ou senha inválidos');
      return;
    }

    // Caso o login seja bem-sucedido
    alert('Login realizado com sucesso!');
    onLogin(); // Chama a função de login passada como prop
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
