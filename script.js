const popup = document.querySelector('.popup')
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__icon-close')
const userName = document.querySelector('.profile__name')
const userJob = document.querySelector('.profile__job')
const nameInput = document.querySelector('.popup__field_name')
const jobInput = document.querySelector('.popup__field_job')
const POPUP_OPENED_CLASSNAME = 'popup_opened'
const formElement = popup.querySelector('.popup__form')

function openPopup (popupElement) {
    popupElement.classList.add(POPUP_OPENED_CLASSNAME)
}

function closePopup(popupElement) {
    popupElement.classList.remove(POPUP_OPENED_CLASSNAME)
}  

editButton.addEventListener('click', function() {
    openPopup(popup)
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    })

closeButton.addEventListener('click', function (evt) {
    closePopup(popup)
    evt.preventDefault()
})

formElement.addEventListener('submit', function(evt) {
    evt.preventDefault()
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popup)
})