import React, { useRef, useEffect } from 'react';
import { getVideoUrl } from '../utils/s3GetUrl'; // Ensure you have this utility function

const VideoPlayer = ({ videoName, onClose }) => {
  const videoRef = useRef(null);
  const videoUrl = getVideoUrl(videoName);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>{videoName}</h1>
      <video
        ref={videoRef}
        controls
        style={styles.video}
        onClick={handleFullScreen} // Click video to enter full screen
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={onClose} style={styles.closeButton}>
        Close
      </button>
      <button onClick={handleFullScreen} style={styles.fullscreenButton}>
        Full Screen
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  video: {
    width: '100%',
    height: 'auto',
    maxHeight: '90vh', // Set maximum height for better UX
    borderRadius: '10px', // Optional: rounded corners
  },
  fullscreenButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#ff5e57',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default VideoPlayer;
