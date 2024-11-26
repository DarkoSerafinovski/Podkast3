import React, { useState } from "react";
import "./Podcast.css";
import { useNavigate } from 'react-router-dom';
import Navigation from "./Navigation"; // Navigacija

const FavoritesPage = () => {
  // Podaci o omiljenim podkastima
  const favoritePodcasts = [
    { id: 1, title: "Tech Talks", category: "Tehnologija", description: "Razgovori o najnovijim trendovima u tehnologiji.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Tech+Talks" },
    { id: 2, title: "Foodie Adventures", category: "Hrana", description: "Sve o hrani, receptima i kulinarskim putovanjima.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Foodie+Adventures" },
    { id: 3, title: "Fitness Focus", category: "Fitnes", description: "Saveti za vežbanje i zdrav životni stil.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Fitness+Focus" },
  ];

  const navigate = useNavigate();
  // Kategorije za filtriranje (može biti prošireno kasnije)
  const categories = ["Sve", "Tehnologija", "Hrana", "Fitnes", "Biznis", "Putovanja", "Književnost"];

  const [filteredPodcasts, setFilteredPodcasts] = useState(favoritePodcasts);

  // Funkcija za filtriranje podkasta po kategorijama
  const filterPodcasts = (category) => {
    if (category === "Sve") {
      setFilteredPodcasts(favoritePodcasts);
    } else {
      setFilteredPodcasts(favoritePodcasts.filter((podcast) => podcast.category === category));
    }
  };
  const handlePodcastClick = (podcastId) => {
    navigate(`/podcast/${podcastId}`);
  };

  return (
    <div className="favorites-page">
      <Navigation /> {/* Dodata navigacija */}
      <div className="content-wrapper">
        <aside className="filter-sidebar">
          <h2>Kategorije</h2>
          <ul className="filter-list">
            {categories.map((category, index) => (
              <li key={index} onClick={() => filterPodcasts(category)} className="filter-item">
                {category}
              </li>
            ))}
          </ul>
        </aside>
        <main className="podcast-grid">
          {filteredPodcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-card"  onClick={() => handlePodcastClick(podcast.id)}>
              <img src={podcast.image} alt={podcast.title} className="podcast-banner" />
              <h3 className="podcast-title">{podcast.title}</h3>
              <p className="podcast-category">{podcast.category}</p>
              <p className="podcast-description">{podcast.description}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default FavoritesPage;
