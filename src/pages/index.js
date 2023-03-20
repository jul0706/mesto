//импортируем классы
import {Card} from '../scripts/components/Card.js';
import {initialCards, formValidationConfig, buttonOpenPopupProfile, buttonOpenPopupAddCard, 
    inputName, inputJob,} from '../scripts/consts.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Section} from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import '../pages/index.css';

function generateCard (data, selector) { //функция создания карточки
    const newCard = new Card (data, selector, function(place, url) {
        imgPopup.open(url, place); // колбэк открытия попапа
    });
    const cardElement = newCard.getNewCard();
    return cardElement;
}

const imgPopup = new PopupWithImage(); // создали попап промосмотра изображения
imgPopup.setEventListeners(); //назначили обработчики

const cardsOnPage = new Section ( { // создание класса с начальными карточками
    array: initialCards,
    renderer: (item) => {
        const card = generateCard(item, '#place__template');
        cardsOnPage.addItem(card);
    },
    }, 
    '.places'
);

cardsOnPage.renderItems(); // добавили карточки на страницу

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

buttonOpenPopupProfile.addEventListener ('click', function () { //добавлен слушатель кнопке редактирования профиля
    profilePopup.open();
    const userData = user.getUserInfo(); 
    inputName.value = userData.name; //передали содержимое заголовков страницы в поля формы профайла
    inputJob.value = userData.job;
})

const popupAddCard = new PopupWithForm({//создали попап добавления карточки пользователем
    popupSelector: 'add-button-popup',
    submitCallback:   (userCardData) => { 
        const card = generateCard(userCardData, '#place__template');
        cardsOnPage.addItem(card)
    }
})

popupAddCard.setEventListeners(); //назначили слушатели

buttonOpenPopupAddCard.addEventListener ('click', function () { //добавлен слушатель кнопке добавления карточки
    popupAddCard.open()
})

Array.from(document.querySelectorAll('.form-popup')).forEach((form => { //создали объект валидации для каждой формы
    const formValidator = new FormValidator(formValidationConfig, form);
    formValidator.enableValidation(form);
}))