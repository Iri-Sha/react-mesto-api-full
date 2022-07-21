import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import {apiAuth} from '../utils/ApiAuth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState({name: '', link: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [register, setRegister] = React.useState("");

  React.useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([profile, initialCards]) => {
          setCurrentUser(profile);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleUpdateAvatar(userInfo) {
    setIsLoading(true);
    api.editAvatar(userInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
    });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api.editUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
    });
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
    });
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  function handleDeletePopupClick(card){
    setDeletedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if(isLiked) {
        api.deleteLike(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(err);
        });
    } else {
        api.addLike(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(err);
        });
    }
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
    });
  }

  function handleRegisterSubmit(password, email) {
    return apiAuth.registration(password, email)
      .then((res) => {
        setRegister(true);
        history('/sign-in');
      })
      .catch((err) => {
        setRegister(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
    });
  }

  function handleLoginSubmit(password, email) {
    apiAuth.authorization(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          tokenCheck();
          history("/");
        }
      })
      .catch(() => {
        setRegister(false);
        setIsInfoTooltipOpen(true);
    });
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')){
      const token = localStorage.getItem('jwt');
      if (token) {
        apiAuth.getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              history("/");
              setEmail(res.email);
          }})
          .catch((err) => {
            console.log(err);
        });
      }
    }
  }

  function signOut() {
    apiAuth.logout()
      .then((res) => {
        history("/sign-in");
        setEmail("");
        setLoggedIn(false);
        localStorage.removeItem('jwt');
      })
      .catch(err => console.log(err))
  }

  function handleOverlayClose(e){
    if(e.target.classList.contains('popup')){
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-up" element={
            <>
            <Header>
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            </Header>
            <Register handleRegisterSubmit={handleRegisterSubmit} />
            </>
          }
          />

          <Route path="/sign-in" element={
            <>
            <Header>
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            </Header>
            <Login handleLoginSubmit={handleLoginSubmit} />
            </>
          }
          />
        
          <Route exact path="/" element={
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
            >
              <>
              <Header>
                <p className="header__email">{email}</p>
                <Link
                  className="header__link header__link_color_grey"
                  to="/sign-in"
                  onClick={signOut}
                >
                  Выйти
                </Link>
              </Header>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeletePopupClick}
              />
              <Footer />
              </>
            </ProtectedRoute>}
          />
        </Routes>
              
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
        />

        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
          handleOverlayClose={handleOverlayClose}
        />

        <PopupWithForm 
          onClose={closeAllPopups}
          name="confirmDelete"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isConfirmationPopupOpen}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
          formValid={true}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          handleOverlayClose={handleOverlayClose}
          register={register}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;