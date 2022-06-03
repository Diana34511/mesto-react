import React, { useState } from "react";
import "../index.css";
import { api } from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  closeAllPopups,
  onCardClick,
  selectedCard,
}) {
  const [cards, setCards] = useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api.getAllCards().then((cardsData) => {
      setCards(cardsData).catch((err) => {
        console.log(err);
      });
    });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar hover-animation" onClick={onEditAvatar}>
          <div
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            className="profile__avatar-image"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            className="profile__edit-button hover-animation"
            onClick={onEditProfile}
          ></button>
        </div>

        <button
          className="profile__add-card-button hover-animation"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        {!!cards.length &&
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
      </section>

      <PopupWithForm
        title="Редактировать профиль"
        name="profile-popup"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonName="Сохранить"
      >
        <li className="popup__element">
          <input
            name="nameInput"
            id="name-input"
            value=""
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
            value=""
            className="popup__textarea"
            placeholder="Введите описание"
            required
            minlength="2"
            maxlength="200"
          />
          <span className="job-input-error popup__textarea-error"></span>
        </li>
      </PopupWithForm>

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
    </main>
  );
}

export default Main;
