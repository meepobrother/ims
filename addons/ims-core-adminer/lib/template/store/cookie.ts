import { observable, action } from 'mobx';
import { ImsCookie } from 'ims-cookie';
export const cookie = new ImsCookie(document.cookie);
export default class Cookie {
    @observable
    cookie: { [name: string]: any }

    constructor() {
        this.cookie = cookie.getAll();
        cookie.addChangeListener((change) => {
            this.setCookie(cookie.getAll())
        });
    }
    @action
    setCookie(cookie: { [name: string]: any }) {
        this.cookie = cookie;
    }
}