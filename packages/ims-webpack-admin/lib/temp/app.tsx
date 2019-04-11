import { bootstrap } from 'ims-adminer';
import "./app.css";
import "antd/dist/antd.css";
import React from 'react';
let routes = [{
path:"/ims-core-editor/editor",
redirect:"markdown",
store:{editor: require('../../../../addons/ims-core-editor/lib/template/store/index').default,},
routes:[{
path:"/ims-core-editor/editor/markdown",
component:React.lazy(()=>import(/* webpackChunkName: "ims-core-editor-editor-markdown" */"../../../../addons/ims-core-editor/lib/template/editor/markdown")),
routes:[],
},{
path:"/ims-core-editor/editor/rich",
component:React.lazy(()=>import(/* webpackChunkName: "ims-core-editor-editor-rich" */"../../../../addons/ims-core-editor/lib/template/editor/rich")),
routes:[],
}],
},{
path:"/ims-core-editor/drafts",
component:React.lazy(()=>import(/* webpackChunkName: "ims-core-editor-drafts" */"../../../../addons/ims-core-editor/lib/template/drafts")),
routes:[],
}];
bootstrap(routes);
