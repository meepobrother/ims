export declare class ImsHttp {
    static create(): Promise<ImsHttp>;
    get(url: string): (params?: any) => Promise<any>;
    post(url: string): (body: any) => Promise<any>;
}
