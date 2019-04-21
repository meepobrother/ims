export interface InjectableDef<T> {
    factory: () => T;
    value: T | undefined;
}
