function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit, isLoading, handleOverlayClose, formValid}) {
    return (
      <div className={`popup popup__type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClose}>
        <div className="popup__container">
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          <form
            className={`popup__form popup__form_${name}`}
            name={name}
            onSubmit={onSubmit}
          >
            {children}
            <button
                className={`popup__button popup__button_${name} ${formValid ? "" : "popup__button_disabled"}`}
                type="submit"
                value={buttonText}
            >
                {isLoading ? 'Сохранение...' : buttonText}
            </button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm