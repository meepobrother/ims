import { ImsWebpack } from 'ims-webpack';
import { createAdmin } from './util';
import { BehaviorSubject } from 'rxjs';
export { createAdmin };
/**
 * 打包后台页面
 */
export declare class ImsWebpackAdmin extends ImsWebpack {
    addons: string[];
    /**
     * 是否开发中
     */
    dev: boolean;
    $change: BehaviorSubject<any>;
    isRunning: boolean;
    constructor(addons: string[], dev?: boolean);
    getHtmlTemplate(): string;
    onInit(): void;
}
