import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import "./PodcastDetails.css";

const PodcastDetails = () => {
  const navigate = useNavigate();
  const { podcastId } = useParams(); // ID podkasta iz URL-a
  const [isFavorite, setIsFavorite] = useState(false); // Stanje za omiljene

  // Placeholder podaci o podkastu
  const podcast = {
    id: podcastId,
    title: "Tech Talks",
    category: "Technology",
    description: "Latest tech insights from industry leaders.",
    banner: "https://via.placeholder.com/500x300?text=Tech+Talks",
    episodes: [
      {
        id: 1,
        title: "Episode 1: AI Trends",
        description: "Exploring the latest trends in artificial intelligence.",
      },
      {
        id: 2,
        title: "Episode 2: Cloud Computing",
        description: "The future of cloud-based solutions.",
      },
    ],
  };

  const handleEpisodeClick = (episodeId) => {
    navigate(`/podcast/${podcastId}/episode/${episodeId}`);
  };

  const handleAddEpisodeClick = () => {
    navigate(`/podcast/${podcastId}/add-episode`);
  };

  const handleDeletePodcast = () => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovaj podkast?")) {
      console.log(`Podkast sa ID-jem ${podcastId} je obrisan.`);
      // Ovdje možete dodati logiku za brisanje na serveru
      navigate("/podcasts"); // Preusmeravanje na stranicu sa listom podkasta nakon brisanja
    }
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    console.log(
      isFavorite
        ? `Podkast sa ID-jem ${podcastId} je uklonjen iz omiljenih.`
        : `Podkast sa ID-jem ${podcastId} je dodat u omiljene.`
    );
  };

  return (
    <div className="podcast-details">
      <Navigation />
      <div className="podcast-details-info">
        <img
          src={podcast.banner}
          alt={podcast.title}
          className="podcast-details-banner"
        />
        <h1 className="podcast-details-title">{podcast.title}</h1>
        <p className="podcast-details-category">
          Kategorija: {podcast.category}
        </p>
        <p className="podcast-details-description">{podcast.description}</p>
        <div className="podcast-actions">
          <button
            className={`btn favorite-btn ${
              isFavorite ? "favorite-added" : ""
            }`}
            onClick={handleAddToFavorites}
          >
            {isFavorite ? "Ukloni iz omiljenih" : "Dodaj u omiljene"}
          </button>
          <button
            className="btn add-episode-btn"
            onClick={handleAddEpisodeClick}
          >
            Dodaj Epizodu
          </button>
          <button
            className="btn delete-podcast-btn"
            onClick={handleDeletePodcast}
          >
            Obriši Podkast
          </button>
        </div>
      </div>
      <div className="episodes-list">
        <h2>Epizode</h2>
        {podcast.episodes.map((episode) => (
          <div
            key={episode.id}
            className="episode-card"
            onClick={() => handleEpisodeClick(episode.id)}
          >
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <button className="btn">Idi na epizodu</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastDetails;
