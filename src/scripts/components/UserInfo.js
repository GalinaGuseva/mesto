export default class UserInfo {
    constructor(userInfo) {
       this._userInfo = userInfo;
       this._userName = userInfo.userName;
       this._userJob = userInfo.userJob;
      
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
