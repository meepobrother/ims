export declare class ImsRole {
    /** 角色 */
    role: string;
    /** 用户名 */
    username: string;
    /** 头像 */
    avatar: string;
    /** 手机号 */
    mobile: string;
    /** 邮箱 */
    email: string;
    /** 微信openid */
    openid: string;
    /** 设置role */
    setRole(role: string): void;
    /** 设置用户名 */
    setUsername(username: string): void;
    /** 设置头像 */
    setAvatar(avatar: string): void;
    autoLogin(): Promise<void>;
}
export declare const role: ImsRole;
