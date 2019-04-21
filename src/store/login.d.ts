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
    login(data: {
        username: string;
        password: string;
    }): Promise<import("../../../../ims-core/lib").IResult<import("../inc/user").LoginOutput>>;
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
