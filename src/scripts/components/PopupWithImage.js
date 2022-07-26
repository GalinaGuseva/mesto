export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupSelector = document.querySelector('.photo-popup');                
        this._popupCaption = document.querySelector('.photo-popup__caption');
        this._popupImage = document.querySelector('.photo-popup__image');        
    }

    open(link, name) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name; 
        super.open();        
    }  
}

import Popup from "./Popup.js";