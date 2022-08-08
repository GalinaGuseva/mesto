import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__container');        
        this._inputs = this._form.querySelectorAll('.popup__field'); 
    }
    _getInputValues() {
        const values = {};
        this._inputs.forEach(input => {
            values[input.name] = input.value;
        })
        return values;               
    }
    
    setEventListeners() {       
       this._form.addEventListener('submit', (e) => {
          e.preventDefault(); 
          this._handleSubmit(this._getInputValues());                     
          this.close();
     });
     super.setEventListeners();
    }    
}