"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const yargs_1 = __importDefault(require("yargs"));
function transformCommand(context) {
    const command = context.getClass(ims_core_1.CommandMetadataKey);
    if (!!command) {
        const options = context.getProperty(ims_core_1.OptionMetadataKey);
        const def = command.ast.metadataDef;
        let command1 = yargs_1.default
            .command(def.name, def.description, (args) => {
            return args;
        }, (argv) => {
            options.map(opt => {
                const def = opt.ast.metadataDef;
                const key = opt.ast.propertyKey;
                let val;
                if (argv[key]) {
                    val = argv[key];
                }
                context.instance[opt.ast.propertyKey] = val;
            });
            console.log(argv);
        });
        options.map(option => {
            const def = option.ast.metadataDef;
            command1.option(option.ast.propertyKey, {
                ...def,
                default: context.instance[option.ast.propertyKey]
            });
        });
        console.log(yargs_1.default);
    }
}
exports.transformCommand = transformCommand;
