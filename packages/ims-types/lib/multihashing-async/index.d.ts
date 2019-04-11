
export interface MultihashingCallBack {
    (err: Error, buf: Buffer): any
}
export interface Multihashing {
    new(
        buf: Buffer,
        func: number | string,
        length?: number | MultihashingCallBack,
        callback?: MultihashingCallBack
    ): Multihashing;
}
export function digest(
    buf: Buffer,
    func: number | string,
    length?: number | MultihashingCallBack,
    callback?: MultihashingCallBack
): void;
export function createHash(func: number | string): Function;
export default digest;