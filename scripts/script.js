//Попап + редактирование
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon-close');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const nameInput = document.querySelector(".popup__field[name='userName']");
const jobInput = document.querySelector(".popup__field[name='userJob']");
const formElement = popup.querySelector('.popup__container');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}
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

// Кнопки открытия, закрытия и передачи данных попапа с формой редактирования
editButton.addEventListener('click', () => {
    openPopup(popup);
    nameInput.focus();
    fadeIn(popup, 1000, 'flex');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    });

closeButton.addEventListener('click', () => {
    closePopup(popup);
    fadeOut(popup, 1000);
   });

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    fadeOut(popup, 1000);
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
    photosListElement.prepend(photoCard);
});
  
  
//Открытие и закрытие попапа с карточкой добавления фото 

const addPopup = document.querySelector('.add-popup');
const captionInput = document.querySelector(".popup__field[name='caption']");
const linkInput = document.querySelector(".popup__field[name='photo-link']");
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = addPopup.querySelector('.popup__icon-close');


function openAddPopup(addPopupElement) {
        addPopupElement.classList.add('popup_opened');
 }; 
    
function closeAddPopup(addPopupElement) {
        addPopupElement.classList.remove('popup_opened');
};  

addButton.addEventListener('click', () => {
        openAddPopup(addPopup);
        captionInput.focus();
        fadeIn(addPopup, 1000, 'flex');
        });
        
closeAddButton.addEventListener('click', () => {
            closeAddPopup(addPopup);
            fadeOut(addPopup, 1000);
           });       


//Добавление фото через кнопку и форму add

const addFormElement = addPopup.querySelector(".popup__container[name='add-photo']");

addFormElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const photoCard = photoCardTemplateElement.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__text').textContent = captionInput.value;
  photoCard.querySelector('.photo-card__image').src = linkInput.value;
  photosListElement.prepend(photoCard);
  closeAddPopup(popup);
  fadeOut(addPopup, 1000);
});

//Кнопка like
photoCard.querySelector('.photo-card__like').addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('photo-card__like_active');
});