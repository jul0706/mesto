//импортируем классы
import {Card} from './Card.js';
import {initialCards, formValidationConfig,} from './consts.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';
import '../pages/index.css';
//Объявляем переменные 
const editButtonElement = document.querySelector('.profile__edit-button'); //кнопка "изменить" профиль
const formProfileElement = document.querySelector('.form-popup_type_profile'); // форма редактирования профиля
const addButtonElement = document.querySelector('.add-button');//кнопка "добавить"
const nameInput = formProfileElement.querySelector('.form-popup__input_type_name');
const jobInput = formProfileElement.querySelector('.form-popup__input_type_job');
//элемент places
export const placesElement = document.querySelector('.places');

const defaultCards = new Section ( { // создание класса с начальными карточками
    array: initialCards,
    renderer: (item) => {
        const newCard = new Card (item, '#place__template', function(evt) {
            const imgPopup = new PopupWithImage(evt); // создали попап промосмотра изображения
            imgPopup.open(); // открыли попап
            imgPopup.setEventListeners(); //назначили обработчики
        });
        const cardElement = newCard.getNewCard();
        defaultCards.addItem(cardElement);
    },
    }, 
    '.places'
);

defaultCards.renderItems(); // добавили карточки на страницу

const user = new UserInfo({
    nameElement: '.profile__title',
    jobElement: '.profile__subtitle'
});

const profilePopup = new PopupWithForm({ //создали экземпляр попапа профайла
    popupSelector: 'profile-popup',
    submitCallback:  (formData) => { 
    user.setUserInfo(formData);
    }
})

profilePopup.setEventListeners(); //назначили слушатели

editButtonElement.addEventListener ('click', function () { //добавлен слушатель кнопке редактирования профиля
    profilePopup.open();
    const userData = user.getUserInfo(); 
    nameInput.value = userData.name; //передали содержимое заголовков страницы в поля формы профайла
    jobInput.value = userData.job;
})

const addButtonPopup = new PopupWithForm({//создали попап добавления карточки пользователем
    popupSelector: 'add-button-popup',
    submitCallback:   (userCardData) => { 
        const userCard = new Card (userCardData, '#place__template', function(evt) {
            const imgPopup = new PopupWithImage(evt); // создали попап промосмотра изображения
            imgPopup.open(); // открыли попап
            imgPopup.setEventListeners(); //назначили обработчики
        });
        const cardElement = userCard.getNewCard();
        placesElement.prepend(cardElement);
    }
})

addButtonPopup.setEventListeners(); //назначили слушатели

addButtonElement.addEventListener ('click', function () { //добавлен слушатель кнопке добавления карточки
    addButtonPopup.open()
})

Array.from(document.querySelectorAll('.form-popup')).forEach((form => { //создали объект валидации для каждой формы
    const formValidator = new FormValidator(formValidationConfig, form);
    formValidator.enableValidation(form);
}))