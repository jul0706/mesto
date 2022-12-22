//Объявляем переменные 
const popupElement = document.querySelector('.popup'); //находим попап на всю страницу
const popupCloseIconElement = popupElement.querySelector('.popup-container__close-icon'); //находим окно попапа
const editButtonElement = document.querySelector('.profile__edit-button'); //находим кнопку "изменить"
const formElement = document.querySelector('.form-edit-profile'); // Находим форму в DOM
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.form-edit-profile__input_type_name');
const jobInput = formElement.querySelector('.form-edit-profile__input_type_job');
// Находим элементы страницы, куда вставим значения полей формы
const profileTitleElement = document.querySelector('.profile__title');   
const profileSubtitleElement = document.querySelector('.profile__subtitle');

//Функция открытия формы 
const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = profileTitleElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

//функция закрытия формы 
const closePopup = function () {
    popupElement.classList.remove('popup_is-opened')
}

// Обработчик «отправки» формы
function handleFormSubmit (evt) {

    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Вставляем новые значения с помощью textContent
    profileTitleElement.textContent = nameInput.value;  
    profileSubtitleElement.textContent = jobInput.value;
    
    closePopup(); //закрываем форму
};

nameInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    nameInput.value = '';
    }
);

jobInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    jobInput.value = '';
    }
);
formElement.addEventListener('submit', handleFormSubmit); //добавлем обработчек событию отправки формы

editButtonElement.addEventListener('click', openPopup); //назначаем кнопке редактирования обработчик события

popupCloseIconElement.addEventListener('click', closePopup); // назначаем кнопке закрытия формы обработчик события




