import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({popupSelector, submitCallback}) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('form');
        this._getInputValues = this._getInputValues.bind(this);
        this._inputsArray = Array.from(this._form.querySelectorAll('.form-popup__input'));
        this._submitButton = this._form.querySelector('.form-popup__button-save');
    }

    _getInputValues () { // получение значений полей
        this._formValues = {};
        this._inputsArray.forEach(input => {
            this._formValues[input.name] = input.value
        })
        return this._formValues; //вернули объект со значениями
    }

    close() { //добавили в родительский метод очистку полей формы
        super.close();
        this._form.reset();
    }

    setEventListeners() { // добавили методу setEventListener назначение кнопке "сохранить" слушателя отправки формы
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues(),this._submitButton);
            this.close();
        })
    }  
}