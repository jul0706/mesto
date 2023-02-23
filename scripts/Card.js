import {placesElement, openPopup} from './index.js'

export class Card {
    constructor(item, templateSelector) {
        this._name = item.name;
        this._url = item.link;
        this._template = templateSelector;
    }

    _makeTemplateElement () { // метод создания шаблона  HTML разметки карточки
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
        this._placeTitleElement = placeElement.querySelector('.place__title'); //в переменную сохранили элемент названия карточки
        this._placeTitleElement.textContent = this._name; //добавляем названия
        this._cardImageElement.src = this._url; //добавляем картинку
        this._cardImageElement.alt = this._name; //добавляем подпись
        return placeElement;
    }

    _listenLikedButton(button) { //слушатель отметки "понравилось"
        button.addEventListener('click', function(evt) {
            const likeButtonElement = evt.target; // кнопка, которая вызвала событие
            likeButtonElement.classList.toggle('place__like-button_active');
        })
    };

    _listenDeleteButton(button) { //слушатель кнопки "удалить"
        button.addEventListener('click', function(evt) {
            const deletedCardElement = evt.target.closest('.place'); //карточка, на которой нажали кнопку "удалить"
            deletedCardElement.remove();
        })
    };

    _openPopupImageFew (image) {  //слушатель открытия попапа с изображением
        image.addEventListener ('click', function(evt) {
            const clickedImageElement = evt.target //изображение, которое вызвало событие
            openPopup(document.querySelector('.place-popup')); //открыть попап с изображением
            const popupImageFewImgElement = document.querySelector('.image-figure__image'); // просматриваемое изображение
            const popupImageFewCaptionElement = document.querySelector('.image-figure__caption'); //подпись к изображению попапа
            popupImageFewImgElement.src = clickedImageElement.src;//присвоить изображению попапа ссылку изображения карточки
            popupImageFewImgElement.alt = clickedImageElement.alt; //присвоить alt изображения
            popupImageFewCaptionElement.textContent = clickedImageElement.alt;//присвоить подпись изображения
        })
    }

    getNewCard () { // метод создания новой карточки
        this._cardElement = this._makeCardElement(); //создали шаблон и наполнили данными
        const likeButton = this._cardElement.querySelector('.place__like-button');
        this._listenLikedButton(likeButton); //назначили слушатель "понравилось"
        const deleteButton = this._cardElement.querySelector('.place__delete-icon');
        this._listenDeleteButton(deleteButton); //назначили слушатель "удалить"
        this._openPopupImageFew(this._cardImageElement); //назначили слушатель открытия попапа с изображением
        return this._cardElement; //вернули карточку
    };
};