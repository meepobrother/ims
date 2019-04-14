"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
function transform(context, options) {
    socket_1.transformSocket(context, options);
}
exports.default = transform;
var socket_2 = require("./socket");
exports.handlerMap = socket_2.handlerMap;
