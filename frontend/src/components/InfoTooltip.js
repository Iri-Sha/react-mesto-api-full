import React from "react";
import imageOk from "../images/ImageOk.svg";
import imageError from "../images/ImageError.svg";

function InfoTooltip({isOpen, onClose, register, handleOverlayClose}) {
  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <div
          className="popup__auth-image"
          style={{
            backgroundImage: `url(${register ? imageOk : imageError})`,
          }}
        ></div>
        <h2 className="popup__title popup__title_auth">
          {register
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;