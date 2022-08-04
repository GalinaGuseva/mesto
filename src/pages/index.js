import './index.css';
import Api from "../scripts/components/Api.js";
import { initialCards, validationConfig, cardConfig, apiOptions } from "../scripts/utils/constants.js"
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts//components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
const userNameSelector = '.profile__name'; 
const userJobSelector = '.profile__job';
const userAvatarSelector = '.profile__image';
const userData = {userNameSelector, userJobSelector, userAvatarSelector};
const formEditElement = document.querySelector('.edit-popup__container');
const formAvatarEditElement = document.querySelector('.avatar-popup__container');
const formAddElement = document.querySelector(".add-popup__container[name='add-photo']");
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddPopup = document.querySelector('.profile__add-button');
const validatorEditForm = new FormValidator(validationConfig, formEditElement);
const validatorAddForm = new FormValidator(validationConfig, formAddElement);
const validatorAvatarForm = new FormValidator(validationConfig, formAvatarEditElement);

//Вызов валидаторов

validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorAvatarForm.enableValidation();

const api = new Api(apiOptions);

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      userId = user._id;
      console.log([user, cards]);
      profileInfo.setUserInfo(user);
      profileInfo.setUserAvatar(user);
      
      cardList.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    })


//Создание экземпляра класса попапа с фото
const imagePopup = new PopupWithImage('.photo-popup');
 imagePopup.setEventListeners();

 function handleCardClick(link, name) {  
       imagePopup.open(link, name);
 };

//Создание экземпляров классов карточек
const createCard = element => {
  const card = new Card({ name: element.name, link: element.link, userId: element.userId }, userId, cardConfig, handleCardClick);
       
      const cardElement = card.generateCard();

      return cardElement;      
  };  

  const cardList = new Section({ 
     renderer: (element) => {
      const card = createCard(element);
      cardList.addItem(card);
    }
    }, '.photos__list');
  

//Создание экземпляра класса UserInfo
const profileInfo = new UserInfo(userData);

//Создание экземпляров попапов с формой

const popupWithEditForm = new PopupWithForm(
  '.edit-popup', {
   handleSubmit: (values) => {
    const inputName = values.userName;
    const inputJob = values.userJob;
     profileInfo.setUserInfo({inputName, inputJob})
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