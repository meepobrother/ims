"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentRouting_1 = require("./contentRouting");
const p2p_1 = require("./p2p");
const protocol_1 = require("./protocol");
const pubsub_1 = require("./pubsub");
function transform(context, options) {
    contentRouting_1.transformContentRouting(context, options);
    p2p_1.transformP2p(context, options);
    protocol_1.transformProtocol(context, options);
    pubsub_1.transformPubsub(context, options);
}
exports.transform = transform;
