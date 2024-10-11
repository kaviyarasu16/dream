
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import Register from './components/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [videos] = useState([
    { name: 'Video 1', url: '/videos/video1.mp4' },
    { name: 'Video 2', url: '/videos/video2.mp4' },
    { name: 'Video 3', url: '/videos/video3.mp4' },
    { name: 'Video 4', url: '/videos/video4.mp4' },
    { name: 'Video 5', url: '/videos/video5.mp4' },
  ]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {!loggedIn ? (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<VideoList videos={videos} />}
            />
            <Route
              path="/video/:name"
              element={<VideoPlayer videos={videos} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;