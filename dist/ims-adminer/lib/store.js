"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const reducer = (state = {
    routes: []
}, action) => {
    switch (action.type) {
        default:
            return action.payload;
    }
};
exports.store = redux_1.createStore(reducer);
