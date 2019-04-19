import { Server } from 'hapi';
const init = async () => {
    const server = new Server({
        port: 3000,
        host: 'localhost'
    });
    await server.start();
    setTimeout(() => {
        server.route({
            path: '/',
            method: "GET",
            handler: (req, res, err) => {
                return 'hello'
            }
        })
    }, 1000)
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();