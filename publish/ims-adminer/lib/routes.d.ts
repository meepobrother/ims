import { IRouter } from 'ims-core';
import React from 'react';
export declare class ImsRoutes extends React.Component<{
    login?: any;
    route: IRouter;
    fallback?: any;
}, any> {
    static defaultProps: {
        fallback: () => JSX.Element;
    };
    render(): JSX.Element[];
}
