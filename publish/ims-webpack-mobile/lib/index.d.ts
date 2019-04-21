import { ImsWebpack } from 'ims-webpack';
import { Type } from 'ims-decorator';
import { createMobile } from './util';
export { createMobile };
/**
 * 打包后台页面
 */
export declare class ImsWebpackMobile extends ImsWebpack {
    addons: Type<any>[];
    /**
     * 是否开发中
     */
    dev: boolean;
    isRunning: boolean;
    constructor(addons: Type<any>[], dev?: boolean);
    getHtmlTemplate(): string;
}
