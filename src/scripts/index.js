import '../pages/index.css';
import {initialCards} from './cards.js';
import {openPopup, closePopup} from './modal';
import {createCard, deleteCard, likeButton} from './card';
import {enableValidation, clearValidation} from './validation.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');

export const popupForm = popupAddCard.querySelector('.popup__form');
const typeUrl = document.querySelector('.popup__input_type_url');
const typeCardName = document.querySelector('.popup__input_type_card-name');

const profileElement = popupProfile.querySelector('.popup__form');
const userInput = profileElement.elements.name;
const jobInput = profileElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const customValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

enableValidation(customValidation)

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(createCard (item, deleteCard, openImage, likeButton));
});

//Функция создания карточки
function handleNewCardFormSubmit(event) {
    event.preventDefault();
    const nameInput = typeCardName.value;
    const linkInput = typeUrl.value;
    const newCard = createCard({name: nameInput, link: linkInput});
    placesList.prepend(newCard);
    popupForm.reset();
    closePopup(popupAddCard);
}

//Обработчик создания карт 
popupForm.addEventListener('submit', handleNewCardFormSubmit);

//Функция открытия картинки во весь экран
function openImage(link, name) {
    popupCaption.textContent = name
    image.src = link
    image.alt = name    
    openPopup(popupImage)
};

//функция закрытия на крестик
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    //обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});

//обработчик кнопки добавления карт
addCardButton.addEventListener('click', () => {
    openPopup(popupAddCard)
    clearValidation(popupAddCard, customValidation)
});

//обработчик кнопки редактирования профиля
editButton.addEventListener('click', () => {
    userInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
    clearValidation(popupProfile, customValidation)
    openPopup(popupProfile)
});

//функция редактирования профиля
function handleFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = userInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile)
};

//обработчик редактирования профиля
profileElement.addEventListener('submit', (event) => {
    handleFormSubmit(event)
});