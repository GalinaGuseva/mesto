export default class UserInfo {
  constructor(userData) {
    this._userData = userData;
    this._userName = document.querySelector(userData.userNameSelector);
    this._userJob = document.querySelector(userData.userJobSelector);
    this._userAvatar = document.querySelector(userData.userAvatarSelector);
  }

  // Метод возвращает объект с информацией о пользователе со страницы
  getUserInfo() {
    this._userInfo = {
      inputName: this._userName.textContent,
      inputJob: this._userJob.textContent,
      inputAvatar: this._userAvatar.src,
    };
    return this._userInfo;
  }

  // Метод берет нужные данные из массива данных и выводит на страницу
  setUserInfo({ name, about, _id, avatar }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._id = _id;
    if (avatar) this._userAvatar.src = avatar;
  }
}
