import { Type } from 'ims-decorator';
import { TransformOptions } from './type';
import WebSocket from 'ws';
import { ImsAddon } from './addon';
export declare const socketSet: Set<WebSocket>;
export declare class ImsApplication {
    types: Type<any>[];
    options: TransformOptions;
    static application: ImsApplication;
    addons: Map<Type<any>, ImsAddon>;
    constructor(types: Type<any>[], options: TransformOptions);
    installAddon(target: Type<any>): void;
    unInstallAddon(target: Type<any>): void;
    reInstall(target: Type<any>): void;
    createTemplate(): void;
}
