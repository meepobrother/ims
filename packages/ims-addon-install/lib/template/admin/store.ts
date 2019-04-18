import { Controller, Post, PostProperty } from 'ims-core';

@Controller({
    path: '/'
})
export class ImsController {
    @Post()
    setDatabase: PostProperty<any, any>;
}