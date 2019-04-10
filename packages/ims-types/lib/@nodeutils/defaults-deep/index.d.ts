declare function defaultsDeep<T1, T2>(t1: T1, t2: T2): T1 & T2;
declare function defaultsDeep<T1, T2, T3>(t1: T1, t2: T2, t3: T3): T1 & T2 & T3;
declare function defaultsDeep<T1, T2, T3, T4>(t1: T1, t2: T2, t3: T3, t4: T4): T1 & T2 & T3 & T4;
declare function defaultsDeep<T>(...args: T[]): T;
declare function defaultsDeep(...args: any[]): any;
export default defaultsDeep;