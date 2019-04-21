import { Type } from 'ims-decorator';
export declare class Injector {
    static get<T>(type: Type<T>): T;
}
