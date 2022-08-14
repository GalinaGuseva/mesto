export default class Card {
  constructor(
    { element, userId, handleCardClick, handleDeleteClick, handleLikeCard },
    cardConfig
  ) {
    this._cardConfig = cardConfig;
    this._name = element.name;
    this._link = element.link;
    this._userId = userId;
    this._id = element._id;
    this._ownerId = element.owner._id;
    this._likes = element.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
  }
  // Сохраняем id карточки
  getId() {
    return this._id;
  }

  // Метод возвращает шаблон карточки из DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardConfig.cardSelector)
      .content.querySelector(this._cardConfig.oneCardSelector)
      .cloneNode(true);
    return cardElement;
  }

  // Сохранение числа лайков
  setLike(count) {
    this._likes = count;
    this._likesCount.textContent = this._likes.length;
  }

  // Добавление лайка
  addLike = () => {
    this._likeButton.classList.add(this._cardConfig.activeLikeClass);
  };

  // Удаление лайка
  deleteLike = () => {
    this._likeButton.classList.remove(this._cardConfig.activeLikeClass);
  };

  // Проверка, есть ли в массиве лайков карточки лайк пользователя страницы
  isLiked() {
    return this._likes.find((user) => user._id === this._userId);
  }

  // Добавление или удаление лайка после проверки
  _checkOwnLike() {
    this.isLiked() ? this.addLike() : this.deleteLike();
  }

  // Удаление кнопки удаления на чужих карточках
  _removeDeleteButton() {
    if (this._ownerId != this._userId) {
      this._deleteButton.remove();
    }
  }

  // Удаление карточки из DOM
  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  // Установка слушателей на элементы карточки
  _setEventListeners() {
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
    this._likeButton.addEventListener("click", () => this._handleLikeCard());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
  }

  // Метод генерирует и возвращает карточку
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(this._cardConfig.textSelector).textContent =
      this._name;
    this._image = this._element.querySelector(this._cardConfig.imageSelector);
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likesCount = this._element.querySelector(
      this._cardConfig.likeCountSelector
    );
    this._likeButton = this._element.querySelector(
      this._cardConfig.likeButtonSelector
    );
    this._deleteButton = this._element.querySelector(
      this._cardConfig.deleteButtonSelector
    );

    this.setLike(this._likes);
    this._checkOwnLike();
    this._removeDeleteButton();

    this._setEventListeners();

    return this._element;
  }
}
