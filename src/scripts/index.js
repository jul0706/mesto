import {Card} from './Card.js';
import {initialCards, formValidationConfig,} from './consts.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import '../pages/index.css';
//Объявляем переменные 
//const popupsArray = Array.from(document.querySelectorAll('.popup'));//массив всех попапов
const popupProfileElement = document.querySelector('.profile-popup'); //попап редактирования профиля
//const popupProfileCloseIconElement = popupProfileElement.querySelector('.profile-popup-container__close-icon'); //кнопка закрытия попапа редактирования профиля
const editButtonElement = document.querySelector('.profile__edit-button'); //кнопка "изменить" профиль
const formProfileElement = document.querySelector('.form-popup_type_profile'); // форма редактирования профиля
//const popupAddButtonElement = document.querySelector('.add-button-popup'); //попап добавления карточки
const addButtonElement = document.querySelector('.add-button');//кнопка "добавить"
//const popupAddButtonCloseIconElement = document.querySelector('.add-button-popup-container__close-icon') //кнопка закрытия формы добавления карточки
//const formAddButtonElement = document.querySelector('.form-popup_type_add');//форма добавления карточки
//const popupImageFew = document.querySelector('.place-popup');//попап просмотра изображения
//const popupImageFewCloseIconElement = document.querySelector('.img-popup-container__close-icon'); //кнопка закрытия попапа просмотра изображения
//поля формы редактирования профиля
const nameInput = formProfileElement.querySelector('.form-popup__input_type_name');
const jobInput = formProfileElement.querySelector('.form-popup__input_type_job');
// элементы страницы, куда вставим значения полей формы
const profileTitleElement = document.querySelector('.profile__title');   
const profileSubtitleElement = document.querySelector('.profile__subtitle');
//элемент places
export const placesElement = document.querySelector('.places');

//Функция открытия формы редактирования профиля
const openPopupEditProfile = function () {
    openPopup(popupProfileElement);
    nameInput.value = profileTitleElement.textContent; //передали содержимое заголовков страницы в форму профайла
    jobInput.value = profileSubtitleElement.textContent;
}

const defaultCards = new Section ( { // создание класса с начальными карточками
    array: initialCards,
    renderer: (item) => {
        const newCard = new Card (item, '#place__template');
        const cardElement = newCard.getNewCard();
        defaultCards.addItem(cardElement);
    },
    }, 
    '.places'
);

defaultCards.renderItems(); // добавили карточки на страницу

const profilePopup = new PopupWithForm('profile-popup',  (array) => { //создали экземпляр попапа профайла
    profileTitleElement.textContent = array[0];
    profileSubtitleElement.textContent = array[1];
});

profilePopup.setEventListeners(); //назначили слушатели

editButtonElement.addEventListener ('click', function () { //добавлен слушатель кнопке редактирования профиля
      profilePopup.open(); 
})

const addButtonPopup = new PopupWithForm('add-button-popup', (arr) => { //создали попап добавления карточки пользователем
    const userCardData = {
        name: arr[0],
        link: arr[1],
        };
    const userCard = new Card (userCardData, '#place__template');
    const cardElement = userCard.getNewCard();
    placesElement.prepend(cardElement);
})

addButtonPopup.setEventListeners(); //назначили слушатели

addButtonElement.addEventListener ('click', function () { //добавлен слушатель кнопке добавления карточки
    addButtonPopup.open()
})


Array.from(document.querySelectorAll('.form-popup')).forEach((form => {
    const formValidator = new FormValidator(formValidationConfig, form);
    formValidator.enableValidation(form);
}))

