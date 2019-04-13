import { bootstrap } from 'ims-adminer';
import "./app.css";
import "antd/dist/antd.css";
import React from 'react';
let routes = [{
path:"/",
redirect:"home",
store:{login: require('../../../../addons/ims-core-adminer/lib/template/store/login').default,cookie: require('../../../../addons/ims-core-adminer/lib/template/store/cookie').default,},
routes:[{
path:"/home",
component:React.lazy(()=>import(/* webpackChunkName: "home" */"../../../../addons/ims-core-adminer/lib/template/home")),
routes:[],
},{
path:"/login",
component:React.lazy(()=>import(/* webpackChunkName: "login" */"../../../../addons/ims-core-adminer/lib/template/login")),
routes:[],
},{
path:"/adminer",
component:React.lazy(()=>import(/* webpackChunkName: "adminer" */"../../../../addons/ims-core-adminer/lib/template/addon-list")),
roles:["admin"],store:{addonList: require('../../../../addons/ims-core-adminer/lib/template/store/addon-list').default,},
routes:[],
}],
}];
bootstrap(routes);
