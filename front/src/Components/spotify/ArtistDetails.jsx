import React, { useState, useEffect } from 'react';

const ArtistDetails = ({ artist, songs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSongs, setCurrentSongs] = useState([]);
  const songsPerPage = 10;

  useEffect(() => {
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    setCurrentSongs(songs.slice(indexOfFirstSong, indexOfLastSong));
  }, [currentPage, songs]);

  const totalPages = Math.ceil(songs.length / songsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="artist-details">
      {/* Artist Info */}
      <h2>{artist.name}</h2>

      {/* Songs List */}
      <div className="songs-list">
        {currentSongs.map((song, index) => (
          <div key={index} className="song-card">
            <p>{song.name}</p>
            <iframe
              src={`https://open.spotify.com/embed/track/${song.id}`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="encrypted-media"
              title={song.name}
              style={{ borderRadius: '8px' }}
            ></iframe>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ArtistDetails;
