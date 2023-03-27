import {placesElement} from '../../scripts/consts.js'

export class Card {
    constructor(item, templateSelector, handleCardClick, deletePopup, userId, api) {
        this._name = item.name;
        this._url = item.link;
        this._id = item._id;
        this._likes = item.likes;
        this._ownerId = item.owner._id;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
        this._deletePopup = deletePopup;
        this._userId = userId;
        this._api = api;
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
        
        if (this._ownerId !== this._userId) { //если ID создателя карточки не совпадают с ID пользователя, 
            placeElement.querySelector('.place__delete-icon').remove() //убираем иконку удаления карточки
        }

        this._cardImageElement = placeElement.querySelector('.place__image'); //в переменную сохранили элемент изображения карточки
        this._placeTitleElement = placeElement.querySelector('.place__title'); //в переменную сохранили элемент названия карточки
        this._likeArea = placeElement.querySelector('.place__like-area');
        this._likeButton = placeElement.querySelector('.place__like-button');        
        
        if (this._likes.length) {//добавляем HTML элемент, если количество лайков не равно 0
            this._likeAmount = document.createElement('p');
            this._likeAmount.classList.add('place__like-amount');
            this._likeArea.append(this._likeAmount);
            this._likeAmount.textContent = this._likes.length;
            if (this._likes.some(user => { //проверяем, ставил ли пользователь лайк текущей карточке
                return user._id === this._userId
                })) {
                    this._likeButton.classList.add('place__like-button_active');
                    this._isUserLiked = true;
                }
        }
        
        this._placeTitleElement.textContent = this._name; //добавляем названия
        this._cardImageElement.src = this._url; //добавляем картинку
        this._cardImageElement.alt = this._name; //добавляем подпись
        
        return placeElement;
    }

    _listenLikedButton() { //слушатель отметки "понравилось"
        if (this._isUserLiked) { //если пользователь уже лайкал карточку
            this._api.likeCard(this._id, 'cards', 'DELETE'). //отправили запрос на удаление лайка
            then(() => {
                this._isUserLiked = false; //пользователь не лайкал карточку
                this._likes.length--; //уменьшили количество лайков
                if (this._likes.length === 0) { // если количество лайков стало 0
                    this._likeAmount.remove(); //удалили элемент количества лайков
                    this._likeButton.classList.remove('place__like-button_active');
                } else {
                this._likeAmount.textContent = this._likes.length;
                this._likeButton.classList.remove('place__like-button_active');
                }
            })
        } else { //если пользователь еще не лайкал карточку 
        this._api.likeCard(this._id, 'cards', 'PUT'). //отправили запрос на лайк
            then(() => {
                this._isUserLiked = true;
                this._likeButton.classList.add('place__like-button_active')
                if (this._likes.length) {//если количество лайков не равно 0
                    this._likes.length++; //увеличили на 1
                    this._likeAmount.textContent = this._likes.length;
                } else {
                    this._likes.length++; //увеличили на 1
                    this._likeAmount = document.createElement('p');
                    this._likeAmount.classList.add('place__like-amount');
                    this._likeArea.append(this._likeAmount);
                    this._likeAmount.textContent = this._likes.length;
                }
            })
        }
    }
    
    _listenDeleteButton(button) { //слушатель кнопки "удалить"
        button.addEventListener('click', () => {
            this._deletePopup.getIdCard(this._id, this.cardElement);
            this._deletePopup.open();
        })
    };

    getNewCard () { // метод создания новой карточки
        this.cardElement = this._makeCardElement(); //создали шаблон и наполнили данными
        const likeButton = this.cardElement.querySelector('.place__like-button');
        likeButton.addEventListener('click', ()=> {this._listenLikedButton()}); //назначили слушатель "понравилось"
        const deleteButton = this.cardElement.querySelector('.place__delete-icon');
        if (deleteButton) { //если имеется иконка удаления
            this._listenDeleteButton(deleteButton); //назначили слушатель "удалить"
        }
        this._cardImageElement.addEventListener('click', ()=>{this._handleCardClick(this._name, this._url)}) //назначили слушатель открытия попапа просмотра изображения
        return this.cardElement; //вернули карточку
    };
};