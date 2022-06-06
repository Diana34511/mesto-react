import React, { useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser({
          name: data.name,
          avatar: data.avatar,
          about: data.about,
          _id: data._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo({ name, about })
      .then((data) => {
        setCurrentUser({
          name: data.name,
          avatar: data.avatar,
          about: data.about,
          _id: data._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    closeAllPopups();
  }

  return (
    <body className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          closeAllPopups={closeAllPopups}
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name="new-card-popup"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonName="Создать"
        >
          <li className="popup__element">
            <input
              name="placeName"
              id="place-name-input"
              value=""
              type="text"
              className="popup__textarea"
              placeholder="Название"
              minlength="2"
              maxlength="30"
              required
            />
            <span className="place-name-input-error popup__textarea-error"></span>
          </li>
          <li className="popup__element">
            <input
              name="placeLink"
              id="place-link-input"
              type="url"
              value=""
              className="popup__textarea"
              placeholder="Введите ссылку"
              required
            />
            <span className="place-link-input-error popup__textarea-error"></span>
          </li>
        </PopupWithForm>

        <PopupWithForm
          name="alert-popup"
          title="Вы уверены?"
          onClose={closeAllPopups}
          buttonName="Да"
        />

        <PopupWithForm
          name="avatar-popup"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonName="Сохранить"
        >
          <li className="popup__element popup__avatar-link">
            <input
              name="avatar"
              id="avatar-input"
              value=""
              type="url"
              className="popup__textarea"
              placeholder="Введите ссылку на аватар"
              required
            />
            <span className="avatar-input-error popup__textarea-error"></span>
          </li>
        </PopupWithForm>

        {selectedCard && (
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        )}
      </CurrentUserContext.Provider>
    </body>
  );
}

export default App;
