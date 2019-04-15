import { observable, action } from 'mobx';
import util from 'ims-util';
export class ImsRole {

    /** 角色 */
    @observable
    role: string = 'default';

    /** 用户名 */
    @observable
    username: string = '';

    /** 头像 */
    @observable
    avatar: string = '';

    /** 自动登录 */
    @observable
    autoLogin: boolean;

    /** 设置role */
    @action
    setRole(role: string) {
        this.role = role;
    }

    /** 设置自动登录 */
    @action
    setAutoLogin(auto: boolean) {
        this.autoLogin = auto;
    }

    /** 设置用户名 */
    @action
    setUsername(username: string) {
        this.username = username;
    }

    /** 设置头像 */
    @action
    setAvatar(avatar: string) {
        this.avatar = avatar;
    }

    constructor() {
        const token = util.cookie.get('token')
        if (token) {
            util.http.get('/user/getRole').then(res => {
                const user = res.data;
                this.setRole(user.role)
                this.setUsername(user.username);
            });
        }
    }

}

export const role = new ImsRole();