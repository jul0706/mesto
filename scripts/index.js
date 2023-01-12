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
//Находим элемент places
const placesElement = document.querySelector('.places');
const initialCards = [ //карточки по умолчанию
    {
        name: 'Абхазия',
        link: './images/abhazia.jpg'
    },
    {
        name: 'гора Аю-Даг',
        link: './images/ayu-dag.jpg'
    },
    {
        name: 'озеро Банное (Якты-Куль)',
        link: './images/bannoe.jpg'
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

initialCards.forEach(function (item) { //каждую карточку из массива добавляем на страницу
    let placeTemplate = placesElement.querySelector('#place__template').content; //получили доступ к содержимому template
    let placeElement = placeTemplate.querySelector('.place').cloneNode(true); // копировали содержимое template (article)
    let placeImageElement = placeElement.querySelector('.place__image'); //в переменную сохранили элемент изображения карточки
    let placeTitleElement = placeElement.querySelector('.place__title'); //в переменную сохранили элемент названия карточки
    placeImageElement.src = item.link; //присвоили ссылку на изображение карточки
    placeTitleElement.textContent = item.name;// присвоили название карточки
    placesElement.append(placeElement); //добавили карточку на страницу
});

formElement.addEventListener('submit', handleFormSubmit); //добавлем обработчек событию отправки формы

editButtonElement.addEventListener('click', openPopup); //назначаем кнопке редактирования обработчик события

popupCloseIconElement.addEventListener('click', closePopup); // назначаем кнопке закрытия формы обработчик события

/*nameInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    nameInput.value = '';
    }
);

jobInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    jobInput.value = '';
    }
);*/




