import { validationConfig, initialCards, cardConfig } from "./utils/constants.js"
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const popupEditForm = document.querySelector('.edit-popup');
const popupAddForm = document.querySelector('.add-popup');
const formEditElement = popupEditForm.querySelector('.edit-popup__container');
const formAddElement = popupAddForm.querySelector(".add-popup__container[name='add-photo']");
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddPopup = document.querySelector('.profile__add-button');
const validateFormEdit = new FormValidator(validationConfig, formEditElement);
const validateFormAdd = new FormValidator(validationConfig, formAddElement);

//Создание экземпляров классов попапов
const imagePopup = new PopupWithImage('.photo-popup');
 imagePopup.setEventListeners();

 function handleCardClick(link, name) {  
  link = this._link; 
  name = this._name;
     imagePopup.open(link, name);
 };

//Создание экземпляров классов карточек
const createCard = element => {
  const card = new Card(element, cardConfig.cardSelector, handleCardClick); 
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
};

const cardList = new Section({ 
items: initialCards, 
  renderer: (element) => createCard(element)}, '.photos__list');

cardList.renderItem();

//Создание экземпляра класса UserInfo
const userInfo = new UserInfo(userName, userJob);

//Создание экземпляров попапов с формой

const popupWithEditForm = new PopupWithForm(
   popupEditForm, {
   handleSubmit: (values) => {
    const inputName = values.userName;
    const inputJob = values.userJob;
     userInfo.setUserInfo(inputName, inputJob)
   }
   });
   popupWithEditForm.setEventListeners();

const popupWitAddForm = new PopupWithForm(
  popupAddForm, {
   handleSubmit: values => {
    const captionInput = values.caption;
    const linkInput = values.link;     
   createCard({name: captionInput, link: linkInput});
   }
  }); 
  popupWitAddForm.setEventListeners();

//Вызов валидатора

validateFormEdit.enableValidation();
validateFormAdd.enableValidation();

//Listeners

buttonAddPopup.addEventListener('click', (e) => {
    popupWitAddForm.open();
    formAddElement.reset();
    validateFormAdd.clearErrors();
  });

buttonEdit.addEventListener('click', (e) => {
    popupWithEditForm.open();
    userInfo.getUserInfo(); 
    validateFormEdit.clearErrors(); 
  });