export const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupProfile = document.querySelector('.popup_type_edit');
export const editButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
const closeCard = popupAddCard.querySelector('.popup__close');
const closeProfile = popupProfile.querySelector('.popup__close')

const popupImage = document.querySelector('.popup_type_image');
const imageCaption = popupImage.querySelector('.popup__caption');
const image = popupImage.querySelector('.popup__image');
const closeImage = popupImage.querySelector('.popup__close');

export function openPopup(event) {
    event.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', closeEsc);
};

function closePopup(event) {
    event.classList.remove('popup_is-opened');
};
  
function closeEsc(event) {
    if ((event.key === 'Escape')) {
      closePopup(document.querySelector('.popup_is-opened'));
    };
};
  
function closeOverlay(event) {
    if (event.target.classList.contains('popup_is-opened')) {
      closePopup(event.target);
    };
};

addCardButton.addEventListener('click', () => {
    openPopup(popupAddCard)
    closeCard.addEventListener('click', () => {
        closePopup(popupAddCard)
    });
});

editButton.addEventListener('click', () => {
    openPopup(popupProfile)
    closeProfile.addEventListener('click', () => {
        closePopup(popupProfile)
    });
});

//функция открытия картинки во весь экран
export function fullImage(link, name) {
    imageCaption.textContent = name
    image.src = link
    image.alt = name
    openPopup(popupImage)
    closeImage.addEventListener('click', () => {
        closePopup(popupImage)
    });
};