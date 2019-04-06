import * as typeorm from 'typeorm'
@typeorm.Entity({
    name: 'ims_demo'
})
export class ImsDemo {
    @typeorm.PrimaryGeneratedColumn()
    id: number;
}
async function bootstrap() {
    const slave1: MysqlConnectionCredentialsOptions = {
        host: '127.0.0.1',
        username: 'root',
        password: '123456',
        port: 3307
    }
    const connection = await typeorm.createConnection({
        type: 'mysql',
        host: slave1.host,
        username: slave1.username,
        password: slave1.password,
        port: slave1.port,
        name: 'slave',
        database: 'test'
    })
    const status = await connection.query(`show slave status`)
    debugger;
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
