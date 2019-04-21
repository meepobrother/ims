export declare class AddonDesign {
    name: string;
    title: string;
    version: string;
    author: string;
    baseForm: any;
    /** 接口 */
    incs: any[];
    showAddInc: boolean;
    /** 数据 */
    entities: any[];
    /** 模板 */
    template: any[];
    step: number;
    nextBtn: any;
    prevBtn: any;
    next(): void;
    loading: boolean;
    finish(): void;
    prev(): void;
    addInc(): void;
    openAddInc(): void;
    closeAddInc(): void;
}
declare const _default: AddonDesign;
export default _default;
