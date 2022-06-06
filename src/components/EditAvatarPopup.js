import React, { useRef } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  const avatarInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarInput.current.value);
    avatarInput.current.value = "";
  }

  return (
    <PopupWithForm
      name="avatar-popup"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Сохранить"
      onSubmit={handleSubmit}
    >
      <li className="popup__element popup__avatar-link">
        <input
          ref={avatarInput}
          name="avatar"
          id="avatar-input"
          type="url"
          className="popup__textarea"
          placeholder="Введите ссылку на аватар"
          required
        />
        <span className="avatar-input-error popup__textarea-error"></span>
      </li>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
