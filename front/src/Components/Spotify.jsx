import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation'; // Importovanje Navigation komponente
import './Spotify.css';

const SpotifyPage = () => {
  // Placeholder podaci o podcastima
  const podcasts = [
    {
      id: 1,
      title: "Tech Talks",
      description: "The latest discussions about technology and innovation.",
      category: "Technology",
      image: "https://via.placeholder.com/500x300?text=Tech+Talks",
      url: "https://www.spotify.com"
    },
    {
      id: 2,
      title: "Music Vibes",
      description: "A podcast about the best new tracks and music genres.",
      category: "Music",
      image: "https://via.placeholder.com/500x300?text=Music+Vibes",
      url: "https://www.spotify.com"
    },
    {
      id: 3,
      title: "Life Stories",
      description: "Inspiring stories of everyday people and their journeys.",
      category: "Lifestyle",
      image: "https://via.placeholder.com/500x300?text=Life+Stories",
      url: "https://www.spotify.com"
    }
  ];

  return (
    <div className="spotify-page">
      {/* Uvozimo i koristimo Navigation komponentu */}
      <Navigation />

      <h1>Spotify Podcasti</h1>
      <div className="podcast-grid-spotify">
        {podcasts.map(podcast => (
          <div className="podcast-card-spotify" key={podcast.id}>
            <img src={podcast.image} alt={podcast.title} className="podcast-banner-spotify" />
            <div className="podcast-info-spotify">
              <h3 className="podcast-title-spotify">{podcast.title}</h3>
              <p className="podcast-category-spotify">{podcast.category}</p>
              <p className="podcast-description-spotify">{podcast.description}</p>
              <a href={podcast.url} className="btn listen-btn" target="_blank" rel="noopener noreferrer">
                Slušaj na Spotify
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifyPage;
