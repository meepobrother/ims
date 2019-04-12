import { randomBytes, createHash } from 'crypto'
/** 生成随机数 */
export const random = (length: number) => {
    return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}
/**
 * 加密密码
 * 一般用于加密用户密码
 * @param password 要加密的密码
 */
export function cryptoPassword(password: string, token: string): string {
    const md5 = createHash('md5')
    const base64Random = Buffer.from(token).toString('base64');
    const newPas = base64Random + password;
    const md5Pas = md5.update(newPas).digest("hex");
    const base64Md5 = Buffer.from(md5Pas).toString('base64');
    return base64Random + base64Md5;
}

/**
 * 判断密码是否正确
 * 一般用于登录时验证密码正确与否
 * @param srcPassword 明文密码
 * @param token 加密token
 * @param password 密码
 */
export function isEqualPassword(srcPassword: string, token: string, password: string) {
    return cryptoPassword(srcPassword, token) === password;
}
