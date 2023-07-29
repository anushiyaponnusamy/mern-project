// ImageGrid.js
import React from 'react';
import './feedPhoto.css';

const ImageGrid = () => {
  const images = [
    { src: '/path/to/image1.jpg', aspectRatio: 1.5 },
    { src: '/path/to/image2.jpg', aspectRatio: 1 },
    { src: '/path/to/image3.jpg', aspectRatio: 0.8 },
    // Add more images with different aspect ratios here...
  ];

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-item" style={{ paddingBottom: `${100 / image.aspectRatio}%` }}>
          <img src={image.src} alt={`Image ${index + 1}`} />
          <div className="heart-outline"></div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
