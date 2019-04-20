import { TypeContext } from "ims-decorator";
import { CommandMetadataKey, CommandClassAst, OptionMetadataKey, OptionPropertyAst, OptionOptions } from "ims-core";
import yargs, { Argv, Arguments } from 'yargs'
export function transformCommand(context: TypeContext) {
    const command = context.getClass(CommandMetadataKey) as CommandClassAst;
    if (!!command) {
        const options = context.getProperty(OptionMetadataKey) as OptionPropertyAst[];
        const def = command.ast.metadataDef;
        let command1 = yargs
            .command(def.name, def.description, (args: Argv<any>) => {
                return args
            }, (argv: Arguments<any>) => {
                options.map(opt => {
                    const def = opt.ast.metadataDef;
                    const key = opt.ast.propertyKey;
                    let val: any;
                    if (argv[key]) {
                        val = argv[key]
                    }
                    context.instance[opt.ast.propertyKey] = val;
                })
                console.log(argv)
            });
        options.map(option => {
            const def: OptionOptions = option.ast.metadataDef;
            command1.option(option.ast.propertyKey as string, {
                ...def,
                default: context.instance[option.ast.propertyKey]
            })
        });
        console.log(yargs)
    }
}
