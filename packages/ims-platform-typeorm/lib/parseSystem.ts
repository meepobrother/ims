import { visitor, IConfig } from 'ims-common';
import { parseTypeorm } from './parseTypeorm'
import { TypeContext, Type, } from 'ims-decorator'
import { getConnectionManager } from 'typeorm';
export async function parseSystem(context: TypeContext, config: IConfig) {
    const typeorm = parseTypeorm(context)
    const { db, system } = config;
    const manager = getConnectionManager();
    if (!manager.has(system)) {
        const connect = manager.create({
            type: 'mysql',
            host: db.host,
            port: db.port,
            username: db.username,
            password: db.password,
            entities: typeorm.entities,
            subscribers: typeorm.subscribers,
            migrations: typeorm.migrations,
            database: system,
            synchronize: true,
            name: system
        });
        await connect.connect();
    }
}

export async function parseAddons(addons: Type<any>[], config: IConfig) {
    let entities = [];
    let subscribers = [];
    let migrations = [];
    addons.map(addon => {
        const context = visitor.visitType(addon);
        const typeorm = parseTypeorm(context);
        entities = entities.concat(typeorm.entities);
        subscribers = subscribers.concat(typeorm.subscribers);
        migrations = migrations.concat(typeorm.migrations);
    });
    const { db } = config;
    const manager = getConnectionManager();
    if (!manager.has(config.addons)) {
        const connect = manager.create({
            type: 'mysql',
            host: db.host,
            port: db.port,
            username: db.username,
            password: db.password,
            entities: entities,
            subscribers: subscribers,
            migrations: migrations,
            database: config.addons,
            synchronize: true,
            name: config.addons
        });
        await connect.connect();
    }
}
