"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
function transformP2p(context, libp2p) {
    /** 属性 */
    const propertys = context.getProperty(ims_core_1.P2pMetadataKey);
    propertys.map(property => transformP2pProperty(property, context, libp2p));
}
exports.transformP2p = transformP2p;
function transformP2pProperty(property, context, libp2p) {
    context.instance[property.ast.propertyKey] = libp2p;
}
