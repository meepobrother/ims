import { MethodContext, MethodAst, ParserAstContext } from 'ims-decorator';
export interface IHttpMethod {
    path?: string;
}
export class HttpMethodContext<T extends IHttpMethod> extends MethodContext<T> {
    path: string;
    constructor(ast: MethodAst<T>, context: ParserAstContext) {
        super(ast, context);
        const def = ast.metadataDef;
        if (def) {
            this.path = `/${def.path || ast.propertyKey as string}`;
        } else {
            this.path = `/${ast.propertyKey as string}`;
        }
    }
}
