  export const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_disabled',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'popup__error-message_visible'
  };

  export const cardConfig = {
    cardSelector: '.photo-card-template',
    oneCardSelector: '.photo-card',
    likeButtonSelector: '.photo-card__like',
    activeLikeClass: 'photo-card__like_active',
    deleteButtonSelector: '.photo-card__btn-delete',
    imageSelector: '.photo-card__image',
    textSelector: '.photo-card__text'     
  }; 

  export const apiOptions = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
      authorization: '3b67ac11-b29e-4182-9110-a6f8ab5d8b17',
      'Content-Type': 'application/json'   
  }
};