import { TypeContext, getContext } from 'ims-decorator';
import { visitor } from './visitor'
export interface PlatformHandler {
    (context: TypeContext): any;
}
export class PlatformRef {
    constructor(public parents: PlatformRef[] = [], public handlers: PlatformHandler[]) { }
    async bootstrap(target: any) {
        const ctx = getContext(target);
        if (ctx) {
            const context = visitor.visitType(target)
            return this.bootstrapContext(context);
        } else {
            throw new Error(`PlatformRef: ${target.name} get context error`)
        }
    }
    async bootstrapContext(context: TypeContext) {
        for (let parent of this.parents) {
            await parent.bootstrapContext(context);
        }
        for (let handler of this.handlers) {
            await handler(context);
        }
        return context;
    }
    static create(handlers: PlatformHandler[] = [], parents: PlatformRef[] = []) {
        return new PlatformRef(parents, handlers);
    }
}
