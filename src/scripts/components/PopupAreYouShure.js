import { Popup } from "./Popup.js";

export class PopupAreYouShure extends Popup {
    constructor (popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._submitButton = this._popup.querySelector('.form-popup__button-save');
    }

    getCard (id, card) {
        this._idDeletedCard = id;
        this._card = card;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._idDeletedCard, this._card);
            this.close();
        })
    }
}