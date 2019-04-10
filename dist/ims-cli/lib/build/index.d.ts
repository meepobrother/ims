export declare class ImsCommandBuild {
    root: string;
    name: string;
    tag: string;
    output: string;
    run(): Promise<void>;
    static instance: any;
    static create(): any;
}
