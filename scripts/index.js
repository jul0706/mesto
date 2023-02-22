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
const openPopup = function (element) {
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

//слушатель открытия попапа с изображением
export function openPopupImageFew (item) { 
    item.addEventListener ('click', function(evt) {
        const clickedImageElement = evt.target //изображение, которое вызвало событие
        openPopup(popupImageFew); //открыть попап с изображением
        const popupImageFewImgElement = document.querySelector('.image-figure__image'); // просматриваемое изображение
        const popupImageFewCaptionElement = document.querySelector('.image-figure__caption'); //подпись к изображению попапа
        popupImageFewImgElement.src = clickedImageElement.src;//присвоить изображению попапа ссылку изображения карточки
        popupImageFewImgElement.alt = clickedImageElement.alt; //присвоить alt изображения
        popupImageFewCaptionElement.textContent = clickedImageElement.alt;//присвоить подпись изображения
    })
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
    //поля формы добавления карточки
    const placeInput = formAddButtonElement.querySelector('.form-popup__input_type_place');
    const imageLinkInput = formAddButtonElement.querySelector('.form-popup__input_type_link');
    placesElement.prepend(getNewCard(placeInput.value, imageLinkInput.value)); //добавили карточку на страницу
    closePopup(popupAddButtonElement);
    formAddButtonElement.reset();
    toggleButtonState(formValidationConfig, formAddButtonElement);
}

export function listenLikedButton(item) { //обработчик отметки "понравилось"
    item.addEventListener('click', function(evt) {
        const likeButtonElement = evt.target; // кнопка, которая вызвала событие
        likeButtonElement.classList.toggle('place__like-button_active');
    })
};

export function listenDeleteButton(item) { //обработчик кнопки "удалить"
    item.addEventListener('click', function(evt) {
        const deletedCardElement = evt.target.closest('.place'); //карточка, на которой нажали кнопку "удалить"
        deletedCardElement.remove();
    })
};

function closePopupClickOverlay (popup) { // обработчик закрытия попапа при клике по оверлэю
    popup.addEventListener('click', function (evt) {
        if (evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
}

initialCards.forEach(function (item) { //каждую карточку из массива добавили на страницу
    let newCard = new Card (item.name, item.link, '#place__template');
    let cardElement = newCard.getNewCard();
    placesElement.append(cardElement);
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
