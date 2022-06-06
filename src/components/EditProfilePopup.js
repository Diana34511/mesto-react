import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [nameValue, setNameValue] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setNameValue(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameValue(e) {
    setNameValue(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: nameValue,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-popup"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Сохранить"
      onSubmit={handleSubmit}
    >
      <li className="popup__element">
        <input
          name="nameInput"
          id="name-input"
          value={nameValue}
          onChange={handleNameValue}
          type="text"
          className="popup__textarea"
          placeholder="Введите имя"
          required
          minlength="2"
          maxlength="40"
        />
        <span className="name-input-error popup__textarea-error"></span>
      </li>
      <li className="popup__element">
        <input
          name="jobInput"
          id="job-input"
          value={description}
          onChange={handleDescription}
          className="popup__textarea"
          placeholder="Введите описание"
          required
          minlength="2"
          maxlength="200"
        />
        <span className="job-input-error popup__textarea-error"></span>
      </li>
    </PopupWithForm>
  );
}
