import React, { useEffect, useState } from 'react';

const VideoList = ({ videos, onSelect }) => {
  const [thumbnails, setThumbnails] = useState(Array(videos.length).fill(null));
  
  const captureThumbnail = (videoUrl, index) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.currentTime = 1; // Capture a frame at 1 second

    video.onloadeddata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth / 2; // Reduce resolution
      canvas.height = video.videoHeight / 2; // Reduce resolution
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnailUrl = canvas.toDataURL('image/jpeg');
      setThumbnails((prev) => {
        const newThumbnails = [...prev];
        newThumbnails[index] = thumbnailUrl;
        return newThumbnails;
      });
    };
  };

  useEffect(() => {
    videos.forEach((video, index) => {
      captureThumbnail(video.url, index);
    });
  }, [videos]);

  return (
    <div style={styles.videoListContainer}>
      <h2 style={styles.heading}>Available Videos</h2>
      <div style={styles.videoRow}>
        {videos.map((video, index) => (
          <div key={index} style={styles.videoCard} onClick={() => onSelect(video)}>
            <div style={styles.thumbnail}>
              <img
                src={thumbnails[index] || `https://via.placeholder.com/150x100?text=${video.name}`}
                alt={video.name}
                style={styles.thumbnailImage}
              />
            </div>
            <p style={styles.videoTitle}>{video.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  videoListContainer: {
    padding: '20px',
    backgroundColor: '#141414',
  },
  heading: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  videoRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  videoCard: {
    width: '200px',
    margin: '10px',
    textAlign: 'center',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '10px',
    transition: 'transform 0.3s ease-in-out',
  },
  link: {
    textDecoration: 'none',
  },
  thumbnail: {
    width: '100%',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  videoTitle: {
    marginTop: '10px',
    color: '#fff',
    fontSize: '1rem',
  }
};

export default VideoList;
