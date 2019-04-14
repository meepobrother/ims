import { TransformOptions } from './type';
import { Type } from 'ims-decorator';
interface ImsAddonUninstall {
    (options: TransformOptions): any;
}
export declare class ImsAddon {
    target: Type<any>;
    options: TransformOptions;
    uninstalls: ImsAddonUninstall[];
    private router;
    constructor(target: Type<any>, options: TransformOptions);
    private install;
    uninstall(): void;
}
export {};
