export default class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  //Получение ответа от сервера
   _getResponse(res) {
    if (res.ok) {
      return res.json();      
   }
      return Promise.reject(`Ошибка: ${res.status}`);
   } 

   //Загрузка карточек с сервера  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
      .then((res) => this. _getResponse(res));
      
  } 
    
   // Загрузка данных профиля с сервера
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers
      })
        .then((res) => this. _getResponse(res));
    }

    //Редактирование профиля
    editUserInfo(userData) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,      
        body: JSON.stringify({
          name: userData.userName, 
          about: userData.userJob
        })
        })
      .then((res) => this. _getResponse(res));
    }

    //Обновление аватара пользователя
      updateAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,      
          body: JSON.stringify({
            avatar: data.avatar})
      })
      .then((res) => this. _getResponse(res));
    }

   // Добавление новой карточки
     addCard(data) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,          
          body: JSON.stringify({
            name: data.caption,
            link: data.link
          })
        })
        .then((res) => this. _getResponse(res));
      }

// Другие методы
 
  }