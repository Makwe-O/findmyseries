import React from 'react';
import './Card.scss';

const Card = ({ image, name, summary, season }) => {
  return (
    <div className="card__container">
      <div>
        <img className="card__image" src={image} alt="card-image" />
      </div>
      <div className="card__content">
        <div className="card__content__title">Episode Name: {name}</div>
        <div className="card__content__body">
          <h3>Season: {season}</h3>
          Summary: {summary}
        </div>
      </div>
    </div>
  );
};

export default Card;
