import { GetProperty } from "ims-core";
interface GetUserOptions {
    id: number;
}
export declare class ImsDemo {
    getUser: GetProperty<[GetUserOptions], Promise<{
        uid: number;
        title: string;
    }>>;
}
export {};
