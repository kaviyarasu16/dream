// src/components/VideoList.js
import React from 'react';
import PropTypes from 'prop-types';
import { getVideoUrl } from '../utils/s3GetUrl';
import './VideoList.css'; // Import the CSS file

const VideoList = ({ videos }) => {
  return (
    <div className="video-list-container">
      <h2 className="available-movies-title">Available Movies</h2>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <div className="video-grid">
          {videos.map((video, index) => (
            <div key={index} className="video-card">
              <video className="video-thumbnail" controls>
                <source src={getVideoUrl(video)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="video-title">{video}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.array.isRequired,
};

export default VideoList;
