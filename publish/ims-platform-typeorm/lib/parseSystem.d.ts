import { IConfig } from 'ims-common';
import { TypeContext } from 'ims-decorator';
export declare function parseSystem(context: TypeContext, config: IConfig): Promise<void>;
export declare function parseAddons(addons: string[], config: IConfig): Promise<void>;
