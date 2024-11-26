import React, { useState } from "react";
import "./Podcast.css";
import { useNavigate } from 'react-router-dom';
import Navigation from "./Navigation"; // Navigacija

const Podcast = () => {
  const allPodcasts = [
    { id: 1, title: "Tech Talks", category: "Tehnologija", description: "Razgovori o najnovijim trendovima u tehnologiji.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Tech+Talks" },
    { id: 2, title: "Foodie Adventures", category: "Hrana", description: "Sve o hrani, receptima i kulinarskim putovanjima.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Foodie+Adventures" },
    { id: 3, title: "Fitness Focus", category: "Fitnes", description: "Saveti za vežbanje i zdrav životni stil.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Fitness+Focus" },
    { id: 4, title: "Business Insights", category: "Biznis", description: "Diskusije o poslovnim strategijama i liderstvu.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Business+Insights" },
    { id: 5, title: "Travel Diaries", category: "Putovanja", description: "Avanture iz celog sveta.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Travel+Diaries" },
    { id: 6, title: "Book Club", category: "Književnost", description: "Razgovori o knjigama i piscima.", image: "https://via.placeholder.com/600x300/cccccc/ffffff?text=Book+Club" },
  ];

  const navigate = useNavigate();
  const [filteredPodcasts, setFilteredPodcasts] = useState(allPodcasts);
  const categories = ["Sve", "Tehnologija", "Hrana", "Fitnes", "Biznis", "Putovanja", "Književnost"];

  const filterPodcasts = (category) => {
    if (category === "Sve") {
      setFilteredPodcasts(allPodcasts);
    } else {
      setFilteredPodcasts(allPodcasts.filter((podcast) => podcast.category === category));
    }
  };
  const handlePodcastClick = (podcastId) => {
    navigate(`/podcast/${podcastId}`);
  };

  return (
    <div className="homepage">
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

export default Podcast;
