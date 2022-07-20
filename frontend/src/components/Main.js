import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
      <main className="content">
        <section className="profile">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля"/>
          <div className="profile__edit-avatar" onClick={onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__location">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" aria-label="Кнопка редактирования профиля" onClick={onEditProfile}></button>
            </div>
            <p className="profile__about-me">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Кнопка добавления фото" onClick={onAddPlace}></button>
        </section>

        <section className="elements" aria-label="Фотографии">
          <ul className="elements__cards">
            {cards.map((card) => (
                <Card 
                    card={card}
                    key={card._id}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                />
            ))}
          </ul>
        </section>
      </main>
    )
}
  
export default Main