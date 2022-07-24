const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_disabled',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'popup__error-message_visible'
  };

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const cardConfig = {
    cardSelector: '.photo-card-template',
    oneCardSelector: '.photo-card',
    likeButtonSelector: '.photo-card__like',
    activeLikeClass: 'photo-card__like_active',
    closeButtonSelector: '.photo-card__btn-delete',
    cardImage: '.photo-card__image',
    cardText: '.photo-card__text'
  };  

  export { validationConfig, initialCards, cardConfig  };