/// <reference types="node" />
import webpack = require('webpack');
import { TypeContext } from 'ims-decorator';
import { ChildProcess } from 'child_process';
import { ImsWebpackAdmin } from 'ims-webpack-admin';
import { ImsWebpackMobile } from 'ims-webpack-mobile';
import { BehaviorSubject } from 'rxjs';
export declare class ImsWebpacks {
    context: TypeContext;
    isRunning: boolean;
    admin: ImsWebpackAdmin;
    mobile: ImsWebpackMobile;
    readonly pkgs: (ImsWebpackAdmin | ImsWebpackMobile)[];
    dev: boolean;
    $change: BehaviorSubject<any>;
    constructor(context: TypeContext, dev: boolean);
    work: ChildProcess;
    change(file: string): import("child_process").ChildProcessWithoutNullStreams;
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
