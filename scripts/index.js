//Объявляем переменные 
const popupProfileElement = document.querySelector('.profile-popup'); //попап редактирования профиля
const popupProfileCloseIconElement = popupProfileElement.querySelector('.profile-popup-container__close-icon'); //кнопка закрытия попапа редактирования профиля
const editButtonElement = document.querySelector('.profile__edit-button'); //кнопка "изменить" профиль
const formProfileElement = document.querySelector('.form-popup_type_profile'); // форма редактирования профиля
const popupAddButtonElement = document.querySelector('.add-button-popup'); //попап добавления карточки
const addButtonElement = document.querySelector('.add-button');//кнопка "добавить"
const popupAddButtonCloseIconElement = document.querySelector('.add-button-popup-container__close-icon') //кнопка закрытия формы добавления карточки
const formAddButtonElement = document.querySelector('.form-popup_type_add');//форма добавления карточки
const popupImageFew = document.querySelector('.place-popup');//попап просмотра изображения
const popupImageFewImgElement = document.querySelector('.image-figure__image'); // просматриваемое изображение
const popupImageFewCaptionElement = document.querySelector('.image-figure__caption'); //подпись к изображению попапа
const popupImageFewCloseIconElement = document.querySelector('.img-popup-container__close-icon'); //кнопка закрытия попапа просмотра изображения
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
        link: './images/abhazia.jpg',
        alt: 'набережая моря'
    },
    {
        name: 'гора Аю-Даг',
        link: './images/ayu-dag.jpg',
        alt: 'гора опускается в море'
    },
    {
        name: 'озеро Банное (Якты-Куль)',
        link: './images/bannoe.jpg',
        alt: 'красный закат на озере'
    },
    {
        name: 'республика Башкортостан',
        link: './images/bashkortostan.jpg',
        alt: 'река среди гор'
    },
    {
        name: 'Гурзуф',
        link: './images/gurzuf.jpg',
        alt: 'море на фоне леса'
    },
    {
        name: 'Магнитогорск',
        link: './images/magnitogorsk.jpg',
        alt: 'дымящие трубы'
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

//функция открытия попапа с изображением
function openPopupImageFew (item) { 
    item.addEventListener ('click', function(evt) {
        let clickImageElement = evt.target //изображение, которое вызвало событие
        popupImageFew.classList.add('popup_is-opened'); //открыть изображение
        popupImageFewImgElement.src = clickImageElement.src;//присвоить изображению попапа ссылку изображения карточки
        popupImageFewImgElement.alt = clickImageElement.alt; //присвоить подпись изображения
        popupImageFewCaptionElement.textContent = evt.target.parentElement.querySelector('.place__title').textContent;//присвоить подписи изображения попапа название карточки
    })
}
//функция закрытия попапа с изображением
const closePopupImageFew = function () {
    popupImageFew.classList.remove('popup_is-opened');
}

// Обработчик «отправки» формы редактирования профиля
function handleFormSubmit (evt) {
    evt.preventDefault(); // отмена стандартную отправку формы.
    profileTitleElement.textContent = nameInput.value;  // Вставляем новые значения
    profileSubtitleElement.textContent = jobInput.value;
    closePopup(); //закрываем форму
};

//обработчик отправки формы добавления новой карточки пользователем
const addCardByUser = function (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы
    placesElement.prepend(getNewCard(placeInput.value, imageLinkInput.value, placeInput.value)); //добавили карточку на страницу
    closePopupAddButton();
}

function getNewCard (title, image, alt) {
    let placeTemplate = placesElement.querySelector('#place__template').content; //получили доступ к содержимому template
    let placeElement = placeTemplate.querySelector('.place').cloneNode(true); // копировали содержимое template (article)
    let placeImageElement = placeElement.querySelector('.place__image'); //в переменную сохранили элемент изображения карточки
    let placeTitleElement = placeElement.querySelector('.place__title'); //в переменную сохранили элемент названия карточки
    placeTitleElement.textContent = title; //добавляем названия
    placeImageElement.src = image; //добавляем картинку
    placeImageElement.alt = alt; //добавляем подпись
    let placeLikeButton = placeElement.querySelector('.place__like-button');
    listenLikedButtons(placeLikeButton); //назначили обработчик "понравилось"
    let placeDeleteButton = placeElement.querySelector('.place__delete-icon');
    listenDeleteButtons(placeDeleteButton); //назначили обработчик "удалить"
    openPopupImageFew(placeImageElement);//назначили обработчик открытия попапа с изображением
    return placeElement;
};

function listenLikedButtons(item) { //обработчик отметки "понравилось"
    item.addEventListener('click', function(evt) {
        let likeButtonElement = evt.target; // кнопка, которая вызвала событие
        likeButtonElement.classList.toggle('place__like-button_active');
    })
};


function listenDeleteButtons(item) { //обработчик кнопки "удалить"
    item.addEventListener('click', function(evt) {
        let deletedCardElement = evt.target.parentElement; //карточка, на которой нажали кнопку "удалить"
        deletedCardElement.remove();
    })
};

initialCards.forEach(function (item) { //каждую карточку из массива добавили на страницу
    placesElement.append(getNewCard(item.name, item.link, item.alt));
});

formProfileElement.addEventListener('submit', handleFormSubmit); //назначаем обработчик событию отправки формы редактирования профиля

editButtonElement.addEventListener('click', openPopupEditProfile); //назначаем кнопке редактирования обработчик события

popupProfileCloseIconElement.addEventListener('click', closePopup); // назначаем кнопке закрытия формы обработчик события

formAddButtonElement.addEventListener('submit',addCardByUser); // назначаем кнопке "создать" бработчик события

addButtonElement.addEventListener('click', openPopupAddButton); //назначаем кнопке "добавить" обработчик события

popupAddButtonCloseIconElement.addEventListener('click', closePopupAddButton); //назначаем кнопке закрытия формы добавления карточки обработчик события

popupImageFewCloseIconElement.addEventListener('click', closePopupImageFew); //назначаем кнопке закрытия попапа с изображением обработчик


/*nameInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    nameInput.value = '';
    }
);

jobInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    jobInput.value = '';
    }
);*/