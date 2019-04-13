import { bootstrap } from 'ims-adminer';
import "./app.css";
import "antd/dist/antd.css";
import React from 'react';
let routes = [{
path:"/login",
component:React.lazy(()=>import(/* webpackChunkName: "login" */"../../../../addons/ims-core-adminer/lib/template/login")),
store:{login: require('../../../../addons/ims-core-adminer/lib/template/store/login').default,cookie: require('../../../../addons/ims-core-adminer/lib/template/store/cookie').default,},
routes:[],
},{
path:"/adminer",
component:React.lazy(()=>import(/* webpackChunkName: "adminer" */"../../../../addons/ims-core-adminer/lib/template/addon-list")),
routes:[],
}];
bootstrap(routes);
