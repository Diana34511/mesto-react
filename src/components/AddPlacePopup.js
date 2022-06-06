import React, { useState, useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, onClose, isOpen }) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name: placeName, link: placeLink });
    setPlaceName("");
    setPlaceLink("");
  }

  function handlePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="new-card-popup"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Создать"
      onSubmit={handleSubmit}
    >
      <li className="popup__element">
        <input
          name="placeName"
          id="place-name-input"
          value={placeName}
          onChange={handlePlaceName}
          type="text"
          className="popup__textarea"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="place-name-input-error popup__textarea-error"></span>
      </li>
      <li className="popup__element">
        <input
          name="placeLink"
          id="place-link-input"
          type="url"
          value={placeLink}
          onChange={handlePlaceLink}
          className="popup__textarea"
          placeholder="Введите ссылку"
          required
        />
        <span className="place-link-input-error popup__textarea-error"></span>
      </li>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
