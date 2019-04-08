import { ImsWebpack } from 'ims-webpack';
import { TypeContext } from 'ims-decorator';
import { createMobile } from './util';
import { BehaviorSubject } from 'rxjs';
export { createMobile };
/**
 * 打包后台页面
 */
export declare class ImsWebpackMobile extends ImsWebpack {
    context: TypeContext;
    /**
     * 是否开发中
     */
    dev: boolean;
    $change: BehaviorSubject<any>;
    isRunning: boolean;
    constructor(context: TypeContext, dev?: boolean);
    getHtmlTemplate(): string;
    watchFile(): void;
}
