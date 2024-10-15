import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getVideoUrl } from '../utils/s3GetUrl';
import { listVideoFiles } from '../utils/s3ListObjects'; // Import the function to fetch video files
import './VideoList.css'; // Import the CSS file
import VideoPlayer from './VideoPlayer'; // Import the VideoPlayer component

const VideoList = ({ onLogout }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchVideos = async () => {
      const videoFiles = await listVideoFiles();
      setVideos(videoFiles); // Set the videos dynamically
    };

    fetchVideos(); // Fetch videos on component mount
  }, []);

  const handleVideoClick = (videoName) => {
    setSelectedVideo(videoName);
    setIsModalOpen(true); // Open modal on video click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedVideo(null); // Reset selected video
  };

  return (
    <div className="video-list-container" style={styles.container}>
      <h2 className="available-movies-title">Available Movies</h2>

      {/* Logout button */}
      <button onClick={onLogout} style={styles.logoutButton}>Logout</button>

      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <div className="video-grid">
          {videos.map((video, index) => (
            <div key={index} className="video-card" onClick={() => handleVideoClick(video)}>
              <video className="video-thumbnail" controls>
                <source src={getVideoUrl(video)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="video-title">{video}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Video Player */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <VideoPlayer videoName={selectedVideo} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

VideoList.propTypes = {
  onLogout: PropTypes.func.isRequired, // Define the prop for logout
};

const styles = {
  container: {
    padding: '20px',
  },
  logoutButton: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff5e57',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: '80%',
    maxWidth: '800px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    position: 'relative',
  },
};

export default VideoList;
