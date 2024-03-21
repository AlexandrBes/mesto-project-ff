export const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupProfile = document.querySelector('.popup_type_edit');
export const editButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const closeCard = popupAddCard.querySelector('.popup__close');
export const closeProfile = popupProfile.querySelector('.popup__close')

export function openPopup(event) {
    event.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', closeEsc);
};

export function closePopup(event) {
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
