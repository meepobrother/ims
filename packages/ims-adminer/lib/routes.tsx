import React, { Component, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { IRouter } from './router'
export class ImsRoutes extends Component<{ route: IRouter, fallback?: any }, any> {
    static defaultProps = {
        fallback: () => <div></div>
    }
    render() {
        const { route, fallback } = this.props;
        return <Suspense fallback={fallback()}>
            {route.routes && route.routes.map((router, key) => {
                const { component: Component, roles, routes, redirect, ...props } = router;
                return <Route key={key} {...props} render={() => <Component route={router} />} />
            })}
        </Suspense>
    }
}