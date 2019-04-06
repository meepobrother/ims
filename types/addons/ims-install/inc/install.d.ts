export declare class ImsIndex {
    lockFile: string;
    loginQrcode(uniacid: number): Promise<{
        uniacid: number;
    }>;
    install(body: {
        db: {
            host: string;
            port: number;
            username: string;
            password: string;
        };
        user: {
            username: string;
            password: string;
        };
    }): Promise<{
        db: {
            host: string;
            port: number;
            username: string;
            password: string;
        };
        user: {
            username: string;
            password: string;
        };
    } | {
        code: number;
        message: string;
        tip: string;
    }>;
}
