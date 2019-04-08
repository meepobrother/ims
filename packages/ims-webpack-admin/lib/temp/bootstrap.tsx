import React, { Suspense, Component } from 'react'
import { render } from 'react-dom';
import { ImsUtil } from 'ims-util';
import { ImsRoutes, Exception404 } from 'ims-adminer';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'ant-design-pro/dist/ant-design-pro.css';
import { IRouter } from 'ims-core';
import { Provider } from 'mobx-react'
export function createStore(routes: IRouter[]) {
    const ObjectStore = {};
    routes.map(route => {
        const { store } = route
        Object.keys(store).map(key => {
            ObjectStore[key] = new store[key](routes);
        });
    });
    return ObjectStore;
}
import { Loading } from 'ims-adminer'
export async function bootstrap(routes: IRouter[]) {
    await ImsUtil.onInit(routes)
    const store = createStore(routes);
    render(
        <Provider {...store}>
            <Router>
                <Suspense fallback={<Loading></Loading>} >
                    {routes.map((route, key) => {
                        const { component: Component, path, exact } = route;
                        return <Route key={key} path={path} exact={exact} render={() => {
                            if (Component) {
                                return <Component route={route} />
                            } else {
                                return <ImsRoutes route={route} />
                            }
                        }} />
                    })}
                </Suspense>
            </Router>
        </Provider>
        ,
        document.getElementById('root')
    )
}
