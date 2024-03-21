import '../pages/index.css';
import './profille.js';
import {initialCards} from './cards.js';
import {openPopup, closePopup, popupAddCard} from './modal';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

const cardElement = popupAddCard.querySelector('.popup__form');
const typeUrl = document.querySelector('.popup__input_type_url');
const typeCardName = document.querySelector('.popup__input_type_card-name');

const popupImage = document.querySelector('.popup_type_image');
const imageCaption = popupImage.querySelector('.popup__caption');
const image = popupImage.querySelector('.popup__image');
const closeImage = popupImage.querySelector('.popup__close');

// @todo: Функция создания карточки
function createCard(item, deleteButton) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardLike = placesItem.querySelector('.card__like-button');
    const cardImage = placesItem.querySelector('.card__image');

    cardImage.src = item.link;
    placesItem.querySelector('.card__title').textContent = item.name;

    //удаление карточки
    deleteButton = placesItem.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    //увеличение карточки
    cardImage.addEventListener('click', () => {
        fullImage(item.link, item.name)
    });

    cardLike.addEventListener('click', (event) => {
        if (event.target.classList.contains('card__like-button')) {
            (cardLike.classList.toggle('card__like-button_is-active'))
        }
    });

    return placesItem;
};

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(createCard (item, deleteCard));
});

//функция создания карточки
function handleNewCardFormSubmit(event) {
    event.preventDefault();
    const nameInput = typeCardName.value;
    const linkInput = typeUrl.value;
    const newCard = createCard({name: nameInput, link: linkInput});
    placesList.prepend(newCard);
    cardElement.reset();
    popupAddCard.classList.remove('popup_is-opened')
}

//обработчик создания карт 
cardElement.addEventListener('submit', handleNewCardFormSubmit);

//функция открытия картинки во весь экран
function fullImage(link, name) {
    imageCaption.textContent = name
    image.src = link
    image.alt = name
    openPopup(popupImage)
    closeImage.addEventListener('click', () => {
        closePopup(popupImage)
    });
};