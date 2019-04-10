export declare class ImsBuild {
    root: string;
    system: boolean;
    name: string;
    tag: string;
    output: string;
    run(): Promise<void>;
    static instance: any;
    static create(): any;
}
