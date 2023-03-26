export class Api {
    constructor() {
        this._url = 'https://mesto.nomoreparties.co/v1/cohort-62/';
        this._token = 'ad81bbad-9a90-4f3d-8a69-b0152768bbd9';
        }

    getDataSever (configUrl) { //метод получения информации с сервера
        return fetch(`${this._url}${configUrl}`, { // вернули запрос
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
        .then(res => { //проверили ответ
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Упс...Ошибка!')
        })
    }

    editUserInfo (data, configUrl) { // метод изменения информации о пользователе
        return fetch(`${this._url}${configUrl}`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => { //проверили ответ
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Упс...Ошибка!')
        })
    }

    addCard (data, configUrl) { //метод добавленя карточки пользователем
        return fetch(`${this._url}${configUrl}`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => { //проверили ответ
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Упс...Ошибка!')
        })
    }
}