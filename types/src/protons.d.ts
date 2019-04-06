declare enum FOO {
    BAR = 1
}
export interface Demo {
    Test: {
        num: number;
        payload: string;
    };
    AnotherOne: {
        list: FOO[];
    };
}
export {};
