import { ImsCommand } from '../command';
export declare class ImsInit extends ImsCommand {
    /** 目录 */
    path: string;
    run(): void;
}
