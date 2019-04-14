"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
function transformP2p(context, options) {
    /** 属性 */
    const propertys = context.getProperty(ims_core_1.P2pMetadataKey);
    propertys.map(property => transformP2pProperty(property, context, options));
}
exports.transformP2p = transformP2p;
function transformP2pProperty(property, context, options) {
    context.instance[property.ast.propertyKey] = options.libp2p;
}
