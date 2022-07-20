import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading, handleOverlayClose}) {
    const [avatar, setAvatar] = React.useState('')
    const [avatarValid, setAvatarValid] = React.useState(false);
    const [errorAvatarMessage, setErrorAvatarMessage] = React.useState('');

    React.useEffect(() => {
      setAvatar('');
      setAvatarValid(false);
      setErrorAvatarMessage('');
    }, [isOpen])

    function handleSubmit(e) {
      e.preventDefault()
      onUpdateAvatar({
        avatar: avatar,
      })
    }

    function handleChangeAvatar(e){
      setAvatar(e.target.value);
      setAvatarValid(e.target.validity.valid);
      setErrorAvatarMessage(e.target.validationMessage);
    }

    return (
        <PopupWithForm 
          isOpen={isOpen}
          onClose={onClose}
          name="editAvatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
          formValid={avatarValid}
        >
          <input
            id="inputAvatarLink"
            name="avatarLink"
            className={`popup__input popup__input_avatar_link ${errorAvatarMessage==='' ? "" : "popup__input_type_error"}`}
            type="url"
            placeholder="Ссылка на картинку"
            required
            value={avatar || ''}
            onChange={handleChangeAvatar}
          />
          <span id="inputAvatarLink-error" className={`popup__error ${avatarValid ? "" : "popup__error_visible"}`}>{errorAvatarMessage}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup