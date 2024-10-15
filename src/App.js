// src/App.js

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import AdminDashboard from './components/AdminDashboard';
import VideoList from './components/VideoList';
import UserGroupCheck from './components/UserGroupCheck';
import { listVideoFiles } from './utils/s3ListObjects'; // Import the function to list video files
import '@aws-amplify/ui-react/styles.css';

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoFiles = await listVideoFiles();
      setVideos(videoFiles); // Set the videos after fetching from S3
    };

    fetchVideos();
  }, []);

  return (
    <Authenticator>
      {({ signOut }) => (
        <div>
          <h1>Welcome to the App</h1>
          <button onClick={signOut}>Sign Out</button>

          {/* This component will check the user group and route accordingly */}
          <UserGroupCheck />

          {/* Define the routes */}
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Pass videos as a prop to VideoList */}
            <Route path="/client" element={<VideoList videos={videos} />} />
          </Routes>
        </div>
      )}
    </Authenticator>
  );
};

export default App;
