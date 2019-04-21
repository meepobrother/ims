"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const yargs_1 = __importDefault(require("yargs"));
const chalk_1 = __importDefault(require("chalk"));
const ims_common_1 = require("ims-common");
function transformCli(context) {
    let _yargs = yargs_1.default;
    const cli = context.getClass(ims_core_1.CliMetadataKey);
    const cliDef = cli.ast.metadataDef;
    _yargs = _yargs
        .usage(`欢迎使用${cliDef.name || 'IMS'} ${cliDef.version || '1.0.0'}`)
        .help('h')
        .alias('h', 'help')
        .version('v')
        .alias('v', 'version')
        .epilog(`${chalk_1.default.green("power by ims")}`);
    _yargs.example(`ims -h`, `查看所有命令及使用详情`);
    _yargs.example(`ims -v`, `查看版本号`);
    cliDef.commands.map(cmd => {
        const context = ims_common_1.visitor.visitType(cmd);
        const command = context.getClass(ims_core_1.CommandMetadataKey);
        if (!!command) {
            const options = context.getProperty(ims_core_1.OptionMetadataKey);
            const def = command.ast.metadataDef;
            _yargs = _yargs.example(def.example.command, def.example.description)
                .command(def.name, def.description, (args) => {
                options.map(option => {
                    const def = option.ast.metadataDef;
                    args.option(option.ast.propertyKey, {
                        ...def,
                        default: context.instance[option.ast.propertyKey]
                    });
                });
                return args;
            }, async (argv) => {
                options.map(opt => {
                    const key = opt.ast.propertyKey;
                    let val;
                    if (argv[key]) {
                        val = argv[key];
                    }
                    context.instance[opt.ast.propertyKey] = val;
                });
                await context.instance.run();
            });
        }
    });
    _yargs.argv;
}
exports.transformCli = transformCli;
