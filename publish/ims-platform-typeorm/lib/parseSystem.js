"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const parseTypeorm_1 = require("./parseTypeorm");
const typeorm_1 = require("typeorm");
async function parseSystem(context, config) {
    const typeorm = parseTypeorm_1.parseTypeorm(context);
    const { db, system } = config;
    const manager = typeorm_1.getConnectionManager();
    if (manager.has(system)) {
        const connect = manager.get(system);
        await connect.close();
    }
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
exports.parseSystem = parseSystem;
async function parseAddons(addons, config) {
    let entities = [];
    let subscribers = [];
    let migrations = [];
    addons.map(src => {
        const addon = require(src).default;
        const context = ims_common_1.visitor.visitType(addon);
        const typeorm = parseTypeorm_1.parseTypeorm(context);
        entities = entities.concat(typeorm.entities);
        subscribers = subscribers.concat(typeorm.subscribers);
        migrations = migrations.concat(typeorm.migrations);
    });
    const { db } = config;
    const manager = typeorm_1.getConnectionManager();
    if (manager.has(config.addons)) {
        const connect = manager.get(config.addons);
        await connect.close();
    }
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
exports.parseAddons = parseAddons;
