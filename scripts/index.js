import {Card} from './Card.js';
import {initialCards} from './initialCards.js';
//Объявляем переменные 
const popupsArray = Array.from(document.querySelectorAll('.popup'));//массив всех попапов
const popupProfileElement = document.querySelector('.profile-popup'); //попап редактирования профиля
const popupProfileCloseIconElement = popupProfileElement.querySelector('.profile-popup-container__close-icon'); //кнопка закрытия попапа редактирования профиля
const editButtonElement = document.querySelector('.profile__edit-button'); //кнопка "изменить" профиль
const formProfileElement = document.querySelector('.form-popup_type_profile'); // форма редактирования профиля
const popupAddButtonElement = document.querySelector('.add-button-popup'); //попап добавления карточки
const addButtonElement = document.querySelector('.add-button');//кнопка "добавить"
const popupAddButtonCloseIconElement = document.querySelector('.add-button-popup-container__close-icon') //кнопка закрытия формы добавления карточки
const formAddButtonElement = document.querySelector('.form-popup_type_add');//форма добавления карточки
const popupImageFew = document.querySelector('.place-popup');//попап просмотра изображения
const popupImageFewCloseIconElement = document.querySelector('.img-popup-container__close-icon'); //кнопка закрытия попапа просмотра изображения
//поля формы редактирования профиля
const nameInput = formProfileElement.querySelector('.form-popup__input_type_name');
const jobInput = formProfileElement.querySelector('.form-popup__input_type_job');
// элементы страницы, куда вставим значения полей формы
const profileTitleElement = document.querySelector('.profile__title');   
const profileSubtitleElement = document.querySelector('.profile__subtitle');
//элемент places
export const placesElement = document.querySelector('.places');

const checkPressEsc = (evt) => { // обработчик проверка нажатой клавиши и удаление обработчика Escape
    if (evt.key === 'Escape') { //если нашали Esc
        closePopup(document.querySelector('.popup_is-opened')); //закрыть открытый попап
    }
}

function closePopupPressEsc () { //слушатель закрытия попапа при нажатии Escape
    window.addEventListener('keydown', checkPressEsc)
}

//функция открытия попапов
export const openPopup = function (element) {
    element.classList.add('popup_is-opened'); //добавили класс
    closePopupPressEsc(); //добавили слушатель закрытия по Esc
}

//функция закрытия попапов
const closePopup = function (element) {
    window.removeEventListener('keydown', checkPressEsc) //удалить слушатель закрытия по Esc
    element.classList.remove('popup_is-opened'); //удалили класс
}

//Функция открытия формы редактирования профиля
const openPopupEditProfile = function () {
    openPopup(popupProfileElement);
    nameInput.value = profileTitleElement.textContent; //передали содержимое заголовков страницы в форму профайла
    jobInput.value = profileSubtitleElement.textContent;
}

// Обработчик отправки формы редактирования профиля
function handleFormProfileSubmit (evt) {
    evt.preventDefault(); // отмена стандартную отправку формы.
    profileTitleElement.textContent = nameInput.value;  // Вставляем новые значения
    profileSubtitleElement.textContent = jobInput.value;
    closePopup(popupProfileElement); //закрываем форму
};

//обработчик отправки формы добавления новой карточки пользователем
const handleFormAddCardByUser = function (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы
    const userCard = {};
    userCard.name = formAddButtonElement.querySelector('.form-popup__input_type_place').value;
    userCard.link = formAddButtonElement.querySelector('.form-popup__input_type_link').value;
    placesElement.prepend(generateCard(userCard, '#place__template')); //добавили карточку на страницу
    closePopup(popupAddButtonElement);
    formAddButtonElement.reset();
    toggleButtonState(formValidationConfig, formAddButtonElement);
}

function closePopupClickOverlay (popup) { // обработчик закрытия попапа при клике по оверлэю
    popup.addEventListener('click', function (evt) {
        if (evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
}
const generateCard = (item, selector) => { //функция сосздания карточки с использованием класса Card
    let newCard = new Card (item, selector);
    let cardElement = newCard.getNewCard();
    return cardElement;
}
initialCards.forEach(function (item) { //каждую карточку из массива добавили на страницу
    placesElement.append(generateCard(item, '#place__template'));
});

popupsArray.forEach (function(popup) { //каждому попапу назначили слушатель закрытия при клике по оверлэй
    closePopupClickOverlay(popup);
})

formProfileElement.addEventListener('submit', handleFormProfileSubmit); //назначаем обработчик событию отправки формы редактирования профиля

editButtonElement.addEventListener('click', openPopupEditProfile); //назначаем кнопке редактирования обработчик события

popupProfileCloseIconElement.addEventListener('click', function () {
                                                            closePopup(popupProfileElement)
                                                        }); // назначаем кнопке закрытия формы обработчик события

formAddButtonElement.addEventListener('submit',handleFormAddCardByUser); // назначаем кнопке "создать" бработчик события

addButtonElement.addEventListener('click', function () {
                                                openPopup(popupAddButtonElement)
                                            }); //назначаем кнопке "добавить" обработчик события

popupAddButtonCloseIconElement.addEventListener('click', function () {
                                                            closePopup(popupAddButtonElement)
                                                        }); //назначаем кнопке закрытия формы добавления карточки обработчик события

popupImageFewCloseIconElement.addEventListener('click', function () {
                                                            closePopup(popupImageFew)
                                                        }); //назначаем кнопке закрытия попапа с изображением обработчик
