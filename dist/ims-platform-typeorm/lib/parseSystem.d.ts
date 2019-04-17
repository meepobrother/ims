import { IConfig } from 'ims-common';
import { TypeContext, Type } from 'ims-decorator';
export declare function parseSystem(context: TypeContext, config: IConfig): Promise<void>;
export declare function parseAddons(addons: Type<any>[], config: IConfig): Promise<void>;
