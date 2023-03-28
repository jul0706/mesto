export class UserInfo {
    constructor({nameElement, jobElement, avatarElement}) {
        this._userNameElement = document.querySelector(nameElement);
        this._userJobElement = document.querySelector(jobElement);
        this._userAvatarElement = document.querySelector(avatarElement);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo () {
        this.userFromPage = {
            name: this._userNameElement.textContent,
            about: this._userJobElement.textContent,
        };
        return this.userFromPage;
    }

    setUserInfo (data) { //получение данных пользователя
        this._userNameElement.textContent=data.name; 
        this._userJobElement.textContent=data.about; 
        this._userAvatarElement.src = data.avatar;
        this.userId = data._id; //сохранили ID текущего пользователя
    }

    editUserInfo (data) {  //изменение информации о пользователе
        this._userNameElement.textContent=data.name; 
        this._userJobElement.textContent=data.about; 
    }

    editAvatar (data) { //изменение аватара пользователя
        this._userAvatarElement.src = data.avatar;
    }
}