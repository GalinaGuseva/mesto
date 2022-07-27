import './index.css';
import { initialCards, validationConfig } from "../scripts/utils/constants.js"
import { Card, cardConfig } from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts//components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const userData = {userName, userJob};
const formEditElement = document.querySelector('.edit-popup__container');
const formAddElement = document.querySelector(".add-popup__container[name='add-photo']");
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddPopup = document.querySelector('.profile__add-button');
const validateFormEdit = new FormValidator(validationConfig, formEditElement);
const validateFormAdd = new FormValidator(validationConfig, formAddElement);

//Создание экземпляра класса попапа с фото
const imagePopup = new PopupWithImage('.photo-popup');
 imagePopup.setEventListeners();

 function handleCardClick(link, name) {  
  link = this._link; 
  name = this._name;
     imagePopup.open(link, name);
 };

//Создание экземпляров классов карточек
const createCard = element => {
  const card = new Card(element, cardConfig, handleCardClick); 
      const cardElement = card.generateCard();

      return cardElement;      
  };  

const cardList = new Section({ 
  items: initialCards, 
  renderer: (element) => {
    const card = createCard(element);
    cardList.addItem(card);
  }
  }, '.photos__list');

cardList.renderItem();


//Создание экземпляра класса UserInfo
const profileInfo = new UserInfo(userData);

//Создание экземпляров попапов с формой

const popupWithEditForm = new PopupWithForm(
  '.edit-popup', {
   handleSubmit: (values) => {
    const inputName = values.userName;
    const inputJob = values.userJob;
     profileInfo.setUserInfo(inputName, inputJob)
   }
   });
   popupWithEditForm.setEventListeners();

const popupWitAddForm = new PopupWithForm(
  '.add-popup', {
   handleSubmit: values => {
    const captionInput = values.caption;
    const linkInput = values.link; 
    const newCard = createCard({name: captionInput, link: linkInput});
    cardList.addItem(newCard);   
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
    profileInfo.getUserInfo(); 
    validateFormEdit.clearErrors(); 
  });