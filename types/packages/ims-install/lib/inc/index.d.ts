export declare class ImsIndex {
    lockFile: string;
    setDatabase(body: any): Promise<{
        username: any;
        host: any;
        port: any;
        password: any;
        code?: undefined;
        message?: undefined;
        data?: undefined;
    } | {
        code: number;
        message: any;
        data: {
            username: any;
            host: any;
            port: any;
            password: any;
        };
        username?: undefined;
        host?: undefined;
        port?: undefined;
        password?: undefined;
    }>;
    setUser(body: any): Promise<{
        uid: number;
        code?: undefined;
        message?: undefined;
    } | {
        code: number;
        message: any;
        uid?: undefined;
    }>;
    /**
     * 安装应用
     */
    install(): void;
}
