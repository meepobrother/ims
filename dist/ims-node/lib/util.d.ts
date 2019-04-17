export { isIP, isIPv4, isIPv6 } from 'net';
export * from './jwt';
export * from './key';
/** 生成随机数 */
export declare const random: (length: number) => string;
/**
 * 加密密码
 * 一般用于加密用户密码
 * @param password 要加密的密码
 */
export declare function cryptoPassword(password: string, token: string): string;
/**
 * 判断密码是否正确
 * 一般用于登录时验证密码正确与否
 * @param srcPassword 明文密码
 * @param token 加密token
 * @param password 密码
 */
export declare function isEqualPassword(srcPassword: string, token: string, password: string): boolean;
/**
 * 删除文件夹或文件
 * @param dir 文件或文件夹地址
 */
export declare function rmrf(dir: string): Promise<{}>;
/**
 * 执行命令
 * @param command 命令内容
 */
export declare function execSync(command: string): Promise<{}>;
