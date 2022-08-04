export default class UserInfo {
    constructor(userData) {
       this._userData = userData;
       this._userName = document.querySelector(userData.userNameSelector);
       this._userJob = document.querySelector(userData.userJobSelector)
       this._avatar = document.querySelector(userData.userAvatarSelector);      
    }

    getUserInfo() {
    this._userInfo = {
        inputName: this._userName.textContent,
        inputJob: this._userJob.textContent
    }
    return this._userInfo;
    }

    setUserInfo(user) {
        this._userName.textContent = user.name,
        this._userJob.textContent = user.about
    }

    setUserAvatar(user) {
        this._avatar.src = user.avatar;
        this._avatar.alt = user.name;
    }
}
