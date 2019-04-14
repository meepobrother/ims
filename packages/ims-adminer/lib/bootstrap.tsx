import React from 'react';
import { render } from 'react-dom';
import { ImsUtil } from 'ims-util';
import { ImsRoutes } from './routes';
import { Loading } from './loading';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'ant-design-pro/dist/ant-design-pro.css';
import { IRouter } from 'ims-core';
import { Provider } from 'mobx-react'
import Authorized from 'ant-design-pro/lib/Authorized';

const ObjectStore: { [key: string]: any } = {};
export function createStore(routes: IRouter[]) {
    routes.map(route => {
        const { store, routes } = route;
        if (store) {
            Object.keys(store).map(key => {
                if (!!ObjectStore[key]) {
                    console.log(`warning:${key} is exist!!!`)
                } else {
                    ObjectStore[key] = new store[key](routes);
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
    const store = createStore(routes);
    const userRole = store.login.role || 'default'
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
    render(
        <Provider {...store}>
            <Router>
                {routes.map((route, key) => {
                    const props = routerProps(route);
                    console.log(props);
                    return <AuthorizedRoute {...props} />
                })}
            </Router>
        </Provider >
        ,
        document.getElementById('root')
    )
}
