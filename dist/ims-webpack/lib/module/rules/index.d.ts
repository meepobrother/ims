import { IBabelModule } from './babel';
export declare class ImsWebpackModule {
    module: IBabelModule;
    babelConfig: any;
    constructor(module: IBabelModule);
    get(): {
        noParse: RegExp[];
        rules: ({
            test: RegExp;
            exclude: RegExp;
            loader: string;
            options: any;
        } | {
            test: RegExp;
            use: any[];
        } | {
            test: RegExp;
            loader: string;
            options: {
                limit: number;
            };
        })[];
    };
}
