import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate  } from 'react-router-dom';
import Navigation from './Navigation';
import './AddPodcast.css';

const AddPodcast = () => {
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',  // Promenili smo name u category_id
    description: '',
    banner: null,  // Koristi se za sliku (file input)
    creators: [],  // Ovo je polje za kreatore, može se kasnije dodati kao opcija
  });
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Učitavanje kategorija
    axios
      .get('http://localhost:8000/api/categories', {
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('auth_token'),
        },
      })
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Greška pri učitavanju kategorija:', error);
      });

    // Učitavanje korisnika
    axios
      .get('http://localhost:8000/api/users/creators', {
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('auth_token'),
        },
      })
      .then((response) => {
        const creators = response.data.data;
       setUsers(creators);
        const loggedInUserId = sessionStorage.getItem('user_id');
      if (loggedInUserId) {
        const loggedInUser = creators.find((user) => user.id.toString() === loggedInUserId);
        if (loggedInUser) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            creators: [{ id: loggedInUser.id, username: loggedInUser.username }],
          }));
        }
      }
      })
      .catch((error) => {
        console.error('Greška pri učitavanju korisnika:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, banner: e.target.files[0] });
  };

  const handleAddCreator = (user) => {
    if (!formData.creators.some((k) => k.id === user.id)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        creators: [...prevFormData.creators, user],
      }));
    }
  };

  const handleRemoveCreator = (id) => {
    const loggedInUserId = sessionStorage.getItem('user_id');  // Učitaj ID ulogovanog korisnika
  if (id == loggedInUserId) {
    // Ako je ID korisnika koji se pokušava ukloniti isti kao ID ulogovanog korisnika, ne dozvoljavaj brisanje
    alert('Ne možete ukloniti sebe kao kreatora.');
    return;  // Prekida dalje izvršavanje funkcije
  }
    setFormData((prevFormData) => ({
      ...prevFormData,
      creators: prevFormData.creators.filter((k) => k.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('category_id', formData.category_id);
    dataToSend.append('banner', formData.banner);

    formData.creators.forEach((creator, index) => {
      dataToSend.append(`creators[${index}][id]`, creator.id);
    });

    axios
      .post('http://localhost:8000/api/podcasts', dataToSend, {
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('auth_token'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert('Podcast uspešno dodat!');
        navigate('/podkasti');
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Greška pri čuvanju podkasta:', error);
      });
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
            onChange={handleInputChange}
            required
          />

          <label>Kategorija</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Izaberite kategoriju</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label>Opis</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>

          <label>Banner Slika</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          {/* Lista korisnika (Kreatora) */}
          <label>Dodaj Kreatore</label>
          <div className='users-list'>
            {users.map((user) => (
              <button
                type="button"
                key={user.id}
                onClick={() => handleAddCreator(user)}
                 className="korisnik-dugme"
              >
                {user.username}
              </button>
            ))}
          </div>

          {/* Prikaz odabranih kreatora */}
          <div className="picked-users">
            <h4>Odabrani Kreatori:</h4>
            <ul>
              {formData.creators.map((creator) => (
                <li key={creator.id}>
                  {creator.username}
                  <button type="button" onClick={() => handleRemoveCreator(creator.id)}>
                    Ukloni
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button type="submit" className="btn submit-btn">
            Dodaj Podcast
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPodcast;
