import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading, handleOverlayClose}) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    const [nameValid, setNameValid] = React.useState(false);
    const [errorNameMessage, setErrorNameMessage] = React.useState('');
    const [linkValid, setLinkValid] = React.useState(false);
    const [errorLinkMessage, setErrorLinkMessage] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
        setNameValid(false);
        setErrorNameMessage('');
        setLinkValid(false);
        setErrorLinkMessage('');
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({
            name: name,
            link: link,
        })
    }

    function handleNameChange(e) {
        setName(e.target.value);
        setNameValid(e.target.validity.valid);
        setErrorNameMessage(e.target.validationMessage);
    }
    
    function handleLinkChange(e) {
        setLink(e.target.value);
        setLinkValid(e.target.validity.valid);
        setErrorLinkMessage(e.target.validationMessage);
    }

    const formValid = nameValid && linkValid;

    return (
        <PopupWithForm 
          isOpen={isOpen}
          onClose={onClose}
          name="addPlace"
          title="Новое место"
          buttonText="Создать"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
          formValid={formValid}
        >
          <input
            id="inputMestoName"
            name="mestoName"
            className={`popup__input popup__input_mesto_name ${errorNameMessage ==='' ? "":"popup__input_type_error"}`}
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            onChange={handleNameChange}
            value={name}
          />
          <span id="inputMestoName-error" className={`popup__error ${errorNameMessage==='' ? "" : "popup__error_visible"}`}>{errorNameMessage}</span>
          <input
            id="inputMestoLink"
            name="mestoLink"
            className={`popup__input popup__input_mesto_link ${errorLinkMessage ==='' ? "":"popup__input_type_error"}`}
            type="url"
            placeholder="Ссылка на картинку"
            required
            onChange={handleLinkChange}
            value={link}
          />
          <span id="inputMestoLink-error" className={`popup__error ${linkValid ? "" : "popup__error_visible"}`}>{errorLinkMessage}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup