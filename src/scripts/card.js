// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(item, deleteCard, openImage, likeButton) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placesItem.querySelector('.card__image');
    const cardTitle = placesItem.querySelector('.card__title');
    const deleteButton = placesItem.querySelector('.card__delete-button');
    const cardLike = placesItem.querySelector('.card__like-button');

    cardImage.src = item.link;
    cardImage.alt = item.name
    cardTitle.textContent = item.name;

    //Удаление карточки
    deleteButton.addEventListener('click', deleteCard);

    //Увеличение карточки
    cardImage.addEventListener('click', () => openImage(item.link, item.name));

    //Лайк карточки
    cardLike.addEventListener('click', likeButton);

    return placesItem;
};

// @todo: Функция удаления карточки
export function deleteCard(event) {
    event.target.closest('.places__item').remove();
};

//Функция лайка карточки
export function likeButton(event) {
    event.target.classList.toggle('card__like-button_is-active')
};