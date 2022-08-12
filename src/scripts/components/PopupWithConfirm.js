export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, { handleRemoveClick }) {
        super(popupSelector)
        this._button = this._popup.querySelector('.popup__btn-submit');
        this._handleRemoveClick =  handleRemoveClick        
    }

    setHandler(handler) {
      this._handleRemoveClick = handler;
    }

   setEventListeners() {       
      this._button.addEventListener('click', () => {
        this._handleRemoveClick(); 
      })   
      super.setEventListeners();
     }   
 }   
   
import Popup from "./Popup.js";