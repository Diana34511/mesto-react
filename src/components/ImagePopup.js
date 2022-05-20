import React from "react";
import "../index.css";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`
      ${card.link ? "popup_opened" : ""} popup popup_type_image-popup`}
    >
      <div className="image-popup__content">
        <button
          className="popup__close-button image-popup__close-button"
          onClick={onClose}
        ></button>
        <img className="image-popup__image" alt={card.name} src={card.link} />
        <h2 className="image-popup__title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
