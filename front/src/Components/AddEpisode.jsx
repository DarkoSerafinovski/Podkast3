import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Molimo vas da učitate video ili audio fajl.');
      return;
    }

    console.log('New Episode:', {
      podcastId,
      ...formData,
      file,
    });

    alert('Epizoda uspešno dodata!');
    navigate(`/podcast/${podcastId}`); // Vrati korisnika na stranicu detalja podkasta
  };

  return (
    <div className="add-episode">
      <Navigation />
      <div className="form-container">
        <h2>Dodaj Novu Epizodu</h2>
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
            accept="audio/*,video/*"
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
