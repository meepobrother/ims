"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const ims_decorator_1 = require("ims-decorator");
class PlatformRef {
    constructor(parents = [], handlers) {
        this.parents = parents;
        this.handlers = handlers;
    }
    async bootstrap(target) {
        const ctx = ims_decorator_1.getContext(target);
        if (ctx) {
            const context = ims_common_1.visitor.visitType(target);
            return this.bootstrapContext(context);
        }
        else {
            throw new Error(`PlatformRef: ${target.name} get context error`);
        }
    }
    async bootstrapContext(context) {
        for (let parent of this.parents) {
            await parent.bootstrapContext(context);
        }
        for (let handler of this.handlers) {
            await handler(context);
        }
        return context;
    }
    static create(handlers = [], parents = []) {
        return new PlatformRef(parents, handlers);
    }
}
exports.PlatformRef = PlatformRef;
