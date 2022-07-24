import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleSubmit}) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._handleSubmit = handleSubmit;        
        this._formSelector = this._popupSelector.querySelector('.popup__container');
        this._inputs = this._formSelector.querySelectorAll('.popup__field'); 
    }
    _getInputValues() {
        const values = {};
        this._inputs.forEach(input => {
            values[input.name] = input.value;
        } )
        return values;       
    }

    _close() {
        this._formSelector.reset();
       super.close();
    }
   
    setEventListeners () {       
       this._formSelector.addEventListener('submit', (e) => {
          e.preventDefault(); 
          this._handleSubmit(this._getInputValues());                     
          this.close();
     });
     super.setEventListeners();
    }    
}