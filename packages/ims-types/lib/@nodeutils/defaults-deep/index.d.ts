declare module '@nodeutils/defaults-deep' {
    function defaultsDeep<T1, T2>(t1: T1, t2: T2): T1 & T2;
    function defaultsDeep<T1, T2, T3>(t1: T1, t2: T2, t3: T3): T1 & T2 & T3;
    function defaultsDeep<T1, T2, T3, T4>(t1: T1, t2: T2, t3: T3, t4: T4): T1 & T2 & T3 & T4;
    function defaultsDeep<T>(...args: T[]): T;
    function defaultsDeep(...args: any[]): any;
    export default defaultsDeep;
}