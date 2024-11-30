import axios from 'axios';


let accessToken = '';

const getAccessToken = async () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  console.log(clientId);
  console.log(clientSecret);
  if (accessToken) return accessToken;
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  accessToken = response.data.access_token;
  return accessToken;
};

export const searchArtists = async (query) => {
  const token = await getAccessToken();
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: { Authorization: `Bearer ${token}` },
    params: { q: query, type: 'artist' }
  });
  sessionStorage.setItem("token",token);
  return response.data.artists.items;
};

export const getArtistTopTracks = async (artistId) => {
  const token = await getAccessToken();
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { market: 'US' }
  });
  return response.data.tracks;
};
