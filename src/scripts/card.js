import {cardTemplate, typeUrl, typeCardName, openImage, placesList, popupForm, popupAddCard} from './index'
import { closePopup } from './modal';

// @todo: Функция создания карточки
export function createCard(item) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placesItem.querySelector('.card__image');
    const cardTitle = placesItem.querySelector('.card__title');
    const deleteButton = placesItem.querySelector('.card__delete-button');
    const cardLike = placesItem.querySelector('.card__like-button');

    cardImage.src = item.link;
    cardImage.alt = item.name
    cardTitle.textContent = item.name;

    //Увеличение карточки
    cardImage.addEventListener('click', () => {
        openImage(item.link, item.name)
    });

    //Удаление карточки
    deleteButton.addEventListener('click', deleteCard);

    //Лайк карточки
    cardLike.addEventListener('click', likeButton);

    return placesItem;
};

//Функция создания карточки
export function handleNewCardFormSubmit(event) {
    event.preventDefault();
    const nameInput = typeCardName.value;
    const linkInput = typeUrl.value;
    const newCard = createCard({name: nameInput, link: linkInput});
    placesList.prepend(newCard);
    popupForm.reset();
    closePopup(popupAddCard)
}

// @todo: Функция удаления карточки
export function deleteCard(event) {
    event.target.closest('.places__item').remove();
};

//Функция лайка карточки
function likeButton (event) {
    event.target.classList.toggle('card__like-button_is-active')
};