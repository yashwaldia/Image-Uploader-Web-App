import React from 'react';
import '../styles/components/ModalUploading.css';

const ModalUploading = ({ progress }) => {
  return (
    <div className="container__modal__uploading">
      <div className="modal__image__uploading">
        <h3>Uploading...</h3>
        <input type="range" value={progress} min="0" max="100" readOnly />
        <p>{progress}%</p>
      </div>
    </div>
  );
};

export default ModalUploading;
