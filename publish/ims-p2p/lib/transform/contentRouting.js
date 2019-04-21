"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
function transformContentRouting(context, libp2p) {
    /** 属性 */
    const propertys = context.getProperty(ims_core_1.ContentRoutingMetadataKey);
    propertys.map(property => transformContentRoutingProperty(property, context, libp2p));
}
exports.transformContentRouting = transformContentRouting;
function transformContentRoutingProperty(property, context, libp2p) {
    context.instance[property.ast.propertyKey] = libp2p.contentRouting;
}
