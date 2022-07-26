import { cardConfig } from "../utils/constants.js";

export default class Card {
  constructor(element, cardSelector, handleCardClick) {
    this._name = element.name;
    this._link = element.link;
    this._cardConfig = cardConfig;
    this._cardSelector = cardSelector; 
    this._handleCardClick = handleCardClick;     
  };

_getTemplate() {
     const cardElement = document
            .querySelector(this._cardConfig.cardSelector)
            .content
            .querySelector(this._cardConfig.oneCardSelector)
            .cloneNode(true);

     return cardElement;
  };

  _handleLikeButton = () => {
    this._element.querySelector(this._cardConfig.likeButtonSelector)
    .classList.toggle(this._cardConfig.activeLikeClass);
 };

 _handleCloseButton = () => this._element.remove(); 
 
  _setEventListeners() {
    this._element.querySelector(this._cardConfig.cardImage)
    .addEventListener('click', () => this._handleCardClick());
    this._element.querySelector(this._cardConfig.likeButtonSelector)
    .addEventListener('click', this._handleLikeButton);
    this._element.querySelector(this._cardConfig.closeButtonSelector)
    .addEventListener('click', this._handleCloseButton);
  };
 
  generateCard() {
     this._element = this._getTemplate();
     this._setEventListeners();
     this._element.querySelector(this._cardConfig.cardImage).src = this._link;
     this._element.querySelector(this._cardConfig.cardImage).alt = this._name;
     this._element.querySelector(this._cardConfig.cardText).textContent = this._name;
     
     return this._element;
   }
  }  