export abstract class ImsP2p {
    /** 添加一个swarm实例 */
    abstract addSwarm(): any;
    /** 添加一个或多个对等路由机制 */
    abstract addPeerRouting(peerRouting: ImsP2pPeerRouting): any;
    /** 添加“分布式记录存储”  */
    abstract addDistributedRecordStore(recordStore: ImsP2pRecordStore): any;
    /** 拨号 */
    abstract dial(): any;
    /** 接收 */
    abstract handleProtocol(): any;
}

export abstract class ImsP2pPeerRouting {
    /** 查找peer */
    abstract findPeers(): any;
}

export abstract class ImsP2pRecordStore {
    /** 获取 */
    abstract get(): any;
    /** 存储 */
    abstract put(): any;
}
