import { makeDecorator, MethodAst, MethodContext, ParserAstContext } from 'ims-decorator';
export type On = string;
export const OnMetadataKey = 'OnMetadataKey'
export const On = makeDecorator<On>(OnMetadataKey);
export function isOnMethodAst(val: MethodAst): val is MethodAst<On> {
    return val.metadataKey === OnMetadataKey;
}
export class OnAst extends MethodContext<On> {
    constructor(ast: MethodAst<On>, context: ParserAstContext) {
        super(ast, context);
    }
}
