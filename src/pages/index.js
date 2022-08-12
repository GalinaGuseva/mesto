import './index.css';
import Api from "../scripts/components/Api.js";
import { validationConfig, cardConfig, apiOptions } from "../scripts/utils/constants.js"
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts//components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm";
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

const api = new Api(apiOptions);

let userId;

//Начальная загрузка карточек и данных пользователя с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      userId = user._id;         
      profileInfo.setUserInfo({ name: user.name, about: user.about });
      profileInfo.setUserAvatar({ avatar: user.avatar });
      cards.reverse();
      cardList.renderItems(cards);
    })
    .catch((err) => console.log(err))

//Создание экземпляра класса UserInfo
const profileInfo = new UserInfo(userData);

//Создание экземпляра класса попапа редактирования профиля
const popupWithEditForm = new PopupWithForm('.edit-popup', {
    handleSubmit: (userData) => {             
      api.editUserInfo(userData)
        .then((res) => {
           profileInfo.setUserInfo({ name: res.name, about: res.about });
        })
        .catch(err => console.log(`Error: ${err}`))     
      }
  });

//Создание экземпляра класса попапа редактирования аватара профиля
const popupWithAvatarForm = new PopupWithForm('.avatar-popup', {
      handleSubmit: (data) => {
         api.updateAvatar(data)
          .then((res) => {
            profileInfo.setUserAvatar({ avatar: res.avatar });
            })          
          .catch(err => console.log(`Error: ${err}`))     
       }
   });   

//Создание экземпляра класса попапа с фото
const imagePopup = new PopupWithImage('.photo-popup'); 

//Создание экземпляра класса попапа с подтверждением удаления карточки 
const popupWithConfirmForm = new PopupWithConfirm('.confirm-popup', {
    handleRemoveClick: () => {
      removeCard()
}
});

//Создание экземпляра класса добавления карточки
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

//Функция создания карточки и объявление экземпляра класса Сard
const createCard = element => {
  const card = new Card({ element, userId, 
    handleCardClick: (link, name) =>{
      imagePopup.open(link, name);
    }, 
    handleDeleteClick: () => {
       popupWithConfirmForm.open();
       popupWithConfirmForm.setHandler(() => {
        api. deleteCard(card.getId())
        .then(() => {
          card.deleteCard();
          popupWithConfirmForm.close(); 
        })
        .catch(err => console.log(`Error: ${err}`)) 
       })                  
    },        
    handleLikeCard: () => {
      if (card.isLiked()) {
        api.removeLike(card.getId())
          .then((res) => {
            card.deleteLike();
            card.setLike(res.likes);
          })
              .catch(err => console.log(`Error: ${err}`))
      } else {
          api.addLike(card._id)
              .then((res) => {
                  card.addLike(card.getId());
                  card.setLike(res.likes);
              })
              .catch(err => console.log(`Error: ${err}`)) 
            }
     }
  }, cardConfig);

    const cardElement = card.generateCard();
    return cardElement;      
  };  

const cardList = new Section({ 
     renderer: (element) => {
      const card = createCard(element);
      cardList.addItem(card);
    }
    }, '.photos__list');   



//Валидация форм
const validatorEditForm = new FormValidator(validationConfig, formEditElement);
const validatorAddForm = new FormValidator(validationConfig, formAddElement);
const validatorAvatarForm = new FormValidator(validationConfig, formAvatarEditElement);
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorAvatarForm.enableValidation();


//Listeners
popupWithEditForm.setEventListeners();
popupWithAvatarForm.setEventListeners(); 
imagePopup.setEventListeners();
popupWithConfirmForm.setEventListeners();
popupWitAddForm.setEventListeners();

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