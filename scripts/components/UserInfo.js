export default class UserInfo {
    constructor(userName, userJob) {
       this._userName = userName;
       this._userJob = userJob;
      
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