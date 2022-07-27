export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCaption = this._popup.querySelector('.photo-popup__caption'); 
        this._popupImage = this._popup.querySelector('.photo-popup__image');            
    }

    open(link, name) {
          
        this._popupImage.src = link;
        this._popupCaption.alt = name;
        this._popupCaption.textContent = name; 
        super.open();        
    }  
}

import Popup from "./Popup.js";