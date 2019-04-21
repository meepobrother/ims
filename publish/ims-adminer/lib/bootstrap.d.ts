import React from 'react';
import 'ant-design-pro/dist/ant-design-pro.css';
import { IRouter } from 'ims-core';
export declare function bootstrap(routes: IRouter[]): Promise<void>;
export declare class AdminerRouter extends React.Component<{
    role?: any;
    routes: IRouter[];
}> {
    render(): JSX.Element;
}
