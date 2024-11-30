import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Dodaj axios
import Navigation from './Navigation';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]); // Inicijalizuj prazan niz korisnika
  const [loading, setLoading] = useState(true); // Dodaj stanje za učitavanje
  const [error, setError] = useState(null); // Dodaj stanje za greške

  // Učitaj korisnike kada se komponenta montira
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), // Dodaj Authorization header
          },
        });
        setUsers(response.data.data); // Postavi korisnike u stanje
        setLoading(false); // Postavi loading na false
      } catch (err) {
        setError('Greška prilikom učitavanja korisnika'); // U slučaju greške
        setLoading(false);
      }
    };

    fetchUsers(); // Pozovi funkciju za učitavanje korisnika
  }, []); // Prazan niz znači da će se pozvati samo jednom nakon montiranja komponente

  // Metoda za brisanje korisnika
  const handleDelete = async (userId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), // Dodaj Authorization header
          },
        });
        setUsers(users.filter((user) => user.id !== userId)); // Ažuriraj stanje nakon brisanja
      } catch (err) {
        setError('Greška prilikom brisanja korisnika'); // U slučaju greške prilikom brisanja
      }
    }
  };

  if (loading) {
    return <div>Učitavanje...</div>; // Prikazuj "Učitavanje..." dok se korisnici učitavaju
  }

  return (
    <div className="korisnici-page">
      <Navigation />
      <div className="korisnici-container">
        <h2>Spisak Korisnika</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Prikazuj grešku ako postoji */}
        <table className="korisnici-table">
          <thead>
            <tr>
              <th>Korisničko ime</th>
              <th>Email</th>
              <th>Uloga</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} 
              className={user.role}
              >
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role==='viewer'?'GLEDALAC':'KREATOR'}</td>
                <td>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
