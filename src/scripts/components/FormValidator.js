
   
   export default class FormValidator {
      constructor(validationConfig, formElement) {
      this._validationConfig = validationConfig;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
      this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

  _showInputError(inputElement) { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationConfig.errorClass);
  }

  clearErrors() {
     this._inputList.forEach((inputElement) => {   
     this._hideInputError(inputElement); 
   }); 
     this._toggleButtonState()
  }
   
   _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
     this._buttonElement.removeAttribute('disabled', true);
    };
  } 

  _checkInputValidity(inputElement) { 
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  }

  _setEventListeners() {    
      this._inputList.forEach(inputElement => {
           inputElement.addEventListener('input', () => {
           this._checkInputValidity(inputElement);
           this._toggleButtonState();
      });
    });
        this._toggleButtonState(); 
  }

   enableValidation() {
      this._setEventListeners();
  }
}   