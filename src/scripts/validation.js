const showInputError = (customValidation, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(customValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(customValidation.errorClass);
};

const hideInputError = (customValidation, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(customValidation.inputErrorClass);
    errorElement.classList.remove(customValidation.errorClass);
    errorElement.textContent = '';
};

const isValid = (customValidation, formElement, inputElement) => {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    };

    if (!inputElement.validity.valid) {
        showInputError(customValidation, formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(customValidation, formElement, inputElement);
      };
}; 

const setEventListeners = (customValidation, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(customValidation.inputSelector));
  const buttonElement = formElement.querySelector(customValidation.submitButtonSelector);

  toggleButtonState(customValidation, inputList, buttonElement);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(customValidation, formElement, inputElement);
        toggleButtonState(customValidation, inputList, buttonElement);
      });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}; 

const toggleButtonState = (customValidation, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(customValidation.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(customValidation.inactiveButtonClass);
    buttonElement.disabled = false;
  };
};

export const enableValidation = (customValidation) => {
    const formList = Array.from(document.querySelectorAll(customValidation.formSelector));

      formList.forEach((formElement) => {
        setEventListeners(customValidation, formElement);
      });
};

export const clearValidation = (formElement, customValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(customValidation.inputSelector));
  const buttonElement = formElement.querySelector(customValidation.submitButtonSelector);

  inputList.forEach((inputElement) => {
      toggleButtonState(customValidation, inputList, buttonElement);
      hideInputError(customValidation, formElement, inputElement);
    });
};