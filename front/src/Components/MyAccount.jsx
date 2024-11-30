import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import './MyAccount.css';

const MyAccount = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const authHeader = {
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
    },
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id'); // Preuzimanje korisničkog ID-a iz sessionStorage

    // Fetch podaci o korisniku
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`, authHeader);
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPodcasts = async (page = currentPage) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/my-podcasts`, {
          ...authHeader,
          params: {
            page: page,
            per_page: 5, // Limita 5 podkasta po stranici
          },
        });
        setPodcasts(response.data.data);
        setTotalPages(response.data.meta.last_page);
      } catch (error) {
        console.error("Error fetching my podcasts:", error);
      }
    };

    fetchUserInfo();
    fetchPodcasts();
  }, [currentPage]); // Ponovno se pokreće kada se promeni trenutna stranica

  const handleAddPodcast = () => {
    navigate('/add-podcast');
  };

  const handlePodcastClick = (podcastId) => {
    navigate(`/podcast/${podcastId}`);
  };


  const handleProfilePictureChange = () => {
    navigate('/my-account/change-profile-picture', {
      state: { currentPicture: userInfo.profile_picture },
    });
  };

  return (
    <div className="my-account">
      <Navigation />
      
      {userInfo && (
        <div className="account-info">
          <img
            src={userInfo.profile_picture}
            alt="Profile"
            className="profile-image"
          />
          <div className="user-details">
            <h2>{userInfo.username}</h2>
            <p>Email: {userInfo.email}</p>
            <button className="btn upload-btn"  onClick={handleProfilePictureChange}>Promeni Profilnu Sliku</button>
          </div>
        </div>
      )}

      <div className="my-podcasts-section">
        <h2>Moji Podkasti</h2>
        <button className="btn add-podcast-btn" onClick={handleAddPodcast}>
          Dodaj Novi Podcast
        </button>
        <div className="my-podcast-grid">
          {podcasts.length > 0 ? (
            podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="my-podcast-card"
                onClick={() => handlePodcastClick(podcast.id)}
              >
                <img
                  src={podcast.banner || 'https://via.placeholder.com/500x300?text=Podcast+Banner'}
                  alt={podcast.title}
                  className="my-podcast-banner"
                />
                <div className="my-podcast-info">
                  <h3 className="my-podcast-title">{podcast.title}</h3>
                  <p className="my-podcast-category">Kategorija: {podcast.category?.name || "nepoznato"}</p>
                  <p className="my-podcast-description">{podcast.description}</p>
                  <p className="my-podcast-episodes">Broj epizoda: {podcast.episodes?.length || 0}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Nemate omiljene podkaste.</p>
          )}
        </div>

        {/* Paginacija */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &laquo; Prethodna
          </button>
          <span>
            Stranica {currentPage} od {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Sledeća &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
