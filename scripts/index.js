//Объявляем переменные 
const popupProfileElement = document.querySelector('.profile-popup'); //попап редактирования профиля
const popupProfileCloseIconElement = popupProfileElement.querySelector('.profile__popup-container__close-icon'); //кнопка закрытия попапа редактирования профиля
const editButtonElement = document.querySelector('.profile__edit-button'); //кнопка "изменить" профиль
const formProfileElement = document.querySelector('.form-popup_type_profile'); // форма редактирования профиля
const popupAddButtonElement = document.querySelector('.add-button__popup'); //попап добавления карточки
const addButtonElement = document.querySelector('.profile__add-button');//кнопка "добавить"
const popupAddButtonCloseIconElement = document.querySelector('.add-button__popup-container__close-icon') //кнопка закрытия формы добавления карточки
const formAddButtonElement = document.querySelector('.form-popup_type_add');//форма добавления карточки
//поля формы редактирования профиля
const nameInput = formProfileElement.querySelector('.form-popup__input_type_name');
const jobInput = formProfileElement.querySelector('.form-popup__input_type_job');
//поля формы добавления карточки
const placeInput = formAddButtonElement.querySelector('.form-popup__input_type_place');
const imageLinkInput = formAddButtonElement.querySelector('.form-popup__input_type_link');
// элементы страницы, куда вставим значения полей формы
const profileTitleElement = document.querySelector('.profile__title');   
const profileSubtitleElement = document.querySelector('.profile__subtitle');
//элемент places
const placesElement = document.querySelector('.places');



//карточки по умолчанию
const initialCards = [ 
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

//Функция открытия формы редактирования профиля
const openPopupEditProfile = function () {
    popupProfileElement.classList.add('popup_is-opened');
    nameInput.value = profileTitleElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

//функция закрытия формы редактирования профиля
const closePopup = function () {
    popupProfileElement.classList.remove('popup_is-opened')
}

//функция открытия формы добавления карточки
const openPopupAddButton = function () {
    popupAddButtonElement.classList.add('popup_is-opened');
}

//функция закрытия формы добавления карточки
const closePopupAddButton = function () {
    popupAddButtonElement.classList.remove('popup_is-opened');
}

// Обработчик «отправки» формы редактирования профиля
function handleFormSubmit (evt) {

    evt.preventDefault(); // отмена стандартную отправку формы.

    // Вставляем новые значения с помощью textContent
    profileTitleElement.textContent = nameInput.value;  
    profileSubtitleElement.textContent = jobInput.value;
    
    closePopup(); //закрываем форму
};

//обработчик отправки формы добавления новой карточки пользователем
const addCardByUser = function (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы
    placesElement.prepend(getNewCard(placeInput.value, imageLinkInput.value)); //добавили карточку на страницу
    closePopupAddButton();
}



initialCards.forEach(function (item) { //каждую карточку из массива добавляем на страницу
    placesElement.append(getNewCard(item.name, item.link));
});

//кнопки "понравилось"

const likeButtonsElement = document.querySelectorAll('.place__like-button'); //nodeList кнопок "понравилось"
const arrayLikeButtonsElement = Array.from(likeButtonsElement); // массив кнопок "понравилось"
arrayLikeButtonsElement.forEach(listenLikedButtons); //назначаем всем кнопкам "понравилось" обработчик события


//кнопки "удалить"

const deleteButtonsElement = document.querySelectorAll('.place__delete-icon'); // nodeList кнопок "удалить"
const arrayDeleteButtonsElement = Array.from(deleteButtonsElement); // массив кнопок "удалить"
arrayDeleteButtonsElement.forEach(listenDeleteButtons); // назначаем всем кнопкам "удалить" обработчик события

function getNewCard (title, image) {
    let placeTemplate = placesElement.querySelector('#place__template').content; //получили доступ к содержимому template
    let placeElement = placeTemplate.querySelector('.place').cloneNode(true); // копировали содержимое template (article)
    let placeImageElement = placeElement.querySelector('.place__image'); //в переменную сохранили элемент изображения карточки
    let placeTitleElement = placeElement.querySelector('.place__title'); //в переменную сохранили элемент названия карточки
    placeTitleElement.textContent = title; 
    placeImageElement.src = image;
   
    return placeElement;
};

function listenLikedButtons(item) { //обработчик отметки "понравилось"
    
    item.addEventListener('click', function(evt) {
        let likeButtonElement = evt.target; // кнопка, которая вызвала событие
        if (likeButtonElement.classList.contains('place__like-button_active')) { //проверяем наличие класса
            likeButtonElement.classList.remove('place__like-button_active')
        } else {
            likeButtonElement.classList.add('place__like-button_active');
        }
    })
};


function listenDeleteButtons(item) { //обработчик кнопки "удалить"
    
    item.addEventListener('click', function(evt) {
        let deletedCardElement = evt.target.parentElement;
        deletedCardElement.remove();
    })
};

formProfileElement.addEventListener('submit', handleFormSubmit); //назначаем обработчик событию отправки формы редактирования профиля

editButtonElement.addEventListener('click', openPopupEditProfile); //назначаем кнопке редактирования обработчик события

popupProfileCloseIconElement.addEventListener('click', closePopup); // назначаем кнопке закрытия формы обработчик события

formAddButtonElement.addEventListener('submit',addCardByUser); // назначаем кнопке "создать" бработчик события

addButtonElement.addEventListener('click', openPopupAddButton); //назначаем кнопке "добавить" обработчик события

popupAddButtonCloseIconElement.addEventListener('click', closePopupAddButton); //назначаем кнопке закрытия формы добавления карточки обработчик события







/*nameInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    nameInput.value = '';
    }
);

jobInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    jobInput.value = '';
    }
);*/