// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import Register from './components/Register';
import VideoUploader from './components/VideoUploader';
import { listVideoFiles } from './utils/s3ListObjects'; // Import the listVideoFiles function

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch video files from S3 when the component mounts
    const fetchVideos = async () => {
      const videoFiles = await listVideoFiles();
      setVideos(videoFiles);
    };

    fetchVideos();
  }, []); // Empty dependency array to run this effect once on component mount

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
          <>
            <Routes>
              <Route path="/" element={<VideoList videos={videos} />} />
              <Route path="/video/:name" element={<VideoPlayer videos={videos} />} />
            </Routes>
            <VideoUploader />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
