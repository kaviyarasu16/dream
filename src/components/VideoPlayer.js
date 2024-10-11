// src/components/VideoPlayer.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoPlayer = ({ videos }) => {
  const { name } = useParams();
  const video = videos.find((v) => v.name === name);
  const navigate = useNavigate();

  return (
    <div style={styles.playerContainer}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Back</button>
      {video ? (
        <div>
          <h2>{video.name}</h2>
          <video controls style={styles.videoPlayer}>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <p>Video not found</p>
      )}
    </div>
  );
};

const styles = {
  playerContainer: {
    padding: '20px',
    textAlign: 'center',
  },
  videoPlayer: {
    width: '50%', // Half the screen size
  },
  backButton: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default VideoPlayer;
