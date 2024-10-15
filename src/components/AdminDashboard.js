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
      <h1 style={styles.title}>Admin Dashboard</h1>
      <h2 style={styles.subtitle}>Welcome to your App, Admin!</h2>
      
      {/* Use the onLogout function to log out */}
      <button onClick={onLogout} style={styles.logoutButton}>Logout</button>

      {/* Video Uploader */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Upload New Videos</h2>
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
        <h2 style={styles.sectionTitle}>Available Movies</h2>
        {videos.length === 0 ? (
          <p style={styles.noMovies}>No Movies available</p>
        ) : (
          <ul style={styles.videoList}>
            {videos.map((video, index) => (
              <li key={index} style={styles.videoItem}>
                <span style={styles.videoName}>{video}</span>
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
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '20px',
  },
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff5e57',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  logoutButtonHover: {
    backgroundColor: '#e74c3c',
  },
  section: {
    marginTop: '40px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
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
    transition: 'background-color 0.3s',
  },
  videoItemHover: {
    backgroundColor: '#f9f9f9',
  },
  videoName: {
    flex: 1,
    marginRight: '10px',
    color: '#333',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#ff5e57',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  noMovies: {
    fontSize: '1rem',
    color: '#999',
  },
};

export default AdminDashboard;
