import inquirer = require("inquirer");
import log = require("npmlog");

export async function confirm<T>(message: string) {
    log.pause();
    return inquirer
        .prompt<T & { confirm?: string }>([
            {
                type: "expand",
                name: "confirm",
                message,
                default: 2, // default to help in order to avoid clicking straight through
                choices: [{ key: "y", name: "Yes", value: true }, { key: "n", name: "No", value: false }],
            },
        ])
        .then(answers => {
            log.resume();
            return answers.confirm;
        });
}

export async function select<T>(message: string, opt: {
    choices?: ReadonlyArray<inquirer.ChoiceType>
    | ((answers: T) => ReadonlyArray<inquirer.ChoiceType>)
    | ((answers: T) => Promise<ReadonlyArray<inquirer.ChoiceType>>),
    filter?: (input: string) => any,
    validate?: (input: any, answers?: T) => boolean | string | Promise<boolean | string>;
} = {}) {
    const { choices, filter, validate } = opt;
    log.pause();
    return inquirer
        .prompt<T & { prompt: any }>([
            {
                type: "list",
                name: "prompt",
                message,
                choices,
                pageSize: choices.length,
                filter,
                validate,
            },
        ])
        .then(answers => {
            log.resume();
            return answers.prompt;
        });
}

export async function input<T>(message: string, opt: {
    filter?: (input: string) => any,
    validate?: (input: any, answers?: T) => boolean | string | Promise<boolean | string>;
} = {}) {
    const { filter, validate } = opt;
    log.pause();
    return inquirer
        .prompt<T & { input: any }>([
            {
                type: "input",
                name: "input",
                message,
                filter,
                validate,
            },
        ])
        .then(answers => {
            log.resume();
            return answers.input;
        });
}
