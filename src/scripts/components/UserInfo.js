export class UserInfo {
    constructor({nameElement, jobElement}) {
        this._userNameElement = document.querySelector(nameElement);
        this._userJobElement = document.querySelector(jobElement);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo () {
        this.userFromPage = {
            name: this._userNameElement.textContent,
            about: this._userJobElement.textContent,
        };
        return this.userFromPage;
    }

    setUserInfo (data) {
        this._userNameElement.textContent=data.name; //обновили информацию на странице
        this._userJobElement.textContent=data.about; 
        this.userId = data._id; //сохранили ID текущего пользователя
    }
}