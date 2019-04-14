import webpack = require('webpack');
import { Type } from 'ims-decorator';
import { ImsWebpackAdmin } from 'ims-webpack-admin';
import { ImsWebpackMobile } from 'ims-webpack-mobile';
export declare class ImsWebpacks {
    addons: Type<any>[];
    isRunning: boolean;
    admin: ImsWebpackAdmin;
    mobile: ImsWebpackMobile;
    readonly pkgs: (ImsWebpackAdmin | ImsWebpackMobile)[];
    dev: boolean;
    constructor(addons: Type<any>[], dev: boolean);
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
