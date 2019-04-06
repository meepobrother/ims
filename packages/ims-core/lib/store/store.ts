import { makeDecorator, ClassContext, ClassAst, TypeContext, ParserAstContext } from 'ims-decorator';
export const StoreMetadataKey = 'StoreMetadataKey';
export interface Store {
    name: string;
}
export const Store = makeDecorator<Store>(StoreMetadataKey);
export class StoreAst extends ClassContext<Store> {
    name: string;
    constructor(ast: ClassAst, context: ParserAstContext) {
        super(ast, context);
        if (ast.metadataDef) {
            this.name = ast.metadataDef.name || ast.target.name;
        } else {
            this.name = ast.target.name;
        }
    }
}
export function isStoreClassAst(val: ClassAst): val is ClassAst<Store> {
    return val.metadataKey === StoreMetadataKey;
}