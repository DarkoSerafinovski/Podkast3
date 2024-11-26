import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('viewer'); // Default uloga je gledalac

  const handleRegister = (e) => {
    e.preventDefault();
    // Ovde ćete dodati logiku za proveru i registraciju korisnika
    console.log('Korisnik registruje sa sledećim detaljima:');
    console.log(`Ime: ${e.target.name.value}`);
    console.log(`Email: ${e.target.email.value}`);
    console.log(`Uloga: ${role}`);
    navigate('/');
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Registracija</h1>
        <form onSubmit={handleRegister}>
          <label className="register-label">Ime</label>
          <input
            type="text"
            name="name"
            placeholder="Unesite ime"
            className="register-input"
            required
          />

          <label className="register-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Unesite email"
            className="register-input"
            required
          />

          <label className="register-label">Šifra</label>
          <input
            type="password"
            name="password"
            placeholder="Unesite šifru"
            className="register-input"
            required
          />

          <label className="register-label">Potvrdite šifru</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Potvrdite šifru"
            className="register-input"
            required
          />

          <label className="register-label">Uloga</label>
          <select
            name="role"
            className="register-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Gledalac</option>
            <option value="creator">Kreator</option>
          </select>

          <button type="submit" className="register-button">
            Registruj se
          </button>
        </form>
        <p className="register-link">
          Već imate nalog?{' '}
          <span onClick={() => navigate('/')} className="register-login-link">
            Prijavite se ovde
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
