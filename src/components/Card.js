import React, { useState } from "react";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete, key }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "cards__trash-button hover-animation" : "cards__trash-button-hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked
      ? "cards__like hover-animation cards__like_active"
      : "cards__like hover-animation"
  }`;

  return (
    <article className="cards__item" key={card._id}>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})` }}
        className="cards__image"
        alt=""
      />
      <div className="cards__info">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__likes-info">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="cards__likes">{card.likes?.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
