import { bootstrap } from './bootstrap';
import { store } from 'ims-adminer';
import "./app.css";
import React from 'react';
let routes = [];
store.dispatch({
    type: '__init__',
    payload: {
        routes
    }
});
bootstrap(routes);
