import { ImsWebpack } from 'ims-webpack';
import { TypeContext } from 'ims-common';
import { createAdmin } from './util';
import { BehaviorSubject } from 'rxjs';
export { createAdmin };
/**
 * 打包后台页面
 */
export declare class ImsWebpackAdmin extends ImsWebpack {
    context: TypeContext;
    /**
     * 是否开发中
     */
    dev: boolean;
    $change: BehaviorSubject<any>;
    isRunning: boolean;
    constructor(context: TypeContext);
    getHtmlTemplate(): string;
    onInit(): void;
    watchFile(): void;
}
