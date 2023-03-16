export class UserInfo {
    constructor({nameElement, jobElement}) {
        this._userNameElement = document.querySelector(nameElement);
        this._userJobElement = document.querySelector(jobElement);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo () {
        this.userFromPage = {
            name: this._userNameElement.textContent,
            job: this._userJobElement.textContent,
        };
        return this.userFromPage;
    }

    setUserInfo (data) {
        this._userNameElement.textContent=data.name;
        this._userJobElement.textContent=data.job;
    }
}