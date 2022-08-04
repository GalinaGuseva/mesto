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
        method: 'PATCH',
        headers: this._headers,      
        body: JSON.stringify({
           name: 'Баба Яга',
           about: 'Гроза морей'
        })
      })
      .then((res) => this. _getResponse(res));
    }

    
// Другие методы
 
  }