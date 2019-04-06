"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require("express");
const multer = require("multer");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path_1 = require("path");
const router_1 = tslib_1.__importDefault(require("./router"));
const method_1 = tslib_1.__importDefault(require("./method"));
const http_1 = require("http");
const WebSocket = require("ws");
const socket_1 = require("./socket");
async function bootstrapExpress(context) {
    const app = express();
    const file = multer();
    const root = process.cwd();
    app.use(file.any());
    const jsonParser = bodyparser.json();
    const textParser = bodyparser.text();
    const rawParser = bodyparser.raw();
    const urlencodedParser = bodyparser.urlencoded({ extended: true });
    app.use(jsonParser);
    app.use(urlencodedParser);
    app.use(textParser);
    app.use(rawParser);
    app.use(cookieParser());
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 3
        }
    }));
    app.use(express.static(path_1.join(root, 'template')));
    app.use(express.static(path_1.join(__dirname, '../../ims-proxy/lib/assets')));
    await method_1.default(context, app);
    await router_1.default(context, app);
    const server = http_1.createServer(app);
    const ws = new WebSocket.Server({
        server: server
    });
    app['ws'] = ws;
    ws.on('connection', (socket) => {
        socket_1.parseSocket(context, socket, ws);
    });
    // template render
    const appConfig = require(path_1.join(root, 'config/app.json'));
    // port
    server.listen(appConfig.port, () => {
        console.log(`app bootstrap at ${appConfig.port}`);
    });
}
exports.bootstrapExpress = bootstrapExpress;
