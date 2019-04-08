export declare class ImsHttp {
    baseUrl: string;
    constructor(baseUrl?: string);
    static create(baseUrl?: string): Promise<ImsHttp>;
    get(url: string): (params?: any) => Promise<any>;
    post(url: string): (body: any) => Promise<any>;
}
