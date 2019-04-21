import { HttpResult, PostProperty, GetProperty } from "ims-core";
export interface LoginOptions {
    username: string;
    password: string;
}
export interface LoginOutput {
    username: string;
    role: string;
    token: string;
}
export declare class ImsCoreAdminerUser {
    login: PostProperty<[LoginOptions], HttpResult<LoginOutput>>;
    getRole: GetProperty<[any], any>;
}
declare const _default: ImsCoreAdminerUser;
export default _default;
