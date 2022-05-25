const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon-close');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__field_input_name');
const jobInput = document.querySelector('.popup__field_input_job');
const formElement = popup.querySelector('.popup__form');

function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

editButton.addEventListener('click', function() {
    togglePopup(popup);
    nameInput.focus();
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    });

closeButton.addEventListener('click', function (evt) {
    togglePopup(popup);
   });

formElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    togglePopup(popup);
});