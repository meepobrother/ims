import { ImsAddon } from './addon';
export declare class ImsAddonRouter {
    id: number;
    path: string;
    component: string;
    name: string;
    roles: string;
    icon: string;
    hideChildrenInMenu: boolean;
    redirect: string;
    exact: boolean;
    routes: ImsAddonRouter[];
    parent: ImsAddonRouter;
    addon: ImsAddon;
}
