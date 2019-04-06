import inquirer = require("inquirer");
export declare function confirm<T>(message: string): Promise<string>;
export declare function select<T>(message: string, opt?: {
    choices?: ReadonlyArray<inquirer.ChoiceType> | ((answers: T) => ReadonlyArray<inquirer.ChoiceType>) | ((answers: T) => Promise<ReadonlyArray<inquirer.ChoiceType>>);
    filter?: (input: string) => any;
    validate?: (input: any, answers?: T) => boolean | string | Promise<boolean | string>;
}): Promise<any>;
export declare function input<T>(message: string, opt?: {
    filter?: (input: string) => any;
    validate?: (input: any, answers?: T) => boolean | string | Promise<boolean | string>;
}): Promise<any>;
