import { EventEmitter } from 'events';

export abstract class ImsTransport {
    /**
     * 拨号
     */
    abstract dial(): any;
    /**
     * 创建listener
     */
    abstract createListener(): ImsTransportListener;
    /**
     * 过滤
     */
    abstract filter(): any;
}

export abstract class ImsTransportListener extends EventEmitter {
    /**
     * 监听
     */
    abstract listen(): any;
    /**
     * 地址
     */
    abstract getAddrs(): any;
    /**
     * 关闭
     */
    abstract close(): any;
}
