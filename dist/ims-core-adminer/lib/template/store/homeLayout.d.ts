interface Footer {
    links: any[];
    copyright: string;
}
export default class Cookie {
    logo: string;
    left: any[];
    right: any[];
    footer: Footer;
    load(): void;
}
export {};
