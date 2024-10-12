// src/App.js
import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard'; // Admin dashboard component
import { listVideoFiles } from './utils/s3ListObjects';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(''); // Keep track of user role (admin or user)
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoFiles = await listVideoFiles();
      setVideos(videoFiles);
    };
    fetchVideos();
  }, []);

  const handleLogin = (role) => {
    setLoggedIn(true);
    setUserRole(role); // Set the role of the user upon login
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole('');
  };

  return (
    <Router>
      <div className="App">
        {!loggedIn ? (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        ) : userRole === 'admin' ? (
          <Routes>
            <Route path="/" element={<AdminDashboard onLogout={handleLogout} />} /> {/* Admin dashboard */}
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<VideoList videos={videos} />} />
              <Route path="/video/:name" element={<VideoPlayer videos={videos} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {/* Add Logout Button */}
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </Router>
  );
};

const styles = {
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
};

export default App;
