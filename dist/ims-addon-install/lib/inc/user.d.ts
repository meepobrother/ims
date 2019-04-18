export interface IRegisterOptions {
}
export interface IRegisterResult {
    id: number;
}
export declare class ImsUser {
    register(opts: IRegisterOptions): Promise<IRegisterResult>;
}
