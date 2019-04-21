import { makeDecorator, ClassContext, ClassAst } from "ims-decorator";
export const PageMetadataKey = 'PageMetadataKey'
export interface PageOptions { }
export const Page = makeDecorator<PageOptions>(PageMetadataKey);
export interface Page<O, R> {
    action(options: O): R;
}
export function isPageClassAst(val: ClassAst): val is ClassAst<PageOptions> {
    return val.metadataKey === PageMetadataKey;
}
export class PageClassAst extends ClassContext<PageOptions>{ }

export interface CorePage {
    // 标题被点击
    onTitleClick?(): void;
    // 页面加载
    onLoad?(query: object): void;
    // 页面显示
    onShow?(): void;
    // 页面加载完成
    onReady?(): void;
    // 页面隐藏
    onHide?(): void;
    // 页面被关闭
    onUnload?(): void;
    // 页面被下拉 监听用户下拉刷新事件。
    onPullDownRefresh?(): void;
    // 页面被拉到底部 监听用户上拉触底事件。
    onReachBottom?(): void;
    // 返回自定义分享信息
    onShareAppMessage?(res: { from: string, target: any, webViewUrl: string }): {
        title: string;
        path: string;
        imageUrl: string;
    };
    // 页面滚动触发事件的处理函数
    onPageScroll?(res: { scrollTop: number }): any;
    // 页面尺寸改变时触发
    onResize?(res: Resize): void;
    // 当前是 tab 页时，点击 tab 时触发
    onTabItemTap?(item: TabItemTap): void;
}

interface Resize {
    size: {
        windowWidth: number, windowHeight: number
    }
}

interface TabItemTap {
    // 被点击tabItem的序号
    index: string;
    // 被点击tabItem的页面路径
    pagePath: string;
    // 被点击tabItem的按钮文字
    text: string;
}