export declare class ImsError extends Error {
    data?: any;
    code?: string;
    constructor(msg: string, data?: any, code?: string);
}
