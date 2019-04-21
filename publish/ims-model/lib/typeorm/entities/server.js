"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
let ImsServer = class ImsServer {
    constructor() {
        this.name = '';
        this.path = '';
        this.upstream = [];
    }
};
__decorate([
    ims_core_1.PrimaryColumn(),
    __metadata("design:type", String)
], ImsServer.prototype, "name", void 0);
__decorate([
    ims_core_1.PrimaryColumn(),
    __metadata("design:type", String)
], ImsServer.prototype, "path", void 0);
__decorate([
    ims_core_1.Column({
        type: 'text',
        transformer: {
            from: (val) => {
                return JSON.parse(val);
            },
            to: (val) => {
                return JSON.stringify(val);
            }
        }
    }),
    __metadata("design:type", Array)
], ImsServer.prototype, "upstream", void 0);
ImsServer = __decorate([
    ims_core_1.Entity()
], ImsServer);
exports.ImsServer = ImsServer;
