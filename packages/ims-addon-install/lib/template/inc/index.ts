import { Controller, Post, PostProperty } from "ims-core";
@Controller({
    path: "/"
})
export class ImsIndex {
    @Post()
    setDatabase: PostProperty<[any], any>;
    @Post()
    setUser: PostProperty<[any], any>;
    @Post()
    restart: PostProperty<[], any>;
    @Post()
    demo: PostProperty<[DemoOptions], any>;
}
export interface DemoOptions {
}
export * from "./user";
