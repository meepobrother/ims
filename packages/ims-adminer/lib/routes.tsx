import { Component, Suspense } from 'react';
import React = require('react');
import { Route } from 'react-router-dom';
import { IRouter } from 'ims-core';
export class ImsRoutes extends Component<{ route: IRouter, fallback?: any }, any> {
    static defaultProps = {
        fallback: () => <div></div>
    }
    render() {
        const { route, fallback } = this.props;
        return <Suspense fallback={fallback()}>
            {route.routes && route.routes.map((router, key) => {
                const { component: Component, exact, path } = router;
                return <Route key={key} path={path} exact={exact} render={() => <Component route={router} />} />
            })}
        </Suspense>
    }
}