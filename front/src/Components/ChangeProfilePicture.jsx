import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ChangeProfilePicture.css';

const ChangeProfilePicture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPicture = location.state?.currentPicture; // Preuzimanje trenutne slike iz state-a
  const [newProfilePicture, setNewProfilePicture] = useState(null); // Za čuvanje nove slike
  const [preview, setPreview] = useState(currentPicture || null); // Prikaz trenutne ili nove slike

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePicture(file);
    setPreview(URL.createObjectURL(file)); // Ažuriranje prikaza slike
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user_id');

    const formData = new FormData();
    formData.append('profile_picture', newProfilePicture);
    formData.append('_method', 'put'); // Laravel PUT metoda

    try {
      await axios.post(`http://127.0.0.1:8000/api/users`, formData, {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
          "Content-Type": "multipart/form-data",
        },
      });
      alert('Profilna slika je uspešno ažurirana!');
      navigate('/my-account'); // Povratak na MyAccount stranicu
    } catch (error) {
      console.error('Error updating profile picture:', error);
      alert('Došlo je do greške prilikom promene profilne slike.');
    }
  };

  return (
    <div className="change-profile-picture">
      <h1>Promeni Profilnu Sliku</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="newProfilePicture">Izaberi novu sliku:</label>
          <input
            type="file"
            id="newProfilePicture"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        {preview && (
          <div className="image-preview">
            <p>Pregled slike:</p>
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          </div>
        )}
        <button type="submit" className="btn save-btn">
          Sačuvaj promenu
        </button>
      </form>
      <button onClick={() => navigate('/my-account')} className="btn cancel-btn">
        Otkaži
      </button>
    </div>
  );
};

export default ChangeProfilePicture;
