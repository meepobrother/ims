import yargsParser = require('yargs-parser');
import {
    AppMetadataKey, AppAst, CommandMetadataKey,
    CommandAst, InputAst, InputMetadataKey, InjectMetadataKey,
    InjectAst, VersionAst,
} from 'ims-core';
import { TypeContext } from 'ims-decorator'
import { visitor } from 'ims-common'

export default async function bootstrap(context: TypeContext) {
    const cli = context.getClass(AppMetadataKey) as AppAst;
    let args = yargsParser(process.argv.slice(2));
    const _ = args._;
    const name = _[0];
    const command = cli.commands.find(command => {
        const cd = command.getClass(CommandMetadataKey) as CommandAst;
        return cd.name === name || cd.alis === name;
    });
    try {
        if (Array.isArray(_) && _.length > 0) {
            if (command) {
                const inputs = command.getProperty(InputMetadataKey) as InputAst[];
                const options: yargsParser.Options = {
                    alias: {},
                    boolean: [],
                    array: [],
                    string: [],
                    number: []
                };
                inputs.map(pro => {
                    const ast = pro.ast;
                    const def = ast.metadataDef;
                    options.alias[ast.propertyKey as string] = def.alis || [];
                    switch (ast.propertyType.name) {
                        case 'Array':
                            options.array.push(def.alis);
                            options.array.push(def.alis);
                            break;
                        case 'Number':
                            options.number.push(def.alis);
                            options.number.push(def.alis);
                            break;
                        case 'String':
                            options.string.push(def.alis);
                            options.string.push(def.alis);
                            break;
                        case 'Boolean':
                            options.boolean.push(def.alis);
                            options.boolean.push(def.alis);
                            break;
                        default:
                            break;
                    }
                });
                args = yargsParser(process.argv.slice(2), options);
                inputs.map(input => {
                    const ast = input.ast;
                    const def = ast.metadataDef
                    command.instance[ast.propertyKey] = args[def.alis] || args[ast.propertyKey as string] || command.instance[ast.propertyKey];
                });
                const injects = command.getProperty(InjectMetadataKey) as InjectAst[];
                injects.map(inject => {
                    const injector = visitor.visitType(inject.ast.propertyType);
                    command.instance[inject.ast.propertyKey] = injector.instance;
                });
                command.propertys.map(pro => {
                    if (pro instanceof VersionAst) {
                        command.instance[pro.ast.propertyKey] = cli.version;
                    }
                });
                command.instance.run();
                context.set('cli', command);
            } else {
                console.log(`command not found`)
            }
        }
    } catch (e) {
        console.error(e.message)
    }
}
