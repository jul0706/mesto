//импортируем классы
import {Card} from '../components/Card.js';
import {formValidationConfig, buttonOpenPopupProfile, buttonOpenPopupAddCard, 
    inputName, inputJob, buttonOpenChangeAvatarPopup} from '../utils/consts.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import '../pages/index.css';
import { Api } from '../components/Api.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation';

function generateCard (data, selector) { //создание карточки
    const newCard = new Card (data, selector, function(place, url) {
        imgPopup.open(url, place); // колбэк открытия попапа
    },
    popupDeleteCard,
    user.userId,
    api
    );
    const cardElement = newCard.getNewCard();
    return cardElement;
}

export function checkError (err) { //проверка ответа от сервера на ошибку
    alert(err)
};

function renderLoading (isLoading, button, textDefaultButton) {
    if (isLoading) {
        button.textContent = "Сохранение"
    } else {
        button.textContent = textDefaultButton
    }
}

const popupDeleteCard = new PopupWithConfirmation('delete-popup', function(id, card){ //создали класс попапа удаления, передали колбэк удаления карточки
    const apiDeletedCard = api.deleteCard(id, 'cards'); //отправили запрос на удаление
    apiDeletedCard.then (() => { //если запрос успешен
        card.remove(); //удалили элемент со страницы
        card = null; //удалили экземпляр карточки
        popupDeleteCard.close() //закрыли попап
    })
    .catch(err => checkError(err))
});
popupDeleteCard.setEventListeners();//назначили обработчики

const imgPopup = new PopupWithImage(); // создали попап промосмотра изображения
imgPopup.setEventListeners(); //назначили обработчики

const user = new UserInfo({ // создали экземпляр класса UserInfo
    nameElement: '.profile__title',
    jobElement: '.profile__subtitle',
    avatarElement: '.profile__avatar'
});

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-62/', 'ad81bbad-9a90-4f3d-8a69-b0152768bbd9'); //создали класс API

const cardsOnPage = new Section ( { // создали класс с начальными карточками
    renderer: (item) => {
        const card = generateCard(item, '#place__template');
        cardsOnPage.addItems(card);
    },
    }, 
    '.places'
);

//const apiUser = api.getDataServer('users/me'); //загрузили информацию о пользователе с сервера

Promise.all([
    api.getDataServer('users/me'),

    api.getDataServer('cards')
])

.then((values)=>{ //попадаем сюда когда оба промиса будут выполнены
    user.setUserInfo(values[0]);
    cardsOnPage.renderItems(values[1]);
})

.catch(err => checkError(err))

/*apiUser.then(res => { // когда получили данные пользователя
    user.setUserInfo(res) //отразили данные на странице
    const apiCards = api.getDataServer('cards'); //загрузили карточки с сервера
    apiCards.then(res => { //когда получили данные карточек с сервера
        cardsOnPage.renderItems(res) //разместили карточки на странице
    })
    .catch(err => checkError(err))
        
})
.catch(err => checkError(err))*/



const profilePopup = new PopupWithForm({ //создали экземпляр попапа формы редактирования профайла
    popupSelector: 'profile-popup',
    submitCallback:  (formData, buttonSave) => { //изменение данных пользователя
        const textDefault = buttonSave.textContent; //сохранили текст кнопки до отправки запроса
        renderLoading (true, buttonSave, textDefault)
        const apiUser = api.editUserInfo(formData, 'users/me'); //получить данные с сервера
        apiUser.then(res =>{ //когда данные успешно получены
            user.editUserInfo(res); //установить новые данные на странице
            profilePopup.close(); //закрыть попап
        })
        .catch(err => checkError(err))
        .finally(()=>{renderLoading (false, buttonSave, textDefault)})
    }
})
profilePopup.setEventListeners(); //назначили слушатели

function handleOpenPopupProfile () { //обработчик открытия попапа профайла
    profilePopup.open(); //открыть попап
    const userData = user.getUserInfo(); //получить информацию о пользователе со страницы
    inputName.value = userData.name; //передали содержимое заголовков страницы в поля формы профайла
    inputJob.value = userData.about;
}

buttonOpenPopupProfile.addEventListener ('click', handleOpenPopupProfile) //назначить слушатель события кнопке редактирования данных пользователя

const popupAddCard = new PopupWithForm({//создали попап добавления карточки пользователем
    popupSelector: 'add-button-popup',
    submitCallback:   (userCardData, buttonSave) => { //добавление новой карточки
        const textDefault = buttonSave.textContent; //сохранили текст кнопки до отправки запроса
        renderLoading (true, buttonSave, textDefault);
        const apiCard = api.addCard(userCardData, 'cards'); //получить данные с сервера
        apiCard.then(res => {
            const card = generateCard(res, '#place__template'); //создать карточку
            cardsOnPage.addItem(card) //разместить на странице
            popupAddCard.close() //закрыть попап
        })
        .catch(err => checkError(err))
        .finally(()=>{renderLoading (false, buttonSave, textDefault)})
    }
})

popupAddCard.setEventListeners(); //назначили слушатели

buttonOpenPopupAddCard.addEventListener ('click', function () { //добавлен слушатель кнопке добавления карточки
    popupAddCard.open()
})

const popupChangeAvatar = new PopupWithForm({ //попап редактирования аватара
    popupSelector: 'edit-avatar-popup',
    submitCallback: (dataLink, buttonSave) => { //изменение аватара пользователя
        const textDefault = buttonSave.textContent; //сохранили текст кнопки до отправки запроса
        renderLoading (true, buttonSave, textDefault);
        const apiAvatar = api.changeAvatar(dataLink, 'users/me/avatar'); //получить данные с сервера
        apiAvatar.then(res => {
            user.editAvatar(res); //изменить аватар
            popupChangeAvatar.close();
        })
        .catch(err => checkError(err))
        .finally(()=>{renderLoading (false, buttonSave, textDefault)})
    }
})

popupChangeAvatar.setEventListeners();

buttonOpenChangeAvatarPopup.addEventListener('click', function() { //слушатель кнопке аватара
    popupChangeAvatar.open()
})

Array.from(document.querySelectorAll('.form-popup')).forEach((form => { //создали объект валидации для каждой формы
    const formValidator = new FormValidator(formValidationConfig, form);
    formValidator.enableValidation(form);
}))