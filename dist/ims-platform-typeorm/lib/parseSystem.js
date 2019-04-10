"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const parseTypeorm_1 = require("./parseTypeorm");
const typeorm_1 = require("typeorm");
async function parseSystem(context, config) {
    const typeorm = parseTypeorm_1.parseTypeorm(context);
    const { db, system } = config;
    await typeorm_1.createConnection({
        type: 'mysql',
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        entities: typeorm.entities,
        subscribers: typeorm.subscribers,
        migrations: typeorm.migrations,
        name: system,
        database: system,
        synchronize: true
    });
}
exports.parseSystem = parseSystem;
async function parseAddons(addons, config) {
    let entities = [];
    let subscribers = [];
    let migrations = [];
    addons.map(addon => {
        const context = ims_common_1.visitor.visitType(addon);
        const typeorm = parseTypeorm_1.parseTypeorm(context);
        entities = entities.concat(typeorm.entities);
        subscribers = subscribers.concat(typeorm.subscribers);
        migrations = migrations.concat(typeorm.migrations);
    });
    const { db } = config;
    await typeorm_1.createConnection({
        type: 'mysql',
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        entities: entities,
        subscribers: subscribers,
        migrations: migrations,
        database: config.addons,
        synchronize: true
    });
}
exports.parseAddons = parseAddons;
