import { config } from "./data.js"
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
export { openPopup };

const popupEditForm = document.querySelector('.edit-popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const nameInput = document.querySelector(".edit-popup__field[name='userName']");
const jobInput = document.querySelector(".edit-popup__field[name='userJob']");
const formEditElement = popupEditForm.querySelector('.edit-popup__container');
const popupAddForm = document.querySelector('.add-popup');
const captionInput = document.querySelector(".add-popup__field[name='caption']");
const linkInput = document.querySelector(".add-popup__field[name='photo-link']");
const buttonAddPopup = document.querySelector('.profile__add-button');
const formAddElement = popupAddForm.querySelector(".add-popup__container[name='add-photo']");

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleClosePopupToEsc);
    popupElement.addEventListener('mousedown', handleClosePopupToOverlayOrButton);   
  }

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClosePopupToEsc);
    popupElement.removeEventListener('mousedown', handleClosePopupToOverlayOrButton); 
  }

const handleClosePopupToEsc = (e) => {
  if(e.key === "Escape") {
  closePopup(document.querySelector('.popup_opened'));
  }
};

const handleClosePopupToOverlayOrButton = (e) => {
  if(e.target.classList.contains('popup')||e.target.classList.contains('popup__btn-close')) {
    closePopup( e.currentTarget);
  }
}

const handleAddPhoto = () => {
  const addCard = new Card({name: captionInput.value, link: linkInput.value},'.photo-card-template');
  const cardElement = addCard.createCard();
  document.querySelector('.photos__list').prepend(cardElement);
  closePopup(popupAddForm);
  formAddElement.reset();
}; 
 
const handleOpenEditForm = () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;  
};

const handleCloseEditForm = () => {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEditForm);
}; 

//Listeners
buttonAddPopup.addEventListener('click', (e) => {
  openPopup(popupAddForm);
  formAddElement.reset();
  validateFormAdd.clearErrors();
});

formAddElement.addEventListener('submit', (e) => {
  e.preventDefault();
  handleAddPhoto();  
});

buttonEdit.addEventListener('click', (e) => {
  openPopup(popupEditForm);
  handleOpenEditForm(); 
  validateFormEdit.clearErrors(); 
});
 
formEditElement.addEventListener('submit', (e) => {
  e.preventDefault();
  handleCloseEditForm();
});

//Вызов валидатора
const validateFormEdit = new FormValidator(config, formEditElement);
validateFormEdit.enableValidation();

const validateFormAdd = new FormValidator(config, formAddElement);
validateFormAdd.enableValidation();