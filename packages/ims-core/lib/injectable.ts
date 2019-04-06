import { makeDecorator, ClassAst, ClassContext, ParserAstContext } from 'ims-decorator';
export const InjectableMetadataKey = 'InjectableMetadataKey';
export type Injectable = {};
export const Injectable = makeDecorator<Injectable>(InjectableMetadataKey);
export class InjectableAst extends ClassContext<Injectable> {
    constructor(ast: ClassAst<Injectable>, context: ParserAstContext) {
        super(ast, context);
    }
}
export function isInjectableClassAst(val: ClassAst): val is ClassAst<Injectable> {
    return val.metadataKey === InjectableMetadataKey;
}