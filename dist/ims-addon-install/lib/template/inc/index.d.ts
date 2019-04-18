import { PostProperty } from "ims-core";
export declare class ImsIndex {
    setDatabase: PostProperty<[any], any>;
    setUser: PostProperty<[any], any>;
    restart: PostProperty<[], any>;
    demo: PostProperty<[DemoOptions], any>;
}
export interface DemoOptions {
}
export * from "./user";
