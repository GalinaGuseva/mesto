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

formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    fadeOut(popup, 1000);
    closePopup(popup);
});