const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error-message_visible'
};

function clearErrors(formElement, config) {
  const {inputSelector, submitButtonSelector} = config;
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); 
  const buttonElement = formElement.querySelector(config.submitButtonSelector);   
  inputList.forEach((inputElement) => {   
      hideInputError(formElement, inputElement, config); 
  }); 
  toggleButtonState(inputList, buttonElement, config)
}; 

  const showInputError = (formElement, inputElement, errorMessage, config)  => {
  const {inputErrorClass, errorClass} = config;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const {inputErrorClass, errorClass} = config;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};

 const checkInputValidity = (formElement, inputElement, config) => { 
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const toggleButtonState = (inputList, buttonElement, config) => {
  const {inactiveButtonClass, ...restConfig} = config;
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
   buttonElement.removeAttribute('disabled', true);
  }
}; 

const setEventListeners = (formElement, config) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);  
  toggleButtonState(inputList, buttonElement, restConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
     checkInputValidity(formElement, inputElement, restConfig);
     toggleButtonState(inputList, buttonElement, restConfig);
  });
});
};

const enableValidation = (config) => {
  const { formSelector, ...restConfig} = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
})
};

enableValidation(config);