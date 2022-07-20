function ImagePopup({card, onClose, handleOverlayClose}) {
    return (
        <div className={`popup popup_view-image ${card.link && 'popup_opened'}`} onClick={handleOverlayClose}>
            <figure className="popup__figure">
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__image" alt={card.name} src={card.link}/>
                <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup
