import * as typeorm from 'typeorm'
@typeorm.Entity({
    name: 'ims_demo4'
})
export class ImsDemo {
    @typeorm.PrimaryGeneratedColumn()
    id: number;
}
async function bootstrap() {
    const master: MysqlConnectionCredentialsOptions = {
        host: 'localhost',
        username: 'slave',
        password: 'slave123456',
        port: 3306
    }
    const connection = await typeorm.createConnection({
        type: 'mysql',
        entities: [
            ImsDemo
        ],
        synchronize: true,
        host: master.host,
        username: master.username,
        password: master.password,
        port: master.port,
        database: 'test'
    });
    const demo = connection.getRepository(ImsDemo)
    const slaveStatus = await connection.query(`show slave status`);
    const masterStatus = await connection.query(`show master status`);
    const res = await demo.save(new ImsDemo())
    debugger;
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
                entities: [
                    ImsDemo
                ],
            }
            return await typeorm.createConnection(options);
        }
    }

    async binLog() {
        return await this.connection.query(`show master status`);
    }

    async master(slave: MysqlConnectionCredentialsOptions) {
        const res = [];
        res.push(await this.connection.query(`show master status`));
        return res;
    }

    async slave(master: MysqlConnectionCredentialsOptions) {
        const sql = `CHANGE MASTER TO
    MASTER_HOST='${master.host}',
    MASTER_USER='${master.username}',
    MASTER_PASSWORD='${master.password}',
    MASTER_LOG_FILE='${master.log}',
    MASTER_LOG_POS=${master.pos};`;
        console.log(sql)
        await this.connection.query(sql)
    }
}

bootstrap();

interface MysqlConnectionCredentialsOptions {
    /**
     * Connection url where perform connection to.
     */
    readonly url?: string;
    /**
     * Database host.
     */
    readonly host?: string;
    /**
     * Database host port.
     */
    readonly port?: number;
    /**
     * Database username.
     */
    readonly username?: string;
    /**
     * Database password.
     */
    readonly password?: string;
    /**
     * Database name to connect to.
     */
    readonly database?: string;

    /**
     * log file
     */
    log?: string;
    pos?: number;
    /**
     * Object with ssl parameters or a string containing name of ssl profile.
     */
    readonly ssl?: any;
}
