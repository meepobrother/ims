/// <reference types="node" />
import multiaddr from 'multiaddr'
import { ImsPlatformHapi } from 'ims-platform-hapi'
export async function bootstrap(root: string) {
    const addons: string[] = [];
    const addr = multiaddr('/ip4/0.0.0.0/tcp/4201')
    let addressOptions = addr.toOptions();
    const hapi = new ImsPlatformHapi({
        port: addressOptions.port,
        host: addressOptions.host,
        addons: addons
    });
    await hapi.init();
}
bootstrap(process.cwd());
