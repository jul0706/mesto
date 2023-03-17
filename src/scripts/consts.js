import abhaziaImage from '../images/abhazia.jpg';
import ayuDagImage from '../images/ayu-dag.jpg';
import bannoeImage from '../images/bannoe.jpg';
import bashkortostanImage from '../images/bashkortostan.jpg';
import gurzufImage from '../images/gurzuf.jpg';
import magnitogorskImage from '../images/magnitogorsk.jpg';

export const initialCards = [ 
    {
        place: 'Абхазия',
        link: abhaziaImage
    },
    {
        place: 'гора Аю-Даг',
        link: ayuDagImage,
    },
    {
        place: 'озеро Банное (Якты-Куль)',
        link: bannoeImage,
    },
    {
        place: 'республика Башкортостан',
        link: bashkortostanImage
    },
    {
        place: 'Гурзуф',
        link: gurzufImage
    },
    {
        place: 'Магнитогорск',
        link: magnitogorskImage
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

//Объявляем переменные 
export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button'); 
export const formProfileElement = document.querySelector('.form-popup_type_profile'); 
export const buttonOpenPopupAddCard = document.querySelector('.add-button');
export const inputName = formProfileElement.querySelector('.form-popup__input_type_name');
export const inputJob = formProfileElement.querySelector('.form-popup__input_type_job');
export const placesElement = document.querySelector('.places');
