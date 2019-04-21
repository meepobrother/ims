import { HttpResult } from "ims-core";
import { ImsIndexInjectable } from './index.service';
export declare class ImsIndexController {
    index: ImsIndexInjectable;
    loadMore(): HttpResult;
}
