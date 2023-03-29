import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor (popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.form-popup');
        this._submitButton = this._popup.querySelector('.form-popup__button-save');
    }

    getIdCard (id, card) {
        this._idDeletedCard = id;
        this._deletedCard = card;
    }
    
    setEventListeners() {
        super.setEventListeners(); //закрытие по крестику, клику по оверлэй, нажатию на Esc
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._idDeletedCard, this._deletedCard);
            this.close();
        })
    }
}