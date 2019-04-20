import { TypeContext } from "ims-decorator";
import { CommandMetadataKey, CommandClassAst, OptionMetadataKey, OptionPropertyAst, OptionOptions, CliMetadataKey, CliClassAst } from "ims-core";
import yargs, { Argv, Arguments } from 'yargs';
import chalk from 'chalk';
import { visitor } from "ims-common";
export function transformCli(context: TypeContext) {
    let _yargs = yargs;
    const cli = context.getClass(CliMetadataKey) as CliClassAst;
    const cliDef = cli.ast.metadataDef;
    _yargs = _yargs
        .usage(`欢迎使用${cliDef.name || 'IMS'} ${cliDef.version || '1.0.0'}`)
        .help('h')
        .alias('h', 'help')
        .version('v')
        .alias('v', 'version')
        .epilog(`${chalk.green("power by ims")}`)

    _yargs.example(`ims -h`, `查看所有命令及使用详情`);
    _yargs.example(`ims -v`, `查看版本号`);
    cliDef.commands.map(cmd => {
        const context = visitor.visitType(cmd);
        const command = context.getClass(CommandMetadataKey) as CommandClassAst;
        if (!!command) {
            const options = context.getProperty(OptionMetadataKey) as OptionPropertyAst[];
            const def = command.ast.metadataDef;
            _yargs = _yargs.example(def.example.command, def.example.description)
                .command(def.name, def.description, (args: Argv<any>) => {
                    options.map(option => {
                        const def: OptionOptions = option.ast.metadataDef;
                        args.option(option.ast.propertyKey as string, {
                            ...def,
                            default: context.instance[option.ast.propertyKey]
                        })
                    });
                    return args
                }, async (argv: Arguments<any>) => {
                    options.map(opt => {
                        const key = opt.ast.propertyKey;
                        let val: any;
                        if (argv[key]) {
                            val = argv[key]
                        }
                        context.instance[opt.ast.propertyKey] = val;
                    })
                    await context.instance.run();
                });
        }
    })
    _yargs.argv;
}
