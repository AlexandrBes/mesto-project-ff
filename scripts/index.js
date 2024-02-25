// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCards (item) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);

    placesItem.querySelector('.card__image').src = item.link;
    placesItem.querySelector('.card__title').textContent = item.name;

    const deleteButton = placesItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCards);

    return placesItem;
};

// @todo: Функция удаления карточки
function deleteCards (event) {
    deleteButton = event.target.closest('.places__item');
    deleteButton.remove()
};

// @todo: Вывести карточки на страницу
initialCards.forEach (function (item, placesItem) {
    placesItem = addCards(item);
    placesList.append(placesItem);
});