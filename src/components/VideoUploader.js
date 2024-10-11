// src/components/VideoUploader.js
import React from 'react';
import { uploadVideo } from '../utils/s3Upload';

const VideoUploader = () => {
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await uploadVideo(file);
        alert('Video uploaded successfully!');
      } catch (error) {
        console.error('Error uploading video:', error);
        alert('Failed to upload video.');
      }
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleUpload} />
    </div>
  );
};

export default VideoUploader;
