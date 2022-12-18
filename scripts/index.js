//Объявляем переменные 
const popupElement = document.querySelector('.popup');
const popupCloseIconElement = popupElement.querySelector('.popup-container__close-icon');
const editButtonElement = document.querySelector('.profile__edit-button');


//Функция открытия формы редактирования
const popupOpen = function () {
    popupElement.classList.add('popup_is-opened')
}

//функция закрытия формы редактирования
const popupClose = function () {
    popupElement.classList.remove('popup_is-opened')
}



//назначаем кнопке редактирования обработчик события
editButtonElement.addEventListener('click',popupOpen);

// назначаем кнопке закрытия формы редактирования обработчик события
popupCloseIconElement.addEventListener('click',popupClose);



