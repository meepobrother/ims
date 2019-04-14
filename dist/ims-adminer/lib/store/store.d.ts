export declare type IRoleType = 'all' | 'adminer' | 'member' | 'default';
export declare class ImsApp {
    uid: string;
    role: IRoleType;
    avatar: string;
    nickname: string;
    token: string;
    refreshToken: string;
    platform: 'web' | 'mobile';
    setRole(role: IRoleType): void;
    setNickname(nickname: string): void;
}
