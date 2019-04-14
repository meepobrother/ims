import 'ant-design-pro/dist/ant-design-pro.css';
import { IRouter } from 'ims-core';
export declare function createStore(routes: IRouter[]): {
    [key: string]: any;
};
export declare function bootstrap(routes: IRouter[]): Promise<void>;
