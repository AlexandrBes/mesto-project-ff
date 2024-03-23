export function openPopup(event) {
    event.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', closeEsc);
};

export function closePopup(event) {
    event.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeOverlay);
    document.removeEventListener('keydown', closeEsc);
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