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

const initialCards = [ 
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

//функция открытия попапов
const openPopup = function (element) {
    element.classList.add('popup_is-opened');
}

//функция закрытия попапов
const closePopup = function (element) {
    element.classList.remove('popup_is-opened')
}

//Функция открытия формы редактирования профиля
const openPopupEditProfile = function () {
    openPopup(popupProfileElement);
    nameInput.value = profileTitleElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

//функция открытия попапа с изображением
function openPopupImageFew (item) { 
    item.addEventListener ('click', function(evt) {
        const clickedImageElement = evt.target //изображение, которое вызвало событие
        openPopup(popupImageFew); //открыть попап с изображением
        popupImageFewImgElement.src = clickedImageElement.src;//присвоить изображению попапа ссылку изображения карточки
        popupImageFewImgElement.alt = clickedImageElement.alt; //присвоить alt изображения
        popupImageFewCaptionElement.textContent = clickedImageElement.alt;//присвоить подпись изображения
    })
}

// Обработчик «отправки» формы редактирования профиля
function handleFormProfileSubmit (evt) {
    evt.preventDefault(); // отмена стандартную отправку формы.
    profileTitleElement.textContent = nameInput.value;  // Вставляем новые значения
    profileSubtitleElement.textContent = jobInput.value;
    closePopup(popupProfileElement); //закрываем форму
};

//обработчик отправки формы добавления новой карточки пользователем
const handleFormAddCardByUser = function (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы
    placesElement.prepend(getNewCard(placeInput.value, imageLinkInput.value, placeInput.value)); //добавили карточку на страницу
    closePopup(popupAddButtonElement);
    formAddButtonElement.reset();
}

function getNewCard (title, image) {
    const placeTemplate = placesElement.querySelector('#place__template').content; //получили доступ к содержимому template
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true); // копировали содержимое template (article)
    const placeImageElement = placeElement.querySelector('.place__image'); //в переменную сохранили элемент изображения карточки
    const placeTitleElement = placeElement.querySelector('.place__title'); //в переменную сохранили элемент названия карточки
    placeTitleElement.textContent = title; //добавляем названия
    placeImageElement.src = image; //добавляем картинку
    placeImageElement.alt = title; //добавляем подпись
    const placeLikeButton = placeElement.querySelector('.place__like-button');
    listenLikedButton(placeLikeButton); //назначили обработчик "понравилось"
    const placeDeleteButton = placeElement.querySelector('.place__delete-icon');
    listenDeleteButton(placeDeleteButton); //назначили обработчик "удалить"
    openPopupImageFew(placeImageElement);//назначили обработчик открытия попапа с изображением
    return placeElement;
};

function listenLikedButton(item) { //обработчик отметки "понравилось"
    item.addEventListener('click', function(evt) {
        let likeButtonElement = evt.target; // кнопка, которая вызвала событие
        likeButtonElement.classList.toggle('place__like-button_active');
    })
};


function listenDeleteButton(item) { //обработчик кнопки "удалить"
    item.addEventListener('click', function(evt) {
        let deletedCardElement = evt.target.parentElement; //карточка, на которой нажали кнопку "удалить"
        deletedCardElement.remove();
    })
};

initialCards.forEach(function (item) { //каждую карточку из массива добавили на страницу
    placesElement.append(getNewCard(item.name, item.link, item.alt));
});

formProfileElement.addEventListener('submit', handleFormProfileSubmit); //назначаем обработчик событию отправки формы редактирования профиля

editButtonElement.addEventListener('click', openPopupEditProfile); //назначаем кнопке редактирования обработчик события

popupProfileCloseIconElement.addEventListener('click', function () {
                                                            closePopup(popupProfileElement)
                                                        }); // назначаем кнопке закрытия формы обработчик события

formAddButtonElement.addEventListener('submit',handleFormAddCardByUser); // назначаем кнопке "создать" бработчик события

addButtonElement.addEventListener('click', function () {
                                                openPopup(popupAddButtonElement)
                                            }); //назначаем кнопке "добавить" обработчик события

popupAddButtonCloseIconElement.addEventListener('click', function () {
                                                            closePopup(popupAddButtonElement)
                                                        }); //назначаем кнопке закрытия формы добавления карточки обработчик события

popupImageFewCloseIconElement.addEventListener('click', function () {
                                                            closePopup(popupImageFew)
                                                        }); //назначаем кнопке закрытия попапа с изображением обработчик


/*nameInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    nameInput.value = '';
    }
);

jobInput.addEventListener('click', function() { // добавляем обработчик очистки поля формы при клике
    jobInput.value = '';
    }
);*/