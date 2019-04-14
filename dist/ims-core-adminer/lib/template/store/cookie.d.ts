export default class Cookie {
    cookie: {
        [name: string]: any;
    };
    constructor();
    setCookie(cookie: {
        [name: string]: any;
    }): void;
}
