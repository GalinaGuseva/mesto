export default class Card {
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
    this._likeButton.classList.toggle(this._cardConfig.activeLikeClass);
 };

 _handleDeleteButton = () => {
     this._element.remove();
     this._element = null;
 }; 
 
  _setEventListeners() {
    this._element.querySelector(this._cardConfig.imageSelector)
    .addEventListener('click', () => this._handleCardClick(this._link, this._name));
    this._likeButton = this._element.querySelector(this._cardConfig.likeButtonSelector);
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._element.querySelector(this._cardConfig.deleteButtonSelector)
    .addEventListener('click', this._handleDeleteButton);
  };
 
  generateCard() {
     this._element = this._getTemplate();     
     this._image = this._element.querySelector(this._cardConfig.imageSelector);  
     this._setEventListeners();
     this._image.src = this._link;
     this._image.alt = this._name;
     this._element.querySelector(this._cardConfig.textSelector).textContent = this._name;
     
     return this._element;
   }
  } 