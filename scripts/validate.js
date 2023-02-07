const config = {
    formSelector: '.form-popup',
    inputSelector: '.form-popup__input',
    submitButtonSelector: '.form-popup__button-save',
    inactiveButtonClass: 'form-popup__button-save',
    inputErrorClass: 'form-popup__input_type_error',
    errorClass: 'form-popup__error_visible'
  }


const showInputError = (form, input, errorMessage) => { //функция показа ошибки поля ввода
    input.classList.add('form-popup__input_type_error'); //добавлен стиль некорректному полю ввода
    formError = form.querySelector(`.${input.id}-error`) // находим span ошибки
    formError.textContent = errorMessage; // передаем сообщение об ошибке 
    formError.classList.add('form-popup__error_visible'); // делаем ошибку видимой
}

const hideInputError = (form, input) => { //функция скрытия ошибки поля ввода
    input.classList.remove('form-popup__input_type_error');
    formError = form.querySelector(`.${input.id}-error`) 
    formError.classList.remove('form-popup__error_visible');
    formError.textContent ='';
}

const isValid = (form, input) => { // функция проверки валидности формы
    if (input.validity.valid) {
        hideInputError(form, input) // если поле корректно, удаляем стиль ошибки и текст
    } else {
        showInputError(form, input, input.validationMessage) // меняем стиль поля ввода и показываем сообщение об ошибке, если поле некорректно
    }
};
const setEventListeners = (form) => { // функция добавления обработчика валидности каждому инпуту формы
    const imputsArray = Array.from(form.querySelectorAll('.form-popup__input'));
    imputsArray.forEach((input)=> {
        input.addEventListener('input', () => {
            isValid(form, input)
        })
    })
}

const enableValidation = () => {
    const formsList = Array.from(document.forms);
    formsList.forEach((form) => {
        form.addEventListener('input', () => {
            setEventListeners(form);
            isValid(document.querySelector('.form-popup'), document.querySelector('.form-popup__input'));
        })
    })
    
}


enableValidation();