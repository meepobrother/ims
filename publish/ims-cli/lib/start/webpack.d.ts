import webpack = require('webpack');
import { ImsWebpackAdmin } from 'ims-webpack-admin';
export declare class ImsWebpacks {
    addons: string[];
    isRunning: boolean;
    admin: ImsWebpackAdmin;
    readonly pkgs: ImsWebpackAdmin[];
    dev: boolean;
    constructor(addons: string[], dev: boolean);
    getConfig(): webpack.Configuration[];
    run(): void;
    build(): void;
    watch(): void;
    logSuccess(json: {
        children: {
            assets: any[];
            assetsByChunkName: any;
            builtAt: number;
            children: any[];
            chunks: any[];
            entrypoints: any;
        }[];
        hash: string;
        version: string;
    }): void;
}
