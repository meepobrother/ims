import { TypeContext } from 'ims-decorator';
export declare function buildTaro(type: 'weapp' | 'h5', watch: boolean): Promise<{}>;
export declare function createTaroPages(pages: string[]): string;
export declare function buildAppPages(context: TypeContext): Promise<void>;
