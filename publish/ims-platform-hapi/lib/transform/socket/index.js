"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
function transformWs(context, options) {
    socket_1.transformSocket(context, options);
}
exports.transformWs = transformWs;
var socket_2 = require("./socket");
exports.handlerMap = socket_2.handlerMap;
