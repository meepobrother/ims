import { ImsCommand } from '../command';
export declare class ImsInit extends ImsCommand {
    type: string;
    path: string;
    run(): void;
}
