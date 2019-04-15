import { IRouter } from 'ims-core';
import { Loading } from './loading';
import { observer } from 'mobx-react'
import Authorized from 'ant-design-pro/lib/Authorized';
import React from 'react';
import { role } from './store';

@observer
export class ImsRoutes extends React.Component<{ login?: any, route: IRouter, fallback?: any }, any> {
    static defaultProps = {
        fallback: () => <div></div>
    }
    render() {
        const { route } = this.props;
        const userRole = role.role || 'default'
        const AuthorizedRoute = Authorized(userRole).AuthorizedRoute;
        const props: any = (router) => ({
            authority: role => {
                console.log(role)
                if (!router.roles) return true;
                if (router.roles.length === 0) return true;
                if (role === 'admin') return true;
                return router.roles.indexOf(role) > -1;
            },
            redirectPath: '/403',
            key: router.path,
            path: router.path,
            exact: !!router.exact,
            render: () => {
                return <React.Suspense fallback={<Loading />} >
                    <router.component route={router} />
                </React.Suspense>
            }
        })
        return route.routes && route.routes.map((router, key) => {
            const _props = props(router);
            return <AuthorizedRoute {..._props} />
        })
    }
}