import React, { Suspense } from 'react'
import { render } from 'react-dom';
import { ImsUtil } from 'ims-util';
import { ImsRoutes } from './routes';
import { Loading } from './loading';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'ant-design-pro/dist/ant-design-pro.css';
import { IRouter } from 'ims-core';
import { Provider } from 'mobx-react'
export function createStore(routes: IRouter[]) {
    const ObjectStore = {};
    routes.map(route => {
        const { store } = route;
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
    });
    return ObjectStore;
}
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
