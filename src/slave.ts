import * as typeorm from 'typeorm'
@typeorm.Entity({
    name: 'user'
})
export class ImsUser {
    @typeorm.PrimaryColumn()
    User: string;
    @typeorm.Column()
    Host: string;
    @typeorm.Column()
    Select_priv: string = 'Y';
    @typeorm.Column()
    Insert_priv: string = 'Y';
    @typeorm.Column()
    Update_priv: string = 'Y';
    @typeorm.Column()
    Delete_priv: string = 'Y';
    @typeorm.Column()
    Create_priv: string = 'Y';
    @typeorm.Column()
    Drop_priv: string = 'Y';
    @typeorm.Column()
    Reload_priv: string = 'Y';
    @typeorm.Column()
    Shutdown_priv: string = 'Y';
    @typeorm.Column()
    Process_priv: string = 'Y';
    @typeorm.Column()
    File_priv: string = 'Y';
    @typeorm.Column()
    Grant_priv: string = 'Y';
    @typeorm.Column()
    References_priv: string = 'Y';
    @typeorm.Column()
    Index_priv: string = 'Y';
    @typeorm.Column()
    Alter_priv: string = 'Y';
    @typeorm.Column()
    Show_db_priv: string = 'Y';
    @typeorm.Column()
    Super_priv: string = 'Y';
    @typeorm.Column()
    Create_tmp_table_priv: string = 'Y';
    @typeorm.Column()
    Repl_slave_priv: string = 'Y';
    @typeorm.Column()
    Lock_tables_priv: string = 'Y';
    @typeorm.Column()
    Execute_priv: string = 'Y';
    @typeorm.Column()
    Repl_client_priv: string = 'Y';
    @typeorm.Column()
    Create_view_priv: string = 'Y';
    @typeorm.Column()
    Show_view_priv: string = 'Y';
    @typeorm.Column()
    Create_routine_priv: string = 'Y';
    @typeorm.Column()
    Alter_routine_priv: string = 'Y';
    @typeorm.Column()
    Create_user_priv: string = 'Y';
    @typeorm.Column()
    Event_priv: string = 'Y';
    @typeorm.Column()
    Trigger_priv: string = 'Y';
    @typeorm.Column()
    Create_tablespace_priv: string = 'Y';
}
async function bootstrap() {
    const master = {
        host: '127.0.0.1',
        username: 'root',
        password: '123456',
        port: 3306
    }
    const slave1 = {
        host: '127.0.0.1',
        username: 'root',
        password: '123456',
        port: 3307
    }
    const slaveConnection = await typeorm.createConnection({
        type: 'mysql',
        host: slave1.host,
        username: slave1.username,
        password: slave1.password,
        port: slave1.port,
        name: 'slave',
        database: 'mysql'
    });
    const adminConnection = await typeorm.createConnection({
        type: 'mysql',
        host: master.host,
        username: master.username,
        password: master.password,
        port: master.port,
        name: 'msater',
        database: 'mysql',
        entities: [
            ImsUser
        ]
    });
    const username = 'slave';
    const host = '192.168.1.12';
    const password = 'slave123456'
    const user = adminConnection.getRepository(ImsUser)
    let slaveUser = await user.findOne({
        User: username
    });
    if (!slaveUser) {
        await adminConnection.query(`create user ${username}@'%' identified by '${password}'`)
        slaveUser = await user.findOne({
            User: username
        });
        const _user = new ImsUser();
        for (let key in _user) {
            if (key !== 'User') {
                slaveUser[key] = _user[key]
            }
        }
        await user.save(slaveUser);
    } else {
        const _user = new ImsUser();
        for (let key in _user) {
            if (key !== 'User') {
                slaveUser[key] = _user[key]
            }
        }
        await user.save(slaveUser);
    }
    await adminConnection.query(`flush privileges;`);
    const adminStatus = await adminConnection.query(`show master status;`);
    let log, pos;
    if (adminStatus.length > 0) {
        const logss = adminStatus[0];
        log = logss.File;
        pos = logss.Position;
    }
    await slaveConnection.query(`stop slave;`);
    const sql = `CHANGE MASTER TO
    MASTER_HOST='${host}',
    MASTER_USER='${username}',
    MASTER_PASSWORD='${password}',
    MASTER_LOG_FILE='${log}',
    MASTER_LOG_POS=${pos};`;
    await slaveConnection.query(sql)
    await slaveConnection.query(`start slave;`);
    const status = await slaveConnection.query(`show slave status`)
}

bootstrap();
