const popupEditForm = document.querySelector('.edit-popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonCloseEditForm = document.querySelector('.edit-popup__icon-close');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const nameInput = document.querySelector(".edit-popup__field[name='userName']");
const jobInput = document.querySelector(".edit-popup__field[name='userJob']");
const formEditElement = popupEditForm.querySelector('.edit-popup__container');
const cardTemplateElement = document.querySelector('.photo-card-template').content;
const photosListElement = document.querySelector('.photos__list');
const photoPopup = document.querySelector('.photo-popup');
const photoPopupImage = photoPopup.querySelector('.photo-popup__image');
const buttonClosePhotoPopup = photoPopup.querySelector('.photo-popup__close');
const popupAddForm = document.querySelector('.add-popup');
const captionInput = document.querySelector(".add-popup__field[name='caption']");
const linkInput = document.querySelector(".add-popup__field[name='photo-link']");
const buttonAddPopup = document.querySelector('.profile__add-button');
const buttonCloseAddPopup = document.querySelector('.add-popup__icon-close');
const formAddElement = popupAddForm.querySelector(".add-popup__container[name='add-photo']");

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
  }

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
  }
  
  const createPhotoPopup = element => {
    photoPopupImage.src = element.link;
    photoPopupImage.alt = element.name;
    photoPopup.querySelector('.photo-popup__caption').textContent = element.name; 
  };
  
 const createCard = element => {
  const card = cardTemplateElement.querySelector('.photo-card').cloneNode(true);
  const cardImage = card.querySelector('.photo-card__image');
  const cardText = card.querySelector('.photo-card__text');
  const buttonLike = card.querySelector('.photo-card__like');
  const buttonDelete = card.querySelector('.photo-card__btn-delete');
  cardText.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardImage.addEventListener('click', (e) => {
    createPhotoPopup(element);
    openPopup(photoPopup);
 });
  buttonLike.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('photo-card__like_active');
});
   buttonDelete.addEventListener('click', (e) => {
    const photosListElement = buttonDelete.closest('.photo-card');
    photosListElement.remove('photo-card');
});
   photosListElement.prepend(card);
   return card;  
 }
 
 initialCards.forEach(createCard);
 
 buttonAddPopup.addEventListener('click', (e) => {
    openPopup(popupAddForm);
  });

formAddElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs = [{name: captionInput.value, link: linkInput.value}];
  inputs.forEach(createCard);
  closePopup(popupAddForm);
  e.stopPropagation();
  captionInput.value = '';
  linkInput.value = '';
 });

buttonCloseAddPopup.addEventListener('click', (e) => {
  closePopup(popupAddForm);
}); 

  buttonEdit.addEventListener('click', (e) => {
  openPopup(popupEditForm);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  });
 
formEditElement.addEventListener('submit', (e) => {
  e.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEditForm);
});

buttonCloseEditForm.addEventListener('click', (e) => {
  closePopup(popupEditForm);
});

buttonClosePhotoPopup.addEventListener('click', (e) => {
  closePopup(photoPopup);
});