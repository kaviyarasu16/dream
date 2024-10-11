// src/components/VideoUploader.js
import React, { useState } from 'react';
import { uploadVideo } from '../utils/s3Upload'; // Update to match the function name

const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage(''); // Clear any previous messages
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    try {
      // Call the S3 upload function
      await uploadVideo(selectedFile);
      setMessage(`File ${selectedFile.name} uploaded successfully!`);
      setSelectedFile(null); // Clear the file input after successful upload
    } catch (error) {
      setMessage('Failed to upload the file. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h3>Upload Video</h3>
      
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={styles.fileInput}
      />

      {/* Display the upload button only if a file is selected */}
      {selectedFile && (
        <button onClick={handleUpload} style={styles.uploadButton}>
          Upload Video
        </button>
      )}

      {/* Display message (success or error) */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    textAlign: 'center',
  },
  fileInput: {
    marginBottom: '10px',
    padding: '10px',
  },
  uploadButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#333',
  },
};

export default VideoUploader;
