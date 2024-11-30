import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import './EpisodeDetails.css';

const EpisodeDetails = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null); // Držimo podatke o epizodi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [url, setUrl] = useState(null);
   // ID epizode iz URL-a

  // Placeholder podaci o epizodi
  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        // Poziv API-ja za dobijanje podataka o epizodi
        var response = await axios.get(`http://localhost:8000/api/episodes/${episodeId}`, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
          },
        });

        const episode = response.data.data;
        response = await axios.get(episode.file, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
          },
          responseType: "blob", 
        });

        const file = URL.createObjectURL(response.data);
        setUrl(file);
        setEpisode(episode);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [episodeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!episode) {
    return <div>Error loading episode details.</div>;
  }

  return (
    <div className="episode-details">
      <Navigation />
      <div className="episode-info">
        <h1>{episode.title}</h1>
        <p>{episode.description}</p>

        <div className="media-container">
          {episode.type === "video/mp4" ? (
            <video controls className="media-player">
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <audio controls className="media-player">
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
