export interface FileOptions {
    name: string;
    admins: any;
    mobiles: any;
}
export declare class ImsCommandCreate {
    root: string;
    type: string;
    name: string;
    createFiles(opt: FileOptions): {
        [`index.ts`]: string;
        [`package.json`]: string;
        inc: {
            admin: {};
            mobile: {};
            [`index.ts`]: string;
        };
        models: {
            [`index.ts`]: string;
        };
        template: {
            admin: {
                [`index.tsx`]: string;
            };
            mobile: {
                [`index.tsx`]: string;
            };
        };
    };
    run(): Promise<void>;
    static instance: any;
    static create(): any;
}
