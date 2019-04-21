import Config = require('webpack-chain');
import webpack = require('webpack');
export declare abstract class ImsWebpack {
    dist: string;
    dev: boolean;
    config: Config;
    options: webpack.Configuration;
    entity: Config.EntryPoint;
    designWidth: number;
    readonly root: string;
    imageReg: RegExp;
    fontReg: RegExp;
    mediaReg: RegExp;
    lessReg: RegExp;
    sassReg: RegExp;
    constructor(dist: string, dev: boolean);
    getHtmlTemplate(): string;
    initStyle(): void;
    readonly postCssPlugins: any[];
    toConfig(): any;
}
