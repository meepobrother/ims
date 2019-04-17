export declare class Login {
    autoLogin: boolean;
    notice: string;
    tab: 'account' | 'mobile';
    setting: any;
    setAutoLogin(e: boolean): void;
    setTab(key: 'account' | 'mobile'): void;
    setNotice(notice: string): void;
    /**
     * 登录
     */
    login(data: any): import("axios").AxiosPromise<any>;
    /**
     * 退出登录
     **/
    logout(): void;
    /**
     * 注册
     */
    register(): void;
}
declare const _default: Login;
export default _default;
