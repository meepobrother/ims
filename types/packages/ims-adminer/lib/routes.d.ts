import { Component } from 'react';
import { IRouter } from 'ims-core';
export declare class ImsRoutes extends Component<{
    route: IRouter;
    fallback?: any;
}, any> {
    static defaultProps: {
        fallback: () => JSX.Element;
    };
    render(): JSX.Element;
}
