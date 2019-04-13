import { makeDecorator, ParameterAst, ParserAstContext, ParameterContext, PropertyAst, PropertyContext, MethodAst, MethodContext } from 'ims-decorator';
export type SocketOptions = string;
export const SocketMetadataKey = 'SocketMetadataKey'
export const Socket = makeDecorator<SocketOptions>(SocketMetadataKey);
export function isSocketPropertyAst(val: PropertyAst): val is PropertyAst<SocketOptions> {
    return val.metadataKey === SocketMetadataKey;
}
export class SocketPropertyAst extends PropertyContext<SocketOptions> {
    constructor(ast: PropertyAst<SocketOptions>, context: ParserAstContext) {
        super(ast, context);
    }
}

export function isSocketMethodAst(val: MethodAst): val is MethodAst<SocketOptions> {
    return val.metadataKey === SocketMetadataKey;
}
export class SocketMethodAst extends MethodContext<SocketOptions> {
    name: string;
    constructor(ast: MethodAst<SocketOptions>, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def || ast.propertyKey as string;
    }
}


export function isSocketParameterAst(val: ParameterAst): val is ParameterAst<SocketOptions> {
    return val.metadataKey === SocketMetadataKey;
}
export class SocketParameterAst extends ParameterContext<SocketOptions> {
    constructor(ast: ParameterAst<SocketOptions>, context: ParserAstContext) {
        super(ast, context);
    }
}
