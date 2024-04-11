import {removeCard, addLike, removeLike} from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(item, deleteCard, openImage, likeButton, userId) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placesItem.querySelector('.card__image');
    const cardTitle = placesItem.querySelector('.card__title');
    const deleteButton = placesItem.querySelector('.card__delete-button');
    const cardLike = placesItem.querySelector('.card__like-button');
    const likes = placesItem.querySelector('.number__likes');

    cardImage.src = item.link;
    cardImage.alt = item.name
    cardTitle.textContent = item.name;

    //Удаление карточки
    if (item.owner._id !== userId) {
        deleteButton.style.display = 'none'
    } else {
        deleteButton.addEventListener('click', () => deleteCard(item._id, placesItem));
    }

    //Увеличение карточки
    cardImage.addEventListener('click', () => openImage(item.link, item.name));

    //Лайк карточки
    cardLike.addEventListener('click', () => likeButton(item._id, likes, cardLike));

    //Количество лайков
    likes.textContent = item.likes.length;

    item.likes.forEach((item) => {
      if (item._id === userId) {
        cardLike.classList.add('card__like-button_is-active');
      }
    })

    return placesItem;
};

// @todo: Функция удаления карточки
export function deleteCard(item, event) {
  removeCard(item)
    .then(() => {
      event.remove()
    });
};

//Функция лайка карточки
export function likeButton(event, likes, cardLike) {
  if (!(cardLike.classList.contains('card__like-button_is-active'))) {
    addLike(event)
    .then((item) => {
      cardLike.classList.add('card__like-button_is-active')
      likes.textContent = Object.keys(item.likes).length
    })
  } else {
    removeLike(event)
    .then((item) => {
      cardLike.classList.remove('card__like-button_is-active')
      likes.textContent = Object.keys(item.likes).length
    })
  }
};