import * as typeorm from 'typeorm';

async function bootstrap() {
    const cfg: typeorm.ConnectionOptions = {
        type: 'mysql',
        host: 'localhost',
        username: 'root',
        password: '123456',
        port: 3306,
        synchronize: true,
        logging: false
    };
    const db = new Db(cfg);
    await db.connect();

}

class Db {
    public connection: typeorm.Connection;
    public manager: typeorm.ConnectionManager;
    constructor(public options: typeorm.ConnectionOptions) { }
    async connect() {
        const manager = await typeorm.getConnectionManager();
        const connection = manager.create({ ...this.options });
        await connection.connect();
        this.connection = connection;
        this.manager = manager;
    }
    async existDatabase(name: string): Promise<boolean> {
        const databases = await this.connection.query('SHOW DATABASES');
        const test2Database = databases.find(data => data.Database === name);
        return !!test2Database;
    }
    async createDatabase(name: string) {
        await this.connection.query(`CREATE DATABASE IF NOT EXISTS ${name} default charset utf8 COLLATE UTF8_GENERAL_CI`);
        const result = await this.existDatabase(name);
        if (result) {
            if (this.manager.has(name)) {
                return this.manager.get(name)
            }
            const options: typeorm.ConnectionOptions = {
                type: 'mysql',
                ...this.options,
                name: 'ims',
                database: 'ims' as any,
                entities: [],
            }
            return await typeorm.createConnection(options);
        }
    }
}
bootstrap();