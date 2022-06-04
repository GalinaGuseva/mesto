//Попап + редактирование
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon-close');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const nameInput = document.querySelector(".popup__field[name='userName']");
const jobInput = document.querySelector(".popup__field[name='userJob']");
const formElement = popup.querySelector('.popup__container');

//Эффект плавного появления и закрытия попапа
const fadeIn = (el, timeout, display) => {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 200);
};

const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';
  }, timeout);
};
//Функции открытия и закрытия попапа
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    fadeIn(popupElement, 1000, 'flex');
}
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    fadeOut(popupElement, 1000);
}
// Кнопки открытия, закрытия и передачи данных попапа с формой редактирования
editButton.addEventListener('click', () => {
    openPopup(popup);
    nameInput.focus();
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    });
closeButton.addEventListener('click', () => {
    closePopup(popup);
    });

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popup);
});
// Начальное добавление карточек с фотографиями
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  const photoCardTemplateElement = document.querySelector('.photo-card-template').content; 
  const photosListElement = document.querySelector('.photos__list');

  initialCards.forEach(function (element) {
    const photoCard = photoCardTemplateElement.querySelector('.photo-card').cloneNode(true);
    photoCard.querySelector('.photo-card__text').textContent = element.name;
    photoCard.querySelector('.photo-card__image').src = element.link;
    photoCard.querySelector('.photo-card__image').alt = element.name;
  //Кнопка Лайк
    const likeButton = photoCard.querySelector('.photo-card__like'); 
      likeButton.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('photo-card__like_active');
    }); 
// Удаление карточек   
    const deleteButton = photoCard.querySelector('.photo-card__btn-delete');
    deleteButton.addEventListener('click', (e) => {
      const photosListElement = deleteButton.closest('.photo-card');
      photosListElement.remove('photo-card');
    });
    photosListElement.prepend(photoCard);
});
 //Открытие и закрытие попапа с карточкой добавления фото 
const addPopup = document.querySelector('.add-popup');
const captionInput = document.querySelector(".popup__field[name='caption']");
const linkInput = document.querySelector(".popup__field[name='photo-link']");
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = addPopup.querySelector('.popup__icon-close');

addButton.addEventListener('click', () => {
      openPopup(addPopup);
      captionInput.focus();
});      
closeAddButton.addEventListener('click', () => {
        closePopup(addPopup);
 }); 
 //Добавление фото через кнопку и попап-форму add
const addFormElement = addPopup.querySelector(".popup__container[name='add-photo']");
addFormElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const photoCard = photoCardTemplateElement.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__text').textContent = captionInput.value;
  photoCard.querySelector('.photo-card__image').src = linkInput.value;
  photoCard.querySelector('.photo-card__like').addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('photo-card__like_active');
});
  const deleteButton = photoCard.querySelector('.photo-card__btn-delete');
  deleteButton.addEventListener('click', (e) => {
  const photosListElement = deleteButton.closest('.photo-card');
  photosListElement.remove('photo-card');
});
  photosListElement.prepend(photoCard);
  closePopup(addPopup);
});
//Реализация попапа с фотографиями
const photoPopup = document.querySelector('.photo-popup');
const closePhotoPopupButton = photoPopup.querySelector('.popup__icon-close');
photoPopupImage = photoPopup.querySelector('.photo-popup__image');
photoPopupCaption = photoPopup.querySelector('.photo-popup__caption');


photosListElement.addEventListener('click', (e) => {
  //const photoCard = getPhotoCardByEvent(e);
  if (e.target.classList.contains('photo-card__image')) {
    photoPopupImage.src = e.target.src;
    const photoCard = e.target.closest('photo-card__image');
    const PhotoCardText = photoCard => photoCard.querySelector('.photo-card__text');
    photoPopupCaption.textContent = PhotoCardText.textContent; 
    openPopup(photoPopup);
};
});
closePhotoPopupButton.addEventListener('click', closePopup(photoPopup));




