import React, { useState } from 'react';
import Navigation from './Navigation';
import './AddPodcast.css';

const AddPodcast = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    banner: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Podcast:', formData);
    alert('Podcast uspešno dodat!');
  };

  return (
    <div className="add-podcast">
      <Navigation />
      <div className="form-container">
        <h2>Dodaj Novi Podcast</h2>
        <form onSubmit={handleSubmit}>
          <label>Naziv Podkasta</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label>Kategorija</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Izaberite kategoriju</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Comedy">Comedy</option>
          </select>
          <label>Opis</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <label>Banner Slika (URL)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit" className="btn submit-btn">
            Dodaj Podcast
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPodcast;
