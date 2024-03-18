import {popupProfile} from "./modal";
import {editButton} from "./modal";

const profileElement = popupProfile.querySelector('.popup__form');
const nameInput = profileElement.elements.name;
const jobInput = profileElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//вывод имени и занятий
editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

//функция редактирования профиля
function handleFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupProfile.classList.remove('popup_is-opened')
};

//обработчик редактирования профиля
profileElement.addEventListener('submit', handleFormSubmit);