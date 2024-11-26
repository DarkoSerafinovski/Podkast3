import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import './EpisodeDetails.css';

const EpisodeDetails = () => {
  const { episodeId } = useParams(); // ID epizode iz URL-a

  // Placeholder podaci o epizodi
  const episode = {
    id: episodeId,
    title: "Episode 1: AI Trends",
    description: "Exploring the latest trends in artificial intelligence.",
    type: "video", // ili "audio" za audio epizodu
    contentUrl: "https://media.vlipsy.com/vlips/Dyws4Sms/360p.mp4", // Link do video/audio fajla
  };

  return (
    <div className="episode-details">
      <Navigation />
      <div className="episode-info">
        <h1>{episode.title}</h1>
        <p>{episode.description}</p>

        <div className="media-container">
          {episode.type === "video" ? (
            <video controls className="media-player">
              <source src={episode.contentUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <audio controls className="media-player">
              <source src={episode.contentUrl} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
