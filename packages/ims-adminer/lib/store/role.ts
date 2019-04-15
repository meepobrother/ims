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

    /** 手机号 */
    @observable
    mobile: string = '';

    /** 邮箱 */
    @observable
    email: string = '';

    /** 微信openid */
    @observable
    openid: string = '';

    /** 设置role */
    @action
    setRole(role: string) {
        this.role = role;
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

    @action
    autoLogin() {
        const token = util.cookie.get('token');
        console.log(token)
        if (token) {
            return util.http.get('/user/getRole').then(res => {
                const user = res.data;
                this.setRole(user.role)
                this.setUsername(user.username);
            });
        }
    }

}

export const role = new ImsRole();