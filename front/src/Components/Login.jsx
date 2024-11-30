import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Rukovanje unosom
  const handleInput = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  // Rukovanje prijavom
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/login', userData)
      .then((response) => {
        if (response.data.success === true) {
          window.sessionStorage.setItem('auth_token', response.data.access_token);
          window.sessionStorage.setItem('role', response.data.role);
          window.sessionStorage.setItem('user_id', response.data.data.id);

          navigate('/podkasti');
        } else {
          setErrorMessage('Pogrešan email ili lozinka.');
        }
      })
      .catch((error) => {
        console.error('Greška pri prijavi:', error);
        setErrorMessage('Došlo je do greške. Molimo pokušajte ponovo.');
      });
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
              name="email"
              className="form-input"
              placeholder="Unesite vaš email"
              value={userData.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Šifra</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Unesite vašu šifru"
              value={userData.password}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit" className="login-button">Prijavi se</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p className="register-link">
          Novi ste? <a href="/registracija">Registrujte se ovde</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
