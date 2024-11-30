import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'viewer', 
  });
  const [profilePicture, setProfilePicture] = useState(null); 
  const [profilePreview, setProfilePreview] = useState(null); 
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  // Rukovanje unosom
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Ako je selektovana uloga "creator", obriši profilnu sliku iz stanja
    if (name === "role" && value === "creator") {
      setProfilePicture(null);
      setProfilePreview(null); // Brisanje pregleda slike kada je selektovan "creator"
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfilePreview(URL.createObjectURL(file)); 
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Šifre se ne poklapaju.');
      return;
    }

    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    if (profilePicture) {
      data.append('profile_picture', profilePicture);
    }

    axios
      .post('http://127.0.0.1:8000/api/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        if (response.data.success) {
          navigate('/'); 
        } else {
          processErrorMessages(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Greška pri registraciji:', error);
        setErrorMessage('Došlo je do greške. Molimo pokušajte ponovo.');
      });
  };

  const processErrorMessages = (errorData) => {
    const errors = [];
    for (const key in errorData) {
      if (Array.isArray(errorData[key])) {
        errors.push(...errorData[key]); // Dodaj sve poruke grešaka u niz
      }
    }
    setErrorMessage(errors);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Registracija</h1>
        <form onSubmit={handleRegister}>
          <label className="register-label">Korisničko ime</label>
          <input
            type="text"
            name="username"
            placeholder="Unesite korisničko ime"
            className="register-input"
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <label className="register-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Unesite email"
            className="register-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label className="register-label">Šifra</label>
          <input
            type="password"
            name="password"
            placeholder="Unesite šifru"
            className="register-input"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <label className="register-label">Potvrdite šifru</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Potvrdite šifru"
            className="register-input"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          {/* Prikazivanje sekcije za profilnu sliku samo ako je uloga "creator" */}
          {formData.role === 'creator' && (
            <>
              <label htmlFor="userProfile">Profilna slika</label>
              <input
                type="file"
                id="userProfile"
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg, .gif, .svg"
              />
              {profilePreview && (
                <img
                  src={profilePreview}
                  alt="Pregled slike"
                  style={{ marginTop: '10px', maxWidth: '200px' }}
                />
              )}
            </>
          )}

          <label className="register-label">Uloga</label>
          <select
            name="role"
            className="register-select"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="viewer">Gledalac</option>
            <option value="creator">Kreator</option>
          </select>

          <button type="submit" className="register-button">
            Registruj se
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
