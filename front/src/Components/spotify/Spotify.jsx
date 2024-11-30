import React, { useState } from 'react';
import './Spotify.css';
import SearchBar from './SearchBar';
import ArtistList from './ArtistList';
import ArtistDetails from './ArtistDetails';
import { searchArtists, getArtistTopTracks } from './SpotifyService';
import Navigation from '../Navigation';

const Spotify = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [songs, setSongs] = useState([]);  // Store all songs
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  // Search for artists based on query
  const handleSearch = async (query) => {
    const artists = await searchArtists(query);
    setArtists(artists);
    setSelectedArtist(null);
    setSongs([]);  // Clear songs when searching for a new artist
    setCurrentPage(1);  // Reset to first page on new search
  };

  // Select an artist and get their top tracks
  const handleSelectArtist = async (artist) => {
    const tracks = await getArtistTopTracks(artist.id);
    setSelectedArtist(artist);
    setSongs(tracks);  // Store all tracks, not just the first 10
    setCurrentPage(1);  // Reset to first page on new artist selection
  };

  return (
    <>
    <Navigation/>
    <div className="app">
   
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* If artist is selected, show artist details */}
      {selectedArtist ? (
        <div className="artist-details-container">
          {/* Artist Profile */}
          <div className="artist-profile">
            <img 
              src={selectedArtist.images[0]?.url} 
              alt={selectedArtist.name} 
              className="artist-photo" 
            />
            <h3 className="artist-name">{selectedArtist.name}</h3>
          </div>
          
          {/* Artist's Top Songs */}
          <ArtistDetails 
            artist={selectedArtist} 
            songs={songs} 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            songsPerPage={songsPerPage}
          />
        </div>
      ) : (
        <ArtistList artists={artists} onSelect={handleSelectArtist} />
      )}
    </div>
    </>
  );
};

export default Spotify;
