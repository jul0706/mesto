//Объявляем переменные 
const popupElement = document.querySelector('.popup'); //находим попап на всю страницу
const popupCloseIconElement = popupElement.querySelector('.popup-container__close-icon'); //находим окно попапа
const editButtonElement = document.querySelector('.profile__edit-button'); //находим кнопку "изменить"
const formElement = document.querySelector('.form-edit-profile'); // Находим форму в DOM
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form-edit-profile__input_type_name');
let jobInput = formElement.querySelector('.form-edit-profile__input_type_job');

//Функция открытия формы 
const popupOpen = function () {
    popupElement.classList.add('popup_is-opened')
}

//функция закрытия формы 
const popupClose = function () {
    popupElement.classList.remove('popup_is-opened')
}

//назначаем кнопке редактирования обработчик события
editButtonElement.addEventListener('click', popupOpen);

// назначаем кнопке закрытия формы обработчик события
popupCloseIconElement.addEventListener('click', popupClose);


// Обработчик «отправки» формы
function handleFormSubmit (evt) {

    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                
    // Получаем значение полей jobInput и nameInput
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    
    // Выбераем элементы, куда должны быть вставлены значения полей
    let profileTitleElement = document.querySelector('.profile__title');   
    let profileSubtitleElement = document.querySelector('.profile__subtitle');

    // Вставляем новые значения с помощью textContent
    profileTitleElement.textContent = nameInputValue;  
    profileSubtitleElement.textContent = jobInputValue;
    
    popupClose(); //закрываем форму
};


formElement.addEventListener('submit', handleFormSubmit); //добавлем обработчек событию отправки формы

popupElement.addEventListener ('keydown', function (evt){ //добавляем обработчик на клавишу Enter
        if (evt.code === 'Enter') {
            formElement.submit();
        }
    })




