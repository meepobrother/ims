export declare class ImsStorage {
    set(key: string, obj: any): Promise<void>;
    get<T>(key: string): Promise<T>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    static create(): Promise<ImsStorage>;
}
