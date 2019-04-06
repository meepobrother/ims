import { makeDecorator, ClassAst, ClassContext, ParserAstContext, TypeContext } from 'ims-decorator';
export const AppMetadataKey = 'AppMetadataKey'
export interface App {
    name?: string;
    version?: string;
    addons?: any[] | object;
    commands?: any[] | object;
    providers?: any[] | object;
    dev?: boolean;
}
export const App = makeDecorator<App>(AppMetadataKey);
export function isAppClassAst(val: ClassAst): val is ClassAst<App> {
    return val.metadataKey === AppMetadataKey;
}
export class AppAst extends ClassContext<App> {
    name: string;
    version: string;
    addons: TypeContext[] = [];
    commands: TypeContext[] = [];
    dev: boolean;
    constructor(ast: any, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef;
        if (def.addons) this.addons = Object.keys(def.addons).map(key => {
            const addon = def.addons[key];
            return context.visitType(addon)
        });
        if (def.commands) this.commands = Object.keys(def.commands).map(key => {
            const command = def.commands[key];
            return context.visitType(command)
        });
        this.name = def.name || ast.target.name;
        this.version = def.version;
        this.dev = !!def.dev;
    }
}
