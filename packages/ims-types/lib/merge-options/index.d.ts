declare module 'merge-options' {
    function mergeOptions<T1, T2>(t1: T1, t2: T2): T1 & T2;
    function mergeOptions<T1, T2, T3>(t1: T1, t2: T2, t3: T3): T1 & T2 & T3;
    function mergeOptions<T1, T2, T3, T4>(t1: T1, t2: T2, t3: T3, t4: T4): T1 & T2 & T3 & T4;
    function mergeOptions<T>(...args: T[]): T;
    function mergeOptions(...args: any[]): any;
    export default mergeOptions;
}