import React, { useState } from 'react';
import Navigation from './Navigation';
import './Categories.css';

const Kategorije = () => {
  const [categories, setCategories] = useState([
    'Technology',
    'Music',
    'Lifestyle',
    'Education',
    'Comedy',
  ]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() === '') {
      alert('Naziv kategorije ne može biti prazan.');
      return;
    }
    if (categories.includes(newCategory.trim())) {
      alert('Ova kategorija već postoji.');
      return;
    }
    setCategories([...categories, newCategory.trim()]);
    setNewCategory('');
    alert('Kategorija uspešno dodata!');
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Da li ste sigurni da želite da obrišete kategoriju "${category}"?`)) {
      setCategories(categories.filter((cat) => cat !== category));
    }
  };

  return (
    <div className="kategorije-page">
      <Navigation />
      <div className="kategorije-container">
        <h2>Podcast Kategorije</h2>
        <ul className="categories-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              <span>{category}</span>
              <button
                className="btn delete-btn"
                onClick={() => handleDeleteCategory(category)}
              >
                Obriši
              </button>
            </li>
          ))}
        </ul>
        <form className="add-category-form" onSubmit={handleAddCategory}>
          <h3>Dodaj Novu Kategoriju</h3>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Unesite naziv kategorije"
            required
          />
          <button type="submit" className="btn add-btn">
            Dodaj Kategoriju
          </button>
        </form>
      </div>
    </div>
  );
};

export default Kategorije;
