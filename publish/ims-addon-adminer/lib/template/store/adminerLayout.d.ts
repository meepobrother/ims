export declare class AdminerLayout {
    logo: string;
    sider: {
        collapsed: boolean;
        onCollapse: (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {};
    };
    collapsed: boolean;
    collapsedIcon: 'menu-unfold' | 'menu-fold';
    copyright: string;
    menus: any[];
    lefts: any[];
    constructor();
    setCollapsed(collapsed?: boolean): void;
    setCollapsedIcon(icon?: 'menu-unfold' | 'menu-fold'): void;
}
declare const _default: AdminerLayout;
export default _default;
