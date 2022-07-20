import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading, handleOverlayClose}) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    const [nameValid, setNameValid] = React.useState(true);
    const [errorNameMessage, setErrorNameMessage] = React.useState('');
    const [descriptionValid, setDescriptionValid] = React.useState(true);
    const [errorDescriptionMessage, setErrorDescriptionMessage] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setNameValid(true);
        setErrorNameMessage('');
        setDescriptionValid(true);
        setErrorDescriptionMessage('');
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateUser({
          name: name,
          about: description,
        })
    }

    function handleNameChange(e) {
        setName(e.target.value);
        setNameValid(e.target.validity.valid);
        setErrorNameMessage(e.target.validationMessage);
    }
    
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        setDescriptionValid(e.target.validity.valid);
        setErrorDescriptionMessage(e.target.validationMessage);
    }

    const formValid = nameValid && descriptionValid;

    return (
        <PopupWithForm 
          isOpen={isOpen}
          onClose={onClose}
          name="editProfile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
          formValid={formValid}
        >
          <input 
            id="inputProfileName"
            value={name || ''}
            onChange={handleNameChange}
            name="profileName"
            className={`popup__input popup__input_profile_name ${nameValid ? "" : "popup__input_type_error"}`}
            placeholder="Имя"
            type="text"
            minLength="2"
            maxLength="40"
            required/>
          <span id="inputProfileName-error" className={`popup__error ${nameValid ? "": "popup__error_visible"}`}>{errorNameMessage}</span>
          <input
            id="inputProfileAbout"
            value={description || ''}
            onChange={handleDescriptionChange}
            name="profileAbout"
            className={`popup__input popup__input_profile_about-me ${descriptionValid ? "" : "popup__input_type_error"}`}
            placeholder="О себе"
            type="text"
            minLength="2"
            maxLength="200"
            required/>
          <span id="inputProfileAbout-error" className={`popup__error ${descriptionValid ? "": "popup__error_visible"}`}>{errorDescriptionMessage}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup