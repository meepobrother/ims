import { GetProperty, PostProperty } from "ims-core";
export declare class ImsCoreAdminerDashboard {
    updateAnalysis: GetProperty<[], any>;
    /** 重新启动 */
    restart: PostProperty<[], any>;
    killPid: PostProperty<[any], any>;
}
declare const _default: ImsCoreAdminerDashboard;
export default _default;
