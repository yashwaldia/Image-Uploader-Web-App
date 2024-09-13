import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadedImage = ({ imageUrl, onBack }) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    trackImageView();
  }, [imageUrl]);

  // Function to send a request to the backend to track image views
  const trackImageView = async () => {
    try {
      const response = await axios.post('http://localhost:5000/view-image', { imageUrl });
      setViewCount(response.data.views);
    } catch (error) {
      console.error('Error tracking image views:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(imageUrl);
  };

  return (
    <div className="uploaded__image">
      <div className="header">
        <div className="success">
          <img src="/images/svg/check.svg" alt="Upload done" />
          <h2>Uploaded Successfully!</h2>
        </div>
      </div>

      <div className="container__preview__image">
        <img src={imageUrl} alt="Your Image" id="addedImage" />
      </div>

      <div className="copy__link__image">
        <p id="imageLink">{imageUrl}</p>
        <button type="button" onClick={handleCopyLink} className="button__hover">Copy link</button>
      </div>

      <div className="back_upload">
        <button type="button" onClick={onBack} className="button button__hover">Back</button>
      </div>

      <div>
        <p>Views: {viewCount}</p>
      </div>
    </div>
  );
};

export default UploadedImage;
