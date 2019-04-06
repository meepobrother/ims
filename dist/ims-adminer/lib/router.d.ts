export interface IRouter {
    path?: string;
    component?: any;
    name?: string;
    roles?: string[];
    icon?: string;
    hideChildrenInMenu?: boolean;
    routes?: IRouter[];
    redirect?: string;
    exact?: boolean;
}
export interface IRouterProps {
    routes: IRouter[];
}
