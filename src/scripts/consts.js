import abhaziaImage from '../images/abhazia.jpg';
import ayuDagImage from '../images/ayu-dag.jpg';
import bannoeImage from '../images/bannoe.jpg';
import bashkortostanImage from '../images/bashkortostan.jpg';
import gurzufImage from '../images/gurzuf.jpg';
import magnitogorskImage from '../images/magnitogorsk.jpg';

export const initialCards = [ 
    {
        name: 'Абхазия',
        link: abhaziaImage
    },
    {
        name: 'гора Аю-Даг',
        link: ayuDagImage,
    },
    {
        name: 'озеро Банное (Якты-Куль)',
        link: bannoeImage,
    },
    {
        name: 'республика Башкортостан',
        link: bashkortostanImage
    },
    {
        name: 'Гурзуф',
        link: gurzufImage
    },
    {
        name: 'Магнитогорск',
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