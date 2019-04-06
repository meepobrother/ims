import { TypeContext } from 'ims-common';
import express = require('express');
import multer = require('multer');
import bodyparser = require('body-parser');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import { join } from 'path';
import parseRouter from './router';
import parseMethod from './method';
import { createServer } from 'http';
import WebSocket = require('ws');
import { parseSocket } from './socket';
export async function bootstrapExpress(context: TypeContext) {
    const app = express();
    const file = multer();
    const root = process.cwd();
    app.use(file.any());
    const jsonParser: any = bodyparser.json();
    const textParser: any = bodyparser.text();
    const rawParser: any = bodyparser.raw();
    const urlencodedParser: any = bodyparser.urlencoded({ extended: true });

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

    app.use(express.static(join(root, 'template')));
    app.use(express.static(join(__dirname, '../../ims-proxy/lib/assets')));

    await parseMethod(context, app);
    await parseRouter(context, app);

    const server = createServer(app);
    const ws = new WebSocket.Server({
        server: server
    });
    app['ws'] = ws;
    ws.on('connection', (socket: WebSocket) => {
        parseSocket(context, socket, ws)
    });
    // template render
    const appConfig = require(join(root, 'config/app.json'));
    // port
    server.listen(appConfig.port, () => {
        console.log(`app bootstrap at ${appConfig.port}`)
    });
}
