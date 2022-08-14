import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._inputs = this._form.querySelectorAll(".popup__field");
    this._buttonSubmit = this._form.querySelector(".popup__btn-submit");
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }
  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
