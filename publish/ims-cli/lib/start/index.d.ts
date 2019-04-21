import { ImsCommand } from '../command';
export declare class ImsStart extends ImsCommand {
    dev: boolean;
    /** 当前开发模块 */
    addon: string;
    run(): Promise<void>;
}
