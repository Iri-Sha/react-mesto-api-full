import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
    );
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card">
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <button className={cardDeleteButtonClassName} type="button" aria-label="Кнопка удаления места" onClick={handleDeleteClick}></button>
            <div className="card__item">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-wrap">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка нравится место" onClick={handleLikeClick}></button>
                    <span className="card__like-count">{card.likes.length}</span>  
                </div>
            </div>
        </li>
    )
}
  
export default Card