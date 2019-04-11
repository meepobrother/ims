import { bootstrap } from 'ims-adminer';
import "./app.css";
import "antd/dist/antd.css";
import React from 'react';
let routes = [{
path:"/login",
component:React.lazy(()=>import(/* webpackChunkName: "login" */"../../../../addons/ims-core-adminer/lib/template/login")),
store:{login: require('../../../../addons/ims-core-adminer/lib/template/store/login').default,},
routes:[],
}];
bootstrap(routes);
