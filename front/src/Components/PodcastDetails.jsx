import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import "./PodcastDetails.css";

const PodcastDetails = () => {
  const navigate = useNavigate();
  const { podcastId } = useParams(); // ID podkasta iz URL-a
  const [podcast, setPodcast] = useState(null); // Držimo podatke o podkastu
  const [loading, setLoading] = useState(true); // Stanje za učitavanje
  const [error, setError] = useState(null); // Greška pri učitavanju
  const[role,setRole]=useState(sessionStorage.getItem('role')||'viewer');
  const[userId,setUserId] = useState(sessionStorage.getItem('user_id'));

  // Učitavamo podatke o podkastu sa servera
  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/podcasts/${podcastId}`,
          {
            headers: {
              Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
            },
          }
        );
        setPodcast(response.data.data); 
        // Postavljamo podatke u stanje
      } catch (err) {
        setError("Došlo je do greške prilikom učitavanja podataka.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetails();
  }, [podcastId]); // Ponovo pozivamo kada se podcastId menja

  const handleEpisodeClick = (episodeId) => {
    navigate(`/podcast/${podcastId}/episode/${episodeId}`);
  };

  const handleAddEpisodeClick = () => {
    navigate(`/podcast/${podcastId}/add-episode`);
  };

  const handleDeletePodcast = async () => {
    try {
      if (window.confirm("Da li ste sigurni da želite da obrišete ovaj podkast?")) {
        const response = await axios.delete(`http://localhost:8000/api/podcasts/${podcastId}`, {
          headers: {
            'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token'),
        },});
        alert(`Podkast "${podcast.title}" je obrisan.`);
        navigate("/podkasti"); 
      }
      }
       catch (err) {
      alert(err.message);
    }
  };

  const handleFavoriteClick = async (id, isFavorite, event) => {
    try {
      event.stopPropagation(); // Prevent triggering on the entire podcast card
      const config = {
        method: isFavorite ? 'delete' : 'post', // Use 'delete' if already favorite, 'post' otherwise
        url: `http://localhost:8000/api/users/favorites/${id}`,
        headers: {
          'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token'),
        },
      };
      await axios.request(config); // Send the request
      setPodcast((prevPodcast) => ({
        ...prevPodcast,
        favorite: !prevPodcast.favorite, // Toggle favorite status
      }));
    } catch (error) {
      console.error("There was an error updating the favorite status!", error);
    }
  };
  // Ako se podaci još uvek učitavaju ili dođe do greške, prikazujemo odgovarajući sadržaj
  if (loading) {
    return <div>Učitavam podatke...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
          Kategorija: {podcast.category?.name || 'nepoznato'}
        </p>
        <p className="podcast-details-description">{podcast.description}</p>
        <div className="podcast-actions">
        {(role === "viewer") &&
          <button
            className={`btn favorite-btn ${podcast.favorite ? "favorite-added" : ""}`}
            onClick={(event) => handleFavoriteClick(podcast.id, podcast.favorite, event)}
          >
            {podcast.favorite ? "Ukloni iz omiljenih" : "Dodaj u omiljene"}
          </button>}
          {(role === "creator" && podcast.creators.some(creator =>creator.id === parseInt(userId))) && 
          <button
            className="btn add-episode-btn"
            onClick={handleAddEpisodeClick}
          >
            Dodaj Epizodu
          </button>}
          {((role==="admin")||(role === "creator" && podcast.creators.some(creator => creator.id === parseInt(userId)))) &&
          <button
            className="btn delete-podcast-btn"
            onClick={handleDeletePodcast}
          >
            Obriši Podkast
          </button>}
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
