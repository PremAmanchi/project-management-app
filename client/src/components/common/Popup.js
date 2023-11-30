import React, { useState } from 'react';
import './Popup.css'; // Create a CSS file for styling

const Popup = ({ message, onYesClick, onNoClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleYesClick = () => {
    setIsOpen(false);
    onYesClick();
  };

  const handleNoClick = () => {
    setIsOpen(false);
    onNoClick();
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <p>{message}</p>
            <div className="popup-buttons">
              <button className='yes-button' onClick={handleYesClick}>Yes</button>
              <label>     </label>
              <button className='no-button' onClick={handleNoClick}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
