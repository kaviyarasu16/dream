import React, { useState } from 'react';

const AdminDashboard = () => {
  const [videoName, setVideoName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState(JSON.parse(localStorage.getItem('videos')) || []);

  const handleUpload = () => {
    if (videoFile) {
      const newVideo = { name: videoName, file: videoFile };
      const updatedVideos = [...videos, newVideo];
      setVideos(updatedVideos);
      localStorage.setItem('videos', JSON.stringify(updatedVideos)); // Store videos in local storage
      setVideoName('');
      setVideoFile(null);
    }
  };

  const handleEdit = (index) => {
    const newName = prompt('Enter new video name:', videos[index].name);
    if (newName) {
      const updatedVideos = [...videos];
      updatedVideos[index].name = newName;
      setVideos(updatedVideos);
      localStorage.setItem('videos', JSON.stringify(updatedVideos)); // Update in local storage
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
        placeholder="Video Name"
      />
      <input
        type="file"
        onChange={(e) => setVideoFile(e.target.files[0])}
        accept="video/*"
      />
      <button onClick={handleUpload}>Upload Video</button>

      <h3>Uploaded Videos</h3>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            {video.name} 
            <button onClick={() => handleEdit(index)}>Edit Name</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;