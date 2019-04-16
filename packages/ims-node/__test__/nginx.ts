import { nginx } from '../lib'
import fs from 'fs-extra';
import { join } from 'path';
const config = nginx.createNginxConfig([{
    path: 'home',
    name: 'home',
    upstream: [{
        ip: '127.0.0.1',
        port: 4200
    }]
}, {
    path: 'demo',
    name: 'demo',
    upstream: [{
        ip: '127.0.0.1',
        port: 4201
    }]
}]);
fs.writeFileSync(join(__dirname, '1.conf'), config)
debugger;
