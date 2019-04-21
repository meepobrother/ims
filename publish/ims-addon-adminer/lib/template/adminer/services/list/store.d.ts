interface HomeItem {
}
export declare class ClusterHome {
    list: HomeItem[];
    count: number;
    columns: any[];
    edit(item: any): void;
    remove(item: any): void;
    getList(): Promise<void>;
    addCluster(): void;
    activeTab: string;
    setActiveTab(e: string): void;
}
declare const _default: ClusterHome;
export default _default;
