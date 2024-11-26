import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import './MyAccount.css';

const MyAccount = () => {
  const navigate = useNavigate();

  // Placeholder podaci o nalogu i podkastima
  const userInfo = {
    username: "Kreator123",
    email: "kreator123@example.com",
    profileImage: "https://via.placeholder.com/150?text=Profilna+Slika",
  };

  const podcasts = [
    {
      id: 1,
      title: "Tech Talks",
      category: "Technology",
      description: "Latest tech insights.",
      banner: "https://via.placeholder.com/500x300?text=Tech+Talks",
      episodes: 12,
    },
    {
      id: 2,
      title: "Music Vibes",
      category: "Music",
      description: "Explore new music.",
      banner: "https://via.placeholder.com/500x300?text=Music+Vibes",
      episodes: 8,
    },
  ];

  const handleAddPodcast = () => {
    navigate('/add-podcast');
  };

  const handlePodcastClick = (podcastId) => {
    navigate(`/podcast/${podcastId}`);
  };

  return (
    <div className="my-account">
      <Navigation />
      <div className="account-info">
        <img src={userInfo.profileImage} alt="Profile" className="profile-image" />
        <div className="user-details">
          <h2>{userInfo.username}</h2>
          <p>Email: {userInfo.email}</p>
          <button className="btn upload-btn">Promeni Profilnu Sliku</button>
        </div>
      </div>

      <div className="my-podcasts-section">
        <h2>Moji Podkasti</h2>
        <button className="btn add-podcast-btn" onClick={handleAddPodcast}>
          Dodaj Novi Podcast
        </button>
        <div className="my-podcast-grid">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="my-podcast-card"
              onClick={() => handlePodcastClick(podcast.id)}
            >
              <img src={podcast.banner} alt={podcast.title} className="my-podcast-banner" />
              <div className="my-podcast-info">
                <h3 className="my-podcast-title">{podcast.title}</h3>
                <p className="my-podcast-category">Kategorija: {podcast.category}</p>
                <p className="my-podcast-description">{podcast.description}</p>
                <p className="my-podcast-episodes">Broj epizoda: {podcast.episodes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
