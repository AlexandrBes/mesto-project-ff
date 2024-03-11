import '../pages/index.css';
import {initialCards} from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (item, deleteButton) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);

    placesItem.querySelector('.card__image').src = item.link;
    placesItem.querySelector('.card__title').textContent = item.name;

    deleteButton = placesItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return placesItem;
};

// @todo: Функция удаления карточки
function deleteCard (event) {
    deleteButton = event.target.closest('.places__item');
    deleteButton.remove()
};

// @todo: Вывести карточки на страницу
initialCards.forEach (function (item) {
    placesList.append (createCard (item, deleteCard));
});