import React, { useState } from "react";
import "../index.css";
import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
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
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

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
    </main>
  );
}

export default Main;
