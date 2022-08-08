import './index.css';
import Api from "../scripts/components/Api.js";
import { validationConfig, cardConfig, apiOptions } from "../scripts/utils/constants.js"
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
const buttonAvatarEdit = document.querySelector('.profile__edit-avatar-button');
const validatorEditForm = new FormValidator(validationConfig, formEditElement);
const validatorAddForm = new FormValidator(validationConfig, formAddElement);
const validatorAvatarForm = new FormValidator(validationConfig, formAvatarEditElement);

//Вызов валидаторов

validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorAvatarForm.enableValidation();

const api = new Api(apiOptions);

let userId;
//Начальная загрузка карточек и данных пользователя с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      userId = user._id;
      profileInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar });  
      cardList.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    })
   //Работа с данными пользователя
const profileInfo = new UserInfo(userData);

const popupWithEditForm = new PopupWithForm('.edit-popup', {
    handleSubmit: (userData) => {             
      api.editUserInfo(userData)
        .then((res) => {
           profileInfo.setUserInfo({ name: res.name, about: res.about });
        })
        .catch(err => console.log(`Error: ${err}`))     
      }
  });
popupWithEditForm.setEventListeners();

const popupWithAvatarForm = new PopupWithForm('.avatar-popup', {
      handleSubmit: (data) => {
         api.updateAvatar(data)
          .then((res) => {
            profileInfo.setUserAvatar({ avatar: res.avatar });
            })          
          .catch(err => console.log(`Error: ${err}`))     
       }
   });
 popupWithAvatarForm.setEventListeners();     

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

const popupWitAddForm = new PopupWithForm('.add-popup', {
   handleSubmit: (data) => {
    api.addCard(data)
    .then((res) => {
    const card = createCard(res);
    cardList.addItem(card);
    popupWitAddForm.close();
   })
   .catch((err) => {
    console.log(err);
})
}
});
popupWitAddForm.setEventListeners();

//Listeners

buttonAddPopup.addEventListener('click', (e) => {
    popupWitAddForm.open();
    formAddElement.reset();
    validatorAddForm.clearErrors();
  });

buttonEdit.addEventListener('click', (e) => {
    popupWithEditForm.open();
    profileInfo.getUserInfo(); 
    validatorEditForm.clearErrors(); 
  });

  buttonAvatarEdit.addEventListener('click', (e) => {
    popupWithAvatarForm.open();
    validatorAvatarForm.clearErrors(); 
});