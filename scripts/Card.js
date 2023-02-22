import {placesElement, listenLikedButton, listenDeleteButton, openPopupImageFew} from './index.js'

export class Card {
    constructor(name, url, templateSelector) {
        this._name = name;
        this._url = url;
        this._template = templateSelector;
    }

    _makeTemplateElement () { // метод создания шаблона разметки карточки
        const placeTemplate = placesElement //сохранили шаблон разметки карточки в переменную
            .querySelector(this._template)
            .content //получили доступ к содержимому template
            .querySelector('.place')
            .cloneNode(true); // копировали содержимое template (article)
            return placeTemplate; // вернули переменную
    }

    _makeCardElement () { // метод наполнения шаблона разметки уникальными данными
        const placeElement = this._makeTemplateElement();
        this._cardImageElement = placeElement.querySelector('.place__image'); //в переменную сохранили элемент изображения карточки
        const placeTitleElement = placeElement.querySelector('.place__title'); //в переменную сохранили элемент названия карточки
        placeTitleElement.textContent = this._name; //добавляем названия
        this._cardImageElement.src = this._url; //добавляем картинку
        this._cardImageElement.alt = this._name; //добавляем подпись
        return placeElement;
    }

    getNewCard () { // функция  создания новой карточки
        this._cardElement = this._makeCardElement();
        const likeButton = this._cardElement.querySelector('.place__like-button');
        listenLikedButton(likeButton); //назначили слушатель "понравилось"
        const deleteButton = this._cardElement.querySelector('.place__delete-icon');
        listenDeleteButton(deleteButton); //назначили слушатель "удалить"
        openPopupImageFew(this._cardImageElement);//назначили слушатель открытия попапа с изображением
        return this._cardElement; //вернули карточку
    };
};


