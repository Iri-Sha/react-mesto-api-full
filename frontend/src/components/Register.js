import React from "react";
import { Link } from 'react-router-dom';

function Register({handleRegisterSubmit}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmailChange (e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange (e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegisterSubmit(password, email)
    }

    return (
        <div className="popup__container popup__conteiner_theme_dark">
        <h2 className="popup__title popup__title_theme_dark">Регистрация</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
            <input
                className="popup__input popup__input_theme_dark" 
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                required
                minLength="2"
                maxLength="100"
                onChange={handleEmailChange}
            />
            <span className="popup__error"></span>
            <input
                className="popup__input popup__input_theme_dark" 
                name="password"
                type="password"
                placeholder="Пароль"
                value={password}
                required
                minLength="6"
                maxLength="100"
                onChange={handlePasswordChange}
            />
            <span className="popup__error"></span>
            <button className="popup__button popup__button_theme_dark" type="submit">Зарегистрироваться</button>
            <p className="popup__register-text">
                Уже зарегистрированы?
                <Link className="popup__register-link" to="/sign-in"> Войти</Link>
            </p>
        </form>
        </div>
    );
}

export default Register;