import React from "react";

function Login({handleLoginSubmit}) {
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
        handleLoginSubmit(password, email)
    }

    return (
        <div className="popup__container popup__conteiner_theme_dark">
        <h2 className="popup__title popup__title_theme_dark">Вход</h2>
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
            <button className="popup__button popup__button_theme_dark" type="submit">Войти</button>
        </form>
        </div>
    );
}

export default Login;