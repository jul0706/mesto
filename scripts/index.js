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

// Находим форму в DOM
let formElement = document.querySelector('.form-edit-profile');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form-edit-profile__input_name');
let jobInput = formElement.querySelector('.form-edit-profile__input_job');



let nameInputValue = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
let jobInputValue = jobInput.value;
    
let profileTitleElement = document.querySelector('.profile__title');   // Выберите элементы, куда должны быть вставлены значения полей
let profileSubtitleElement = document.querySelector('.profile__subtitle');


   
/* Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    
    // Вставьте новые значения с помощью textContent
}

/* Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

*/