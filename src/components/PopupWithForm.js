import React from "react";
import "../index.css";

function PopupWithForm({
  children,
  name,
  isOpen,
  title,
  onClose,
  buttonName,
  onSubmit,
}) {
  return (
    <div
      className={`
      ${isOpen ? "popup_opened" : ""} popup popup_type_${name}`}
    >
      <div className="popup__content">
        <button className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <ul className="popup__elements">
            {children}
            <li className="popup__element">
              <button className="popup__button hover-animation" type="submit">
                {buttonName}
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
