export default class UserInfo {
    constructor(userData) {
       this._userData = userData;
       this._userName = document.querySelector(userData.userNameSelector);
       this._userJob = document.querySelector(userData.userJobSelector)      
    }

    getUserInfo() {
    this._userInfo = {
        inputName: this._userName.textContent,
        inputJob: this._userJob.textContent
    }
    return this._userInfo;
    }

    setUserInfo(inputName, inputJob) {
        this._userName.textContent = inputName,
        this._userJob.textContent = inputJob
    }
}
