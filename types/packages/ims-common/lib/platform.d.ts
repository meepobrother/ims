import { TypeContext } from 'ims-common';
export interface PlatformHandler {
    (context: TypeContext): any;
}
export declare class PlatformRef {
    parents: PlatformRef[];
    handlers: PlatformHandler[];
    constructor(parents: PlatformRef[], handlers: PlatformHandler[]);
    bootstrap(target: any): Promise<TypeContext>;
    bootstrapContext(context: TypeContext): Promise<TypeContext>;
    static create(handlers?: PlatformHandler[], parents?: PlatformRef[]): PlatformRef;
}
