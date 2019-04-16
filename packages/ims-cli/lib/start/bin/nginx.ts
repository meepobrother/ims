import { nginx, log4 } from 'ims-node';
const logger = log4.getLogger('cli:nginx')
nginx.bootstrap().then(() => {
    logger.info(`bootstrap`)
    nginx.nginxWatch();
});
