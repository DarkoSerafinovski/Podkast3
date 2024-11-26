import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  // Funkcija za proveru kredencijala (trenutno samo navigacija)
  const handleLogin = (event) => {
    event.preventDefault();
    // Kasnije dodaj logiku za proveru kredencijala
    navigate('/podkasti'); // Preusmeravanje na stranicu "Podkasti"
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Dobrodošli na Podcast Platformu</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Unesite vaš email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Šifra</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Unesite vašu šifru"
              required
            />
          </div>
          <button type="submit" className="login-button">Prijavi se</button>
        </form>
        <p className="register-link">
          Novi ste? <a href="/registracija">Registrujte se ovde</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
