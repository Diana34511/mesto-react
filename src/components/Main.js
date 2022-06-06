import React, { useState } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

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
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
      </section>
    </main>
  );
}

export default Main;
