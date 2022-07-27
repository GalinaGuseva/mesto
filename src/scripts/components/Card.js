export const cardConfig = {
  cardSelector: '.photo-card-template',
  oneCardSelector: '.photo-card',
  likeButtonSelector: '.photo-card__like',
  activeLikeClass: 'photo-card__like_active',
  deleteButtonSelector: '.photo-card__btn-delete',
  imageSelector: '.photo-card__image',
  textSelector: '.photo-card__text'     
}; 

export class Card {
  constructor(element, cardConfig, handleCardClick) {
    this._cardConfig = cardConfig;
    this._name = element.name;
    this._link = element.link;       
    this._handleCardClick = handleCardClick     
  };  

_getTemplate() {  
     const cardElement = document.querySelector(this._cardConfig.cardSelector)
        .content
        .querySelector(this._cardConfig.oneCardSelector)
        .cloneNode(true);
      return cardElement;
  };

  _handleLikeButton = () => {
    this._element.querySelector(this._cardConfig.likeButtonSelector)
    .classList.toggle(this._cardConfig.activeLikeClass);
 };

 _handleDeleteButton = () => this._element.remove(); 
 
  _setEventListeners() {
    this._element.querySelector(this._cardConfig.imageSelector)
    .addEventListener('click', () => this._handleCardClick());
    this._element.querySelector(this._cardConfig.likeButtonSelector)
    .addEventListener('click', this._handleLikeButton);
    this._element.querySelector(this._cardConfig.deleteButtonSelector)
    .addEventListener('click', this._handleDeleteButton);
  };
 
  generateCard() {
     this._element = this._getTemplate();     
     this._text = this._element.querySelector(this._cardConfig.textSelector);  
     this._setEventListeners();
     this._element.querySelector(this._cardConfig.imageSelector).src = this._link;
     this._text.alt = this._name;
     this._text.textContent = this._name;
     
     return this._element;
   }
  } 