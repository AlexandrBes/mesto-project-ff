import '../pages/index.css';
import {openPopup, closePopup} from './modal';
import {createCard, deleteCard, likeButton} from './card';
import {enableValidation, clearValidation} from './validation.js';
import {getInfoUser, getCards, editProfile, addCard, updateAvatar} from './api.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');

const formAddCard = popupAddCard.querySelector('.popup__form');
const typeUrl = document.querySelector('.popup__input_type_url');
const typeCardName = document.querySelector('.popup__input_type_card-name');

const formEditProfile = popupProfile.querySelector('.popup__form');
const userInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profile = document.querySelector('.profile');
const profileImage = profile.querySelector('.profile__image');
const popupEditImg = document.querySelector('.popup__edit-image');
const editButtonImg = document.querySelector('.edit__button-image');
const popupProfileImg = document.querySelector('form[name="img-avatar"]');
const linkAvatar = popupProfileImg.elements['update-avatar'];

const customValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const promise = [getInfoUser(), getCards()];

let userId;

Promise.all(promise)
    .then(([user, item]) => {
        userId = user._id;
        item.forEach ((item) => {
            placesList.append(createCard(item, deleteCard, openImage,  likeButton, userId));
        });
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
})
    .catch((err) => {
        console.log(err);
}); 

enableValidation(customValidation);

//Функция создания карточки
function handleNewCardFormSubmit(event) {
    event.preventDefault();
    const nameInput = typeCardName.value;
    const linkInput = typeUrl.value;
    formAddCard.querySelector('.popup__button').textContent = 'Сохранение...';
    addCard ({
        name: nameInput,
        link: linkInput
    })
    .then((res) => {
        placesList.prepend(createCard(res, deleteCard, openImage, likeButton, userId));
        closePopup(popupAddCard);
        formAddCard.reset();
    })
    .catch((err) => {
        console.log(err);
    }) 
    .finally(()=> {
        formAddCard.querySelector('.popup__button').textContent = 'Сохранить';        
    });
};

//обработчик кнопки добавления карт
addCardButton.addEventListener('click', () => {
    openPopup(popupAddCard);
    clearValidation(popupAddCard, customValidation);
});

//Обработчик создания карт 
formAddCard.addEventListener('submit', handleNewCardFormSubmit);

//функция редактирования профиля
function submitEditProfileForm(event) {
    event.preventDefault();
    formEditProfile.querySelector('.popup__button').textContent = 'Сохранение...';
    editProfile({
        name: userInput.value,
        about: jobInput.value
    })
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closePopup(popupProfile);
        formEditProfile.reset();
    })
    .catch((err) => {
        console.log(err);
    }) 
    .finally(()=> {
        formEditProfile.querySelector('.popup__button').textContent = 'Сохранить';        
    });
};

//обработчик кнопки редактирования профиля
editButton.addEventListener('click', () => {
    userInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
    clearValidation(popupProfile, customValidation);
    openPopup(popupProfile);
});

//обработчик редактирования профиля
formEditProfile.addEventListener('submit', submitEditProfileForm);

//Функция открытия картинки во весь экран
function openImage(link, name) {
    popupCaption.textContent = name;
    image.src = link;
    image.alt = name;
    openPopup(popupImage);
};

//функция закрытия на крестик
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    //обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});

//функция обновления аватарки
function avatarInput(event) {
    event.preventDefault();
    const avatarValue = linkAvatar.value;
    popupProfileImg.querySelector('.popup__button').textContent = 'Сохранение...';
    updateAvatar(avatarValue)
    .then((res) =>{
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        closePopup(popupEditImg);
        popupProfileImg.reset();
    })
    .catch((err) => {
        console.log(err);
    }) 
    .finally(()=> {
        popupProfileImg.querySelector('.popup__button').textContent = 'Сохранить';        
    })
}

//обработчик нажатия на аватарку
editButtonImg.addEventListener('click', () => {
    clearValidation(popupEditImg, customValidation);
    openPopup(popupEditImg);
})

//обработчик редактирования аватара
popupProfileImg.addEventListener('submit', avatarInput);