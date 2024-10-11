// src/components/VideoPlayer.js
import React, { useRef, useState } from 'react';

const VideoPlayer = ({ videoSrc, onBack }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <video ref={videoRef} width="100%" height="100%" controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
