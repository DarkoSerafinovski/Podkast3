import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Podcast from './Components/Podcast';
import FavoritesPage from './Components/Favorites';
import SpotifyPage from './Components/Spotify';
import MyAccount from './Components/MyAccount';
import AddPodcast from './Components/AddPodcast';
import PodcastDetails from './Components/PodcastDetails';
import EpisodeDetails from './Components/EpisodeDetails';
import AddEpisode from './Components/AddEpisode';
import Korisnici from './Components/Users';
import Kategorije from './Components/Categories';

function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/registracija" element={<Register />}/>
          <Route path="/podkasti" element={<Podcast />}/>
          <Route path="/omiljeni-podkasti" element={<FavoritesPage />}/>
          <Route path="/spotify" element={<SpotifyPage />}/>
          <Route path="/korisnici" element={<Korisnici />}/>
          <Route path="/kategorije" element={<Kategorije />}/>
          <Route path="/my-account" element={<MyAccount />}/>
          <Route path="/add-podcast" element={<AddPodcast />}/>
          <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
          <Route path="/podcast/:podcastId/add-episode" element={<AddEpisode />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetails />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
