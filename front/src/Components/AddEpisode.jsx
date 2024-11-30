import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navigation from './Navigation';
import './AddEpisode.css';

const AddEpisode = () => {
  const navigate = useNavigate();
  const { podcastId } = useParams(); // ID podkasta iz URL-a
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validacija ako je potrebno
    if (!formData.title || !formData.description || !file) {
      setMessage('Sva polja su obavezna.');
      return;
    }

    const requestData = new FormData();
    requestData.append('title', formData.title);
    requestData.append('description', formData.description);
    requestData.append('file', file);
    requestData.append('podcast_id', podcastId); // ID podkasta iz URL-a

    try {
      const response = await axios.post('http://localhost:8000/api/episodes', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${window.sessionStorage.getItem('auth_token')}`,
        },
      });

      setMessage('Epizoda uspešno dodata!');
      setFormData({ title: '', description: '' });
      setFile(null);

      
      navigate(`/podcast/${podcastId}`);
    } catch (error) {
      console.error('Greška prilikom dodavanja epizode:', error);
      setMessage('Došlo je do greške pri dodavanju epizode.');
    }
  };

  return (
    <div className="add-episode">
      <Navigation />
      <div className="form-container">
        <h2>Dodaj Novu Epizodu</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Naziv Epizode</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label>Opis Epizode</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <label>Učitaj Video ili Audio</label>
          <input
            type="file"
            accept=".mp4, .mp3"
            onChange={handleFileChange}
            required
          />
          <button type="submit" className="btn submit-btn">Dodaj Epizodu</button>
        </form>
      </div>
    </div>
  );
};

export default AddEpisode;
