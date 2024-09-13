import React, { useState } from 'react';
import axios from 'axios';
import UploadedImage from './UploadedImage';
import ModalUploading from './ModalUploading';

const ImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && validateMimesTypeImage(file)) {
      uploadImageToCloudinary(file);
    } else {
      setUploadError(true);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress); // Update progress in state
        },
      });
      setUploadedImage(response.data.url);
      setUploadError(false); // Clear error on successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragAndDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateMimesTypeImage(file)) {
      uploadImageToCloudinary(file);
    } else {
      setUploadError(true);
    }
  };

  const validateMimesTypeImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return allowedTypes.includes(file.type);
  };

  return (
    <div className="container">
      {!uploadedImage && !isUploading && (
        <div className="container__image__uploader">
          <div className="header__image__uploader">
            <h1>Upload your image</h1>
            <p>
              File should be <strong>.jpeg</strong>, <strong>.jpg</strong>, or <strong>.png</strong>
            </p>
          </div>

          <form id="form">
            <div
              className="drop__image"
              id="dragAndDrop"
              onDrop={handleDragAndDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <img id="file" src="/images/svg/photo.svg" alt="Upload" />
              <label>Drag & Drop your image here</label>
            </div>

            <div className="uploader__by__button">
              <span>Or</span>
              <div className="input hiddenLabel">
                <label htmlFor="selectFile">Choose a file</label>
                <input type="file" id="selectFile" onChange={handleFileUpload} className="button__hover" />
              </div>
            </div>
          </form>
        </div>
      )}

      {uploadedImage && !isUploading && (
        <UploadedImage imageUrl={uploadedImage} onBack={() => setUploadedImage(null)} />
      )}

      {isUploading && <ModalUploading progress={uploadProgress} />}
    </div>
  );
};

export default ImageUploader;
