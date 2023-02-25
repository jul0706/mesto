export const initialCards = [ 
    {
        name: 'Абхазия',
        link: './images/abhazia.jpg'
    },
    {
        name: 'гора Аю-Даг',
        link: './images/ayu-dag.jpg',
    },
    {
        name: 'озеро Банное (Якты-Куль)',
        link: './images/bannoe.jpg',
    },
    {
        name: 'республика Башкортостан',
        link: './images/bashkortostan.jpg'
    },
    {
        name: 'Гурзуф',
        link: './images/gurzuf.jpg'
    },
    {
        name: 'Магнитогорск',
        link: './images/magnitogorsk.jpg'
    },
];

export const formValidationConfig = { //объект настроек валидации
    formSelector: '.form-popup',
    inputSelector: '.form-popup__input',
    submitButtonSelector: '.form-popup__button-save',
    inactiveButtonClass: 'form-popup__button-save_disabled',
    inputErrorClass: 'form-popup__input_type_error',
    errorClass: 'form-popup__error_visible',
};