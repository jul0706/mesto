import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('form');
        this._getInputValues = this._getInputValues.bind(this);
    }

    _getInputValues () { // получение значений полей
        const inputsArray = Array.from(this._form.querySelectorAll('.form-popup__input'));
        this._inputsValueArray = inputsArray.map(item=> item.value)
        return this._inputsValueArray; //вернули массив со значениями
    }

    close() { //добавили в родительский метод очистку полей формы
        super.close();
        this._form.reset();
    }

    setEventListeners() { // добавили методу setEventListener назначение кнопке "сохранить" слушателя отправки формы
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        })
    }
    
}