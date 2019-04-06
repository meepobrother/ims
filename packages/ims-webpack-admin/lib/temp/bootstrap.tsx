import React, { Suspense } from 'react'
import { render } from 'react-dom';
import { ImsUtil } from 'ims-util';
import { ImsRoutes, Exception404 } from 'ims-adminer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'ant-design-pro/dist/ant-design-pro.css';
export interface IRouter {
    path?: string;
    component?: any;
    name?: string;
    roles?: string[];
    icon?: string;
    hideChildrenInMenu?: boolean;
    routes?: IRouter[];
    redirect?: string;
    extra?: boolean;
}
export async function bootstrap(routes: IRouter[]) {
    await ImsUtil.onInit(routes)
    render(
        <Router keyLength={12}>
            <Suspense fallback={fallback()} >
                <Switch>
                    {routes.map((route, key) => {
                        const { component: Component, path, extra } = route;
                        return <Route key={key} path={path} extra={extra} render={() => {
                            if (Component) {
                                return <Component route={route} />
                            } else {
                                return <ImsRoutes route={route} />
                            }
                        }} />
                    })}
                    <Route render={() => <Exception404 />} />
                </Switch>
            </Suspense>
        </Router>
        ,
        document.getElementById('root')
    )
}
function fallback() {
    return <div></div>
}