// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    { name: 'Video 1', src: '/videos/video1.mp4' },
    { name: 'Video 2', src: '/videos/video2.mp4' },
    { name: 'Video 3', src: '/videos/video3.mp4' },
    { name: 'Video 4', src: '/videos/video4.mp4' },
    { name: 'Video 5', src: '/videos/video5.mp4' },
  ];

  const handleLogin = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video.src);
  };

  const handleBack = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="App">
      <h1>Video Player App</h1>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {!selectedVideo ? (
            <VideoList videos={videos} onSelect={handleSelectVideo} />
          ) : (
            <VideoPlayer videoSrc={selectedVideo} onBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
