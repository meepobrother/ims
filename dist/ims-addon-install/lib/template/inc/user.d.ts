import { PostProperty } from "ims-core";
export interface IRegisterOptions {
}
export interface IRegisterResult {
    id: number;
}
export declare class ImsUser {
    register: PostProperty<[IRegisterOptions], Promise<IRegisterResult>>;
}
