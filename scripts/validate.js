const formValidationConfig = { //настройки валидации
    formSelector: '.form-popup',
    inputSelector: '.form-popup__input',
    submitButtonSelector: '.form-popup__button-save',
    inactiveButtonClass: 'form-popup__button-save',
    inputErrorClass: 'form-popup__input_type_error',
    errorClass: 'form-popup__error_visible',
}

const showInputError = (config, form, input, errorMessage) => { //функция показа ошибки поля ввода
    input.classList.add(config.inputErrorClass); //добавлен стиль некорректному полю ввода
    formError = form.querySelector(`.${input.id}-error`) // находим span ошибки
    formError.textContent = errorMessage; // передаем сообщение об ошибке 
    formError.classList.add(config.errorClass); // делаем ошибку видимой
}

const hideInputError = (config, form, input) => { //функция скрытия ошибки поля ввода
    input.classList.remove(config.inputErrorClass);
    formError = form.querySelector(`.${input.id}-error`) 
    formError.classList.remove(config.errorClass);
    formError.textContent ='';
}

const isValid = (config, form, input) => { // функция проверки валидности формы
    if (input.validity.valid) {
        hideInputError(config, form, input) // если поле корректно, удаляем стиль ошибки и текст
    } else {
        showInputError(config, form, input, input.validationMessage) // меняем стиль поля ввода и показываем сообщение об ошибке, если поле некорректно
    }
}

const setInputListener = (form, config) => { // функция добавления обработчика валидности каждому инпуту формы
    const imputsArray = Array.from(form.querySelectorAll(config.inputSelector));
    imputsArray.forEach((input)=> {
        input.addEventListener('input', () => {
            isValid(config, form, input)
        })
    })
}

const enableValidation = (config) => { //функция запуска валидации
    const formsArray = Array.from(document.querySelectorAll(config.formSelector));
    formsArray.forEach((form) => { // назначили обработчик всем формам
        setInputListener(form, config);
    });      
}

enableValidation(formValidationConfig);