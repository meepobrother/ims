import { bootstrap } from 'ims-adminer';
import "./app.css";
import "antd/dist/antd.css";
import React from 'react';
let routes = [{
path:"/ims-install",
component:React.lazy(()=>import(/* webpackChunkName: "ims-install" */"../../../../addons/ims-install/lib/template/admin/install")),
routes:[],
}];
bootstrap(routes);
