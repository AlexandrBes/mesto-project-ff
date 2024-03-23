import '../pages/index.css';
import {initialCards} from './cards.js';
import {openPopup, closePopup} from './modal';
import {createCard, deleteCard, handleNewCardFormSubmit} from './card';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');
export const popupAddCard = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');

export const popupForm = popupAddCard.querySelector('.popup__form');
export const typeUrl = document.querySelector('.popup__input_type_url');
export const typeCardName = document.querySelector('.popup__input_type_card-name');

const imageCaption = popupImage.querySelector('.popup__caption');
const image = popupImage.querySelector('.popup__image');

const profileElement = popupProfile.querySelector('.popup__form');
const userInput = profileElement.elements.name;
const jobInput = profileElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(createCard (item, deleteCard));
});

//Обработчик создания карт 
popupForm.addEventListener('submit', handleNewCardFormSubmit);

//Функция открытия картинки во весь экран
export function openImage(link, name) {
    imageCaption.textContent = name
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
});

//обработчик кнопки редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(popupProfile)
    userInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
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