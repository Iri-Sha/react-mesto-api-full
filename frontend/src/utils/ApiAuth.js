class ApiAuth {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
  
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return res.json().then((data) => {
            throw new Error(data.message);
        });
    }
  
    registration(password, email) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email
            }),
        })
        .then((res) => this._checkResponse(res));
    }
  
    authorization(password, email) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        }).then((res) => this._checkResponse(res));
    }

    logout() {
        return fetch(`${this._baseUrl}/logout`, {
          credentials: "include",
          headers: this._headers,
        }).then((res) => this._checkResponse(res));
    }
  
    getContent = (token) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }).then((res) => this._checkResponse(res));
    }
}
  
export const apiAuth = new ApiAuth({
    baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
    headers: {
        "Content-Type": "application/json",
    },
    credentials: 'include',
});
