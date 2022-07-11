import { validationConfig, initialCards, cardConfig } from "./utils/constants.js"
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
const photosList = document.querySelector('.photos__list');
const validateFormEdit = new FormValidator(validationConfig, formEditElement);
const validateFormAdd = new FormValidator(validationConfig, formAddElement);

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
};

//Создание экземпляров классов карточек

const renderCard = element => {
  const card = new Card(element, cardConfig.cardSelector); 
  const cardElement = card.createCard();
  photosList.prepend(cardElement);
}  

initialCards.forEach(renderCard);   

const handleAddPhoto = () => {
  renderCard({name: captionInput.value, link: linkInput.value});
  closePopup(popupAddForm);
  formAddElement.reset();
}; 

//Открытие и закрытие формы редактирования профиля
 
const handleOpenEditForm = () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;  
};

const handleCloseEditForm = () => {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEditForm);
}; 

//Вызов валидатора

validateFormEdit.enableValidation();
validateFormAdd.enableValidation();

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

