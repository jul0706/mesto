//импортируем классы
import {Card} from '../scripts/components/Card.js';
import {formValidationConfig, buttonOpenPopupProfile, buttonOpenPopupAddCard, 
    inputName, inputJob,} from '../scripts/consts.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Section} from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import '../pages/index.css';
import { Api } from '../scripts/components/Api.js';

function generateCard (data, selector) { //функция создания карточки
    const newCard = new Card (data, selector, function(place, url) {
        imgPopup.open(url, place); // колбэк открытия попапа
    });
    const cardElement = newCard.getNewCard();
    return cardElement;
}

const imgPopup = new PopupWithImage(); // создали попап промосмотра изображения
imgPopup.setEventListeners(); //назначили обработчики

const user = new UserInfo({ // создали экземпляр класса
    nameElement: '.profile__title',
    jobElement: '.profile__subtitle'
});

const api = new Api(); //создали класс API

const apiUser = api.getDataSever('users/me'); //загрузили информацию о пользователе с сервера

apiUser.then(res => {
        user.setUserInfo(res) //отразили на странице
})
.catch(err => {
    alert(err)
})

const cardsOnPage = new Section ( { // создание класса с начальными карточками
    renderer: (item) => {
        const card = generateCard(item, '#place__template');
        cardsOnPage.addItem(card);
    },
    }, 
    '.places'
);

const apiCards = api.getDataSever('cards'); //загрузили карточки с сервера

apiCards.then(res => {
    res.reverse();
    cardsOnPage.renderItems(res) //разместили карточки на странице
})
.catch(err => {
    alert(err)
})


const profilePopup = new PopupWithForm({ //создали экземпляр попапа формы редактирования профайла
    popupSelector: 'profile-popup',
    submitCallback:  (formData) => { 
        const apiUser = api.editUserInfo(formData, 'users/me'); //получили данные с сервера
        apiUser.then(res =>{
            user.setUserInfo(res);
        })
        .catch(err => {
            alert(err)
        })
    }
})

profilePopup.setEventListeners(); //назначили слушатели

buttonOpenPopupProfile.addEventListener ('click', function () { //добавлен слушатель кнопке редактирования профиля
    profilePopup.open();
    const userData = user.getUserInfo(); 
    inputName.value = userData.name; //передали содержимое заголовков страницы в поля формы профайла
    inputJob.value = userData.about;
})

const popupAddCard = new PopupWithForm({//создали попап добавления карточки пользователем
    popupSelector: 'add-button-popup',
    submitCallback:   (userCardData) => { 
        const apiCard = api.addCard(userCardData, 'cards'); //получили данные с сервера
        apiCard.then(res => {
            const card = generateCard(res, '#place__template');
            cardsOnPage.addItem(card)
        })
        .catch(err => {
            alert(err)
        })
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



