import React, { useState } from "react";
import "../index.css";

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="cards__item" key={card._id}>
      <button className="cards__trash-button hover-animation"></button>
      <img
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})` }}
        className="cards__image"
        alt=""
      />
      <div className="cards__info">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__likes-info">
          <button className="cards__like hover-animation"></button>
          <p className="cards__likes">{card.likes?.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
