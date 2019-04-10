import { ImsCommand } from '../command';
export declare class ImsStart extends ImsCommand {
    source: string;
    dev: boolean;
    run(): void;
}
