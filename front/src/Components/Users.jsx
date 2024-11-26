import React, { useState } from 'react';
import Navigation from './Navigation';
import './Users.css';

const Korisnici = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'marko123', email: 'marko@example.com', role: 'Gledalac' },
    { id: 2, username: 'ana456', email: 'ana@example.com', role: 'Kreator' },
    { id: 3, username: 'jovan789', email: 'jovan@example.com', role: 'Gledalac' },
  ]);

  const handleDelete = (userId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="korisnici-page">
      <Navigation />
      <div className="korisnici-container">
        <h2>Spisak Korisnika</h2>
        <table className="korisnici-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Korisničko ime</th>
              <th>Email</th>
              <th>Uloga</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn delete-btn" onClick={() => handleDelete(user.id)}>
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

export default Korisnici;
