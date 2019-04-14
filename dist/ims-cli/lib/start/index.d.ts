import { ImsCommand } from '../command';
export declare class ImsStart extends ImsCommand {
    dev: boolean;
    run(): Promise<void>;
}
