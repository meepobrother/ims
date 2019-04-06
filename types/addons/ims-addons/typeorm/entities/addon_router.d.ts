export declare class ImsAddonRouterEntity {
    id: number;
    path: string;
    component: string;
    name: string;
    roles: string[];
    type: string;
    icon: string;
    hideChildrenInMenu: boolean;
    redirect: string;
    exact: boolean;
    routes: ImsAddonRouterEntity[];
    parent: ImsAddonRouterEntity;
}
