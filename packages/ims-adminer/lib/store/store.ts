import { observable, action } from 'mobx'
export type IRoleType = 'all' | 'adminer' | 'member' | 'default';
export class ImsApp {
    @observable
    uid: string;

    @observable
    role: IRoleType = 'default';

    @observable
    avatar: string;

    @observable
    nickname: string;

    @observable
    token: string;

    @observable
    refreshToken: string;

    @observable
    platform: 'web' | 'mobile';

    @action
    setRole(role: IRoleType) {
        this.role = role;
    }

    @action
    setNickname(nickname: string) {
        this.nickname = nickname;
    }
}
