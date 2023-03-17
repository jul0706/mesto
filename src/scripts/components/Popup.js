export class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(`.${popupSelector}`);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._checkPressOverlay = this._checkPressOverlay.bind(this);
        this._checkPressEsc = this._checkPressEsc.bind(this);
    }

    open () {
        this._popup.classList.add('popup_is-opened'); //добавили класс
        this._handleEscClose(); //добавили слушатель закрытия по Esc
    }

    _checkPressEsc (evt) { // обработчик проверка нажатой клавиши
        if (evt.key === 'Escape') { //если нашали Esc
            this.close()
        }
    }

    _checkPressOverlay (evt) {
        if (evt.target === evt.currentTarget) {
            this.close()
        }
    }

    _handleEscClose () {
        window.addEventListener('keydown', this._checkPressEsc)
    }

    close () {
        window.removeEventListener('keydown', this._checkPressEsc) //удалить слушатель закрытия по Esc
        this._popup.classList.remove('popup_is-opened'); //удалили класс
    }

    setEventListeners () {
        this._closeButton = this._popup.querySelector('.close-icon');
        this._closeButton.addEventListener('click', this.close);
        this._popup.addEventListener('click', this._checkPressOverlay);
    }
}