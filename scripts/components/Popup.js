export default class Popup {
    constructor(popupSelector) {
           this._popupSelector = popupSelector;                                 
    }

    open() {
        this._popupSelector.classList.add('popup_opened');        
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.removeEventListener('mousedown', this._handleClosePopupToOverlayOrButton);
    } 

    _handleClosePopupToOverlayOrButton(e) {
      if(e.target.classList.contains('popup')||e.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    }
    
    _handleEscClose(e) {
      if(e.key === 'Escape') {
        this.close();
      }
    };

    setEventListeners() {
       document.addEventListener('keydown', (e) => {
         this._handleEscClose(e);
        });
       this._popupSelector.addEventListener('mousedown', (e) => {
           this._handleClosePopupToOverlayOrButton(e);         
      })
   }
}
