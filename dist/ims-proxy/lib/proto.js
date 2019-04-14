"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_protons_1 = require("ims-protons");
const protoDef = `
message MessagePayload {
    required string type = 1;
    repeated int32 data = 2;
    required string path = 3;
    required string host = 4;
}
message Message {
    required string type = 1;
    required int32 key = 2;
    required MessagePayload payload = 3;
}
message Request{
    required string method = 1;
    required int32 key = 2;
    required string body = 3;
    required string path = 4;
    required string headers = 5;
    required string hostname = 6;
}
message Socket{
    required string data = 1;
    required int32 key = 2;
    required string type = 3;
}
`;
const configure = ims_protons_1.protons(protoDef);
exports.default = configure;
