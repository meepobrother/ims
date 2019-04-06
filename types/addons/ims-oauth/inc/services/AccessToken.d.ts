export declare class AccessToken {
    data: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        scope: string;
        openid: string;
        create_at?: number;
    };
    constructor(data: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        scope: string;
        openid: string;
        create_at?: number;
    });
    isValid(): boolean;
}
