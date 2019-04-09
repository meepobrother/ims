declare module 'class-is' {
    export interface IClassIsOptions {
        className: string;
        symbolName: string;
    }
    export interface IClassIsResult<T> extends Function {
        new(...args: any[]): T;
    }
    export interface IClassIsProtoOptions {
        className: string;
        symbolName: string;
        withoutNew?: boolean;
    }
    interface IClassIs {
        <T>(targt: any, opts: IClassIsOptions): T;
        proto: <T>(target: any, opts: IClassIsProtoOptions) => T;
    }
    const classIs: IClassIs;
    export default classIs;
}