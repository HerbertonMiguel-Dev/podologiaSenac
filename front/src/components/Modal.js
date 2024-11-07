import React from 'react';

const Modal = ({ title, content, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
