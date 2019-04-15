import { observable, action } from 'mobx';
import util from 'ims-util';
export class Cookie {
    @observable
    cookie: { [name: string]: any }

    constructor() {
        this.cookie = util.cookie.getAll();
        util.cookie.addChangeListener((change) => {
            this.setCookie(util.cookie.getAll())
        });
    }

    @action
    setCookie(cookie: { [name: string]: any }) {
        this.cookie = cookie;
    }
}
export default new Cookie();