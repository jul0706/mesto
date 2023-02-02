// объявляем переменные
const formElement = document.querySelector('.form-popup'); //форма
const formInput = formElement.querySelector('.form-popup__input'); //поле ввода

const showInputError = (form, input, errorMessage) => { //функция показа ошибки поля ввода
    input.classList.add('form-popup__input_type_error'); //добавлен стиль некорректному полю ввода
    formError = form.querySelector(`.${input.id}-error`) // находим span ошибки
    formError.textContent = errorMessage; // передаем сообщение об ошибке 
    formError.classList.add('form-popup__error_visible'); // делаем ошибку видимой
}

const hideInputError = (form, input) => { //функция скрытия ошибки поля ввода
    input.classList.remove('form-popup__input_type_error');
    formError = form.querySelector(`.${input.id}-error`) // находим span ошибки
    formError.classList.remove('form-popup__error_visible');
    formError.textContent ='#';
}

const isValid = (form, input) => { // функция валидации форм
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage) // меняем стиль поля ввода и показываем сообщение об ошибке, если поле некорректно
    } else {
        hideInputError(form, input) // если поле корректно, удаляем стиль ошибки и текст
    }
};
const setEventListeners = (form) => {
    const imputsArray = Array.from(form.querySelectorAll('.form-popup__input'));
    imputsArray.forEach((input)=> {
        input.addEventListener('input', () => {
            isValid(form, input)
        })
    })
}

setEventListeners(formElement);