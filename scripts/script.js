const popupEditForm = document.querySelector('.edit-popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const nameInput = document.querySelector(".edit-popup__field[name='userName']");
const jobInput = document.querySelector(".edit-popup__field[name='userJob']");
const formEditElement = popupEditForm.querySelector('.edit-popup__container');
const cardTemplateElement = document.querySelector('.photo-card-template').content;
const photosListElement = document.querySelector('.photos__list');
const photoPopup = document.querySelector('.photo-popup');
const photoPopupImage = photoPopup.querySelector('.photo-popup__image');
const photoPopupCaption = photoPopup.querySelector('.photo-popup__caption');
const popupAddForm = document.querySelector('.add-popup');
const captionInput = document.querySelector(".add-popup__field[name='caption']");
const linkInput = document.querySelector(".add-popup__field[name='photo-link']");
const buttonAddPopup = document.querySelector('.profile__add-button');
const formAddElement = popupAddForm.querySelector(".add-popup__container[name='add-photo']");
const buttonSubmitAddPopup = formAddElement.querySelector('.popup__btn-submit');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleClosePopupToEsc);
    popupElement.addEventListener('mousedown', handleClosePopupToOverlayOrButton);   
  }

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    clearErrorsByClosePopup(popupElement);
    document.removeEventListener('keydown', handleClosePopupToEsc);
    popupElement.removeEventListener('mousedown', handleClosePopupToOverlayOrButton); 
  }

const handleButtonLike = (e) => e.target.classList.toggle('photo-card__like_active');
const handleButtonDelete = (e) => e.target.closest('.photo-card').remove(); 
 
const handleClosePopupToEsc = (e) => {
  if(e.key === "Escape") {
  closePopup(document.querySelector('.popup_opened'));
  }
};

const handleClosePopupToOverlayOrButton = (e) => {
  if(e.target.classList.contains('popup')||e.target.classList.contains('popup__btn-close')) {
    closePopup( e.currentTarget);
  }
}

const createPhotoPopup = element => {
    photoPopupImage.src = element.link;
    photoPopupImage.alt = element.name;
    photoPopupCaption.textContent = element.name; 
    openPopup(photoPopup);
  };
  
 const createCard = element => {
  const card = cardTemplateElement.querySelector('.photo-card').cloneNode(true);
  const cardImage = card.querySelector('.photo-card__image');
  const cardText = card.querySelector('.photo-card__text');
  cardText.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardImage.addEventListener('click', () => createPhotoPopup(element));   
  card.querySelector('.photo-card__like').addEventListener('click', handleButtonLike);
  card.querySelector('.photo-card__btn-delete').addEventListener('click', handleButtonDelete);
    return card;  
 };

 const renderCard = element => {
  card = createCard(element);
  photosListElement.prepend(card);
  };
 
 initialCards.forEach(renderCard);

const handleAddPhoto = () => {
  renderCard({name: captionInput.value, link: linkInput.value});
  closePopup(popupAddForm);
  formAddElement.reset();
}; 
 
const handleOpenEditForm = () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent; 
};

const handleCloseEditForm = () => {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEditForm);
};

const handleClearAddPopupForm = () => {
  captionInput.value = '';
  linkInput.value = '';   
 };

 const clearErrorsByClosePopup = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {  
      hideInputError(popupElement, inputElement, config);
  });
};

  //Listeners

buttonAddPopup.addEventListener('click', (e) => {
  openPopup(popupAddForm);
  handleClearAddPopupForm();
  buttonSubmitAddPopup.classList.add('popup__btn-submit_disabled');
  buttonSubmitAddPopup.setAttribute('disabled', true);
});

formAddElement.addEventListener('submit', (e) => {
  e.preventDefault();
  handleAddPhoto();  
});

buttonEdit.addEventListener('click', (e) => {
  openPopup(popupEditForm);
  handleOpenEditForm();  
});
 
formEditElement.addEventListener('submit', (e) => {
  e.preventDefault();
  handleCloseEditForm();
});