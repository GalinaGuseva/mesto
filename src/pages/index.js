import "./index.css";
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts//components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  apiOptions,
  validationConfig,
  cardConfig,
  formEditElement,
  formAvatarEditElement,
  formAddElement,
  buttonEdit,
  buttonAddPopup,
  buttonAvatarEdit,
  userData,
  nameInput,
  jobInput,
} from "../scripts/utils/constants.js";

const api = new Api(apiOptions);

let userId;

//Начальная загрузка карточек и данных пользователя с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    profileInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
    cards.reverse();
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

//Создание экземпляра класса UserInfo
const profileInfo = new UserInfo(userData);

//Заполнение полей формы редактирования профиля при открытии попапа
function getProfileInfo() {
  const { inputName, inputJob } = profileInfo.getUserInfo();
  nameInput.value = inputName;
  jobInput.value = inputJob;
}

//Создание экземпляра класса попапа редактирования профиля
const popupWithEditForm = new PopupWithForm(".edit-popup", {
  handleSubmit: (userData) => {
    popupWithEditForm.renderLoading(true);
    api
      .editUserInfo(userData)
      .then((res) => {
        profileInfo.setUserInfo({ name: res.name, about: res.about });
        popupWithEditForm.close();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        popupWithEditForm.renderLoading(false);
      });
  },
});

//Создание экземпляра класса попапа редактирования аватара профиля
const popupWithAvatarForm = new PopupWithForm(".avatar-popup", {
  handleSubmit: (data) => {
    popupWithAvatarForm.renderLoading(true);
    api
      .updateAvatar(data)
      .then((res) => {
        profileInfo.setUserInfo(res);
        popupWithAvatarForm.close();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        popupWithAvatarForm.renderLoading(false);
      });
  },
});

//Создание экземпляра класса попапа с фото
const imagePopup = new PopupWithImage(".photo-popup");

//Создание экземпляра класса попапа с подтверждением удаления карточки
const popupWithConfirmForm = new PopupWithConfirm(".confirm-popup", {
  handleRemoveClick: () => {
    removeCard();
  },
});

//Создание экземпляра класса добавления карточки
const popupWitAddForm = new PopupWithForm(".add-popup", {
  handleSubmit: (data) => {
    popupWitAddForm.renderLoading(true);
    api
      .addCard(data)
      .then((res) => {
        const card = createCard(res);
        cardList.addItem(card);
        popupWitAddForm.close();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        popupWitAddForm.renderLoading(false);
      });
  },
});

//Функция создания карточки и объявление экземпляра класса Сard
const createCard = (element) => {
  const card = new Card(
    {
      element,
      userId,
      handleCardClick: (link, name) => {
        imagePopup.open(link, name);
      },
      handleDeleteClick: () => {
        popupWithConfirmForm.open();
        popupWithConfirmForm.setHandler(() => {
          api
            .deleteCard(card.getId())
            .then(() => {
              card.deleteCard();
              popupWithConfirmForm.close();
            })
            .catch((err) => console.log(`Error: ${err}`));
        });
      },
      handleLikeCard: () => {
        if (card.isLiked()) {
          api
            .removeLike(card.getId())
            .then((res) => {
              card.deleteLike();
              card.setLike(res.likes);
            })
            .catch((err) => console.log(`Error: ${err}`));
        } else {
          api
            .addLike(card._id)
            .then((res) => {
              card.addLike(card.getId());
              card.setLike(res.likes);
            })
            .catch((err) => console.log(`Error: ${err}`));
        }
      },
    },
    cardConfig
  );

  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    renderer: (element) => {
      const card = createCard(element);
      cardList.addItem(card);
    },
  },
  ".photos__list"
);

//Валидация форм
const validatorEditForm = new FormValidator(validationConfig, formEditElement);
const validatorAddForm = new FormValidator(validationConfig, formAddElement);
const validatorAvatarForm = new FormValidator(
  validationConfig,
  formAvatarEditElement
);
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorAvatarForm.enableValidation();

//Listeners
popupWithEditForm.setEventListeners();
popupWithAvatarForm.setEventListeners();
imagePopup.setEventListeners();
popupWithConfirmForm.setEventListeners();
popupWitAddForm.setEventListeners();

buttonAddPopup.addEventListener("click", (e) => {
  popupWitAddForm.open();
  validatorAddForm.resetValidation();
});

buttonEdit.addEventListener("click", (e) => {
  popupWithEditForm.open();
  getProfileInfo();
  validatorEditForm.resetValidation();
});

buttonAvatarEdit.addEventListener("click", (e) => {
  popupWithAvatarForm.open();
  validatorAvatarForm.resetValidation();
});
