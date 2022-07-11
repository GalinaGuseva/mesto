import { openPopup } from "./index.js";
import { cardConfig, photoPopup, photoPopupImage, photoPopupCaption } from "./utils/constants.js";

function createPhotoPopup(name, link) {
  photoPopupImage.src = link;
  photoPopupImage.alt = name;
  photoPopupCaption.textContent = name; 
  openPopup(photoPopup);
};

export class Card {
  constructor(element, cardSelector) {
    this._name = element.name;
    this._link = element.link;
    this._cardConfig = cardConfig;
    this._cardSelector = cardSelector;
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
    this._element.querySelector(this._cardConfig.cardImage).addEventListener('click', (e) => {
      createPhotoPopup(this._name, this._link)
    });    
    this._element.querySelector(this._cardConfig.likeButtonSelector).addEventListener('click', this._handleLikeButton);
    this._element.querySelector(this._cardConfig.closeButtonSelector).addEventListener('click', this._handleCloseButton);
  };
 
  createCard() {
     this._element = this._getTemplate();
     this._setEventListeners();
     this._element.querySelector(this._cardConfig.cardImage).src = this._link;
     this._element.querySelector(this._cardConfig.cardImage).alt = this._name;
     this._element.querySelector(this._cardConfig.cardText).textContent = this._name;
     
     return this._element;
   }
  }  