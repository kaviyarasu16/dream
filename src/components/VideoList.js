// src/components/VideoList.js
import React from 'react';

const VideoList = ({ videos, onSelect }) => {
  return (
    <div>
      <h2>Select a Video</h2>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <button onClick={() => onSelect(video)}>{video.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
