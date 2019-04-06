import { IRouter } from 'ims-core';
export declare class ImsRouter {
    route: IRouter;
    children: ImsRouter[];
    constructor(route: IRouter);
    get(path: string): IRouter;
}
