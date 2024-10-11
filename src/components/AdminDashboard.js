// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import VideoUploader from './VideoUploader'; // Import the VideoUploader component
import { listVideoFiles } from '../utils/s3ListObjects'; // Function to list videos from S3
import { deleteVideo } from '../utils/s3DeleteFile'; // Function to delete videos from S3

const AdminDashboard = ({ onLogout }) => {
  const [videos, setVideos] = useState([]);

  // Fetch videos from S3 when the component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      const videoFiles = await listVideoFiles();
      setVideos(videoFiles);
    };

    fetchVideos();
  }, []);

  const handleDelete = async (videoName) => {
    try {
      await deleteVideo(videoName);
      // Refresh video list after deletion
      const updatedVideos = await listVideoFiles();
      setVideos(updatedVideos);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout} style={styles.logoutButton}>Logout</button>

      {/* Video Uploader */}
      <div style={styles.section}>
        <h2>Upload New Video</h2>
        <VideoUploader onVideoUpload={() => {
          // Refresh video list after upload
          const fetchVideos = async () => {
            const videoFiles = await listVideoFiles();
            setVideos(videoFiles);
          };
          fetchVideos();
        }} />
      </div>

      {/* Video List */}
      <div style={styles.section}>
        <h2>Available Videos</h2>
        {videos.length === 0 ? (
          <p>No videos available</p>
        ) : (
          <ul style={styles.videoList}>
            {videos.map((video, index) => (
              <li key={index} style={styles.videoItem}>
                {video}
                <button onClick={() => handleDelete(video)} style={styles.deleteButton}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
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
  section: {
    marginTop: '40px',
  },
  videoList: {
    listStyleType: 'none',
    padding: 0,
  },
  videoItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#ff5e57',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
