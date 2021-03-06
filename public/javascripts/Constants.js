/**
 * Created by plter on 9/28/16.
 */


window.nus = window.nus || {};

nus.Constants = {
    BASE_URL: "http://localhost:3000/api",

    get userRegisterUrl() {
        if (!this._userRegisterUrl) {
            this._userRegisterUrl = `${this.BASE_URL}/user/register`;
        }
        return this._userRegisterUrl;
    },

    get userLoginUrl() {
        if (!this._userLoginUrl) {
            this._userLoginUrl = `${this.BASE_URL}/user/login`;
        }
        return this._userLoginUrl;
    }
};