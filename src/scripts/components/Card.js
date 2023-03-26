import {placesElement} from '../../scripts/consts.js'

export class Card {
    constructor(item, templateSelector, handleCardClick, deletePopup) {
        this._name = item.name;
        this._url = item.link;
        this._id = item._id;
        this._likes = item.likes.length;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
        this._deletePopup = deletePopup;
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
        if (this._likes) {//добавляем HTML элемент, если количество лайков не равно 0
            const likeArea = placeElement.querySelector('.place__like-area');
            const likeAmount = document.createElement('p');
            likeAmount.classList.add('place__like-amount');
            likeArea.append(likeAmount);
            this._cardLikeAmountElement = placeElement.querySelector('.place__like-amount');
            this._cardLikeAmountElement.textContent = this._likes;
        }
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
        button.addEventListener('click', () => {

            this._deletePopup.getIdCard(this._id);
            this._deletePopup.open();
            /*this._cardElement.remove();
            this._cardElement = null;*/
        })
    };

    getNewCard () { // метод создания новой карточки
        this.cardElement = this._makeCardElement(); //создали шаблон и наполнили данными
        const likeButton = this.cardElement.querySelector('.place__like-button');
        this._listenLikedButton(likeButton); //назначили слушатель "понравилось"
        const deleteButton = this.cardElement.querySelector('.place__delete-icon');
        this._listenDeleteButton(deleteButton); //назначили слушатель "удалить"
        this._cardImageElement.addEventListener('click', ()=>{this._handleCardClick(this._name, this._url)}) //назначили слушатель открытия попапа просмотра изображения
        return this.cardElement; //вернули карточку
    };
};