export class FormValidator {
    constructor(config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this.form = form;
    }

    _showInputError = (form, input, errorMessage) => { //функция показа ошибки поля ввода
        input.classList.add(this._inputErrorClass); //добавлен стиль некорректному полю ввода
        this.formError = form.querySelector(`.${input.id}-error`) // находим span ошибки
        this.formError.textContent = errorMessage; // передаем сообщение об ошибке 
        this.formError.classList.add(this._errorClass); // делаем ошибку видимой
    }

    _hideInputError = (form, input) => { //функция скрытия ошибки поля ввода
        input.classList.remove(this._inputErrorClass);
        this.formError = form.querySelector(`.${input.id}-error`) 
        this.formError.classList.remove(this._errorClass);
        this.formError.textContent ='';
    }

    _isValid = (form, input) => { // функция проверки валидности формы
        if (input.validity.valid) {
            this._hideInputError(form, input) // если поле корректно, удаляем стиль ошибки и текст
        } else {
            this._showInputError(form, input, input.validationMessage) // меняем стиль поля ввода и показываем сообщение об ошибке, если поле некорректно
        }
    }
    _toggleButtonState = (formElement) => {
        const buttonSubmit = formElement.querySelector(this._submitButtonSelector); //нашли кнопку
        const isFormValid = formElement.checkValidity(); //проверка валидности формы
        if (!isFormValid) { // если форма не валидна
            buttonSubmit.disabled = true; // добавили кнопке атрибут disable
            buttonSubmit.classList.add(this._inactiveButtonClass); // добавили стиль
        } else {
            buttonSubmit.disabled = false; // убрали атрибут disable
            buttonSubmit.classList.remove(this._inactiveButtonClass); // убрали стиль
        }
    }

    _setInputListener = (form) => { // метод добавления обработчика валидности каждому инпуту формы
        this._toggleButtonState(form);
        const imputsArray = Array.from(form.querySelectorAll(this._inputSelector));
        imputsArray.forEach((input)=> {
            input.addEventListener('input', () => {
                this._isValid(form, input);
                this._toggleButtonState(form);
            })
        })
    }

    _setSubmitListener = (form) => { // обработчик переключения состояния кнопки при отправке формы
        form.addEventListener('submit', () => {
            const buttonSubmit = form.querySelector(this._submitButtonSelector); //нашли кнопку
            buttonSubmit.disabled = true; // добавили кнопке атрибут disable
            buttonSubmit.classList.add(this._inactiveButtonClass); // добавили стиль
        })
    }

    enableValidation = (form) => { //функция запуска валидации
        this._setInputListener(form);
        this._setSubmitListener(form);     
    }
}


