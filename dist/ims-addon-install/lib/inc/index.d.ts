export declare class ImsIndex {
    lockFile: string;
    setDatabase(body: any): Promise<{
        username: any;
        host: any;
        port: any;
        password: any;
        code?: undefined;
        message?: undefined;
    } | {
        code: number;
        message: any;
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
    restart(): Promise<{
        msg: string;
    }>;
    demo(options: DemoOptions): void;
}
export interface DemoOptions {
}
export * from './user';
