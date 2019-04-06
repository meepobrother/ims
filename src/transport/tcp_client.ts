import net from 'net';
import chalk from 'chalk';

const connection: net.Socket = net.connect(8000, '0.0.0.0', () => {
    console.log(`${chalk.blue(`app connection`)}`)
});
connection.on('connect', () => {
    const buffer = Buffer.from(`test`);
    connection.write(buffer);
})
connection.on('data', (data: Buffer) => {
    console.log(data.toString('utf8'))
});
