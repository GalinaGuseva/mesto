import { openPopup } from "./index.js";
const photoPopup = document.querySelector('.photo-popup');
const photoPopupImage = photoPopup.querySelector('.photo-popup__image');
const photoPopupCaption = photoPopup.querySelector('.photo-popup__caption');

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  };

_getTemplate() {
     const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.photo-card')
            .cloneNode(true);

     return cardElement;
  };

  _handleLikeButton = () => {
    this._element.querySelector('.photo-card__like')
    .classList.toggle('photo-card__like_active');
 };

 _handleCloseButton = () => this._element.remove();

 _createPhotoPopup = () => {
  photoPopupImage.src = this._link;
  photoPopupImage.alt = this._name;
  photoPopupCaption.textContent = this._name; 
  openPopup(photoPopup);
 };

 _setEventListeners() {
    this._element.querySelector('.photo-card__image').addEventListener('click', () => {
        this._createPhotoPopup();
    });
    this._element.querySelector('.photo-card__like').addEventListener('click', this._handleLikeButton);
    this._element.querySelector('.photo-card__btn-delete').addEventListener('click', this._handleCloseButton);
  };
 
  createCard() {
     this._element = this._getTemplate();
     this._setEventListeners();
     this._element.querySelector('.photo-card__image').src = this._link;
     this._element.querySelector('.photo-card__image').alt = this._name;
     this._element.querySelector('.photo-card__text').textContent = this._name;
     
     return this._element;
   }
  }  