import { observable, action } from 'mobx';
import util from 'ims-util';
import login from './login'
export class Cookie {
    @observable
    cookie: { [name: string]: any }

    constructor() {
        this.cookie = util.cookie.getAll();
        this.setLoginToken();
        util.cookie.addChangeListener((change) => {
            this.setCookie(util.cookie.getAll())
            this.setLoginToken();
        });
    }

    setLoginToken() {
        if (this.cookie.token) {
            login.setToken(this.cookie.token)
        }
    }

    @action
    setCookie(cookie: { [name: string]: any }) {
        this.cookie = cookie;
    }
}
export default new Cookie();