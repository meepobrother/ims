import { ImsCookie } from 'ims-cookie';
/**
 * 开发者模式 监听应用文件变化 并自动重新加载应用
 */
declare global {
    namespace Express {
        interface Request {
            imsCookie: ImsCookie;
        }
        interface Response {
        }
        interface Application {
        }
    }
}
export declare function bootstrap(root: string, dev: boolean): Promise<{}>;
