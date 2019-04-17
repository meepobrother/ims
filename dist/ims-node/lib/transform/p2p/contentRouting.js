"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
function transformContentRouting(context, options) {
    /** 属性 */
    const propertys = context.getProperty(ims_core_1.ContentRoutingMetadataKey);
    propertys.map(property => transformContentRoutingProperty(property, context, options));
}
exports.transformContentRouting = transformContentRouting;
function transformContentRoutingProperty(property, context, options) {
    context.instance[property.ast.propertyKey] = options.libp2p.contentRouting;
}
