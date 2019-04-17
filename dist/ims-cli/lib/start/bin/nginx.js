"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_node_1 = require("ims-node");
const logger = ims_node_1.log4.getLogger('cli:nginx');
ims_node_1.nginx.bootstrap().then(() => {
    logger.info(`bootstrap`);
    ims_node_1.nginx.nginxWatch();
});
