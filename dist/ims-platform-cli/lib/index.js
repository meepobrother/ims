"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargsParser = require("yargs-parser");
const ims_common_1 = require("ims-common");
async function cliHandler(context) {
    const cli = context.getClass(ims_common_1.AppMetadataKey);
    let args = yargsParser(process.argv.slice(2));
    const _ = args._;
    const name = _[0];
    const command = cli.commands.find(command => {
        const cd = command.getClass(ims_common_1.CommandMetadataKey);
        return cd.name === name || cd.alis === name;
    });
    try {
        if (Array.isArray(_) && _.length > 0) {
            if (command) {
                const inputs = command.getProperty(ims_common_1.InputMetadataKey);
                const options = {
                    alias: {},
                    boolean: [],
                    array: [],
                    string: [],
                    number: []
                };
                inputs.map(pro => {
                    const ast = pro.ast;
                    const def = ast.metadataDef;
                    options.alias[ast.propertyKey] = def.alis || [];
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
                    const def = ast.metadataDef;
                    command.instance[ast.propertyKey] = args[def.alis] || args[ast.propertyKey] || command.instance[ast.propertyKey];
                });
                const injects = command.getProperty(ims_common_1.InjectMetadataKey);
                injects.map(inject => {
                    const injector = ims_common_1.visitor.visitType(inject.ast.propertyType);
                    command.instance[inject.ast.propertyKey] = injector.instance;
                });
                command.propertys.map(pro => {
                    if (pro instanceof ims_common_1.VersionAst) {
                        command.instance[pro.ast.propertyKey] = cli.version;
                    }
                });
                command.instance.run();
                context.set('cli', command);
            }
        }
        context.set('args', args);
    }
    catch (e) {
        console.error(e.message);
    }
}
const cliPlatformRef = ims_common_1.PlatformRef.create([
    cliHandler
]);
exports.default = cliPlatformRef;
