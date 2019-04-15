import React from 'react';
import { render } from 'react-dom';
import { ImsUtil } from 'ims-util';
import { ImsRoutes } from './routes';
import { Loading } from './loading';
import { Router } from 'react-router-dom'
import 'ant-design-pro/dist/ant-design-pro.css';
import { IRouter } from 'ims-core';
import { Provider } from 'mobx-react'
import Authorized from 'ant-design-pro/lib/Authorized';
import { history } from './history'
const ObjectStore: { [key: string]: any } = {};
export function createStore(routes: IRouter[]) {
    routes.map(route => {
        const { store, routes } = route;
        if (store) {
            Object.keys(store).map(key => {
                if (!!ObjectStore[key]) {
                    console.log(`warning:${key} is exist!!!`)
                } else {
                    ObjectStore[key] = store[key];
                    console.log(`store key: ${key}`)
                }
            });
        }
        if (routes && routes.length > 0) {
            createStore(routes)
        }
    });
    return ObjectStore;
}
export async function bootstrap(routes: IRouter[]) {
    await ImsUtil.onInit(routes);
    render(<AdminerRouter routes={routes} />, document.getElementById('root'))
}

export class AdminerRouter extends React.Component<{ routes: IRouter[] }> {
    render() {
        return <Router history={history}>
            {this.props.routes.map((route, key) => {
                const userRole = ImsUtil.cookie.get('role') || 'default'
                const AuthorizedRoute = Authorized(userRole).AuthorizedRoute;
                const routerProps: any = (router) => ({
                    authority: role => {
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
                        if (router.component) {
                            return <React.Suspense fallback={<Loading />} >
                                <router.component route={router} />
                            </React.Suspense>
                        } else {
                            return <ImsRoutes route={router} />
                        }
                    }
                });
                const props = routerProps(route);
                if (route.store) {
                    console.log(route)
                    return <Provider {...route.store}>
                        <AuthorizedRoute {...props} />
                    </Provider>
                } else {
                    return <AuthorizedRoute {...props} />
                }
            })}
        </Router>
    }
}