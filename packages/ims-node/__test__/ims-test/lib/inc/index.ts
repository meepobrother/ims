import { Controller, Get, GetProperty } from "ims-core";
interface GetUserOptions {
    id: number;
}
@Controller({
    path: "/"
})
export class ImsDemo {
    @Get()
    getUser: GetProperty<[GetUserOptions], Promise<{
        uid: number;
        title: string;
    }>>;
}
