interface Footer {
    links: any[];
    copyright: string;
}
export declare class HomeLayout {
    logo: string;
    left: any[];
    right: any[];
    userMenus: any[];
    footer: Footer;
    load(): void;
}
declare const _default: HomeLayout;
export default _default;
