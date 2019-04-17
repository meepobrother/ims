import { ImsWebpack } from 'ims-webpack';
import { Type } from 'ims-decorator';
import { createAdmin } from './util';
import { BehaviorSubject } from 'rxjs';
export { createAdmin };
/**
 * 打包后台页面
 */
export declare class ImsWebpackAdmin extends ImsWebpack {
    addons: Type<any>[];
    /**
     * 是否开发中
     */
    dev: boolean;
    $change: BehaviorSubject<any>;
    isRunning: boolean;
    constructor(addons: Type<any>[], dev?: boolean);
    getHtmlTemplate(): string;
    onInit(): void;
}
