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
const lib_1 = require("../lib");
let ImsDemo = class ImsDemo {
};
ImsDemo = __decorate([
    ims_core_1.Injectable()
], ImsDemo);
exports.ImsDemo = ImsDemo;
let ImsDemo2 = class ImsDemo2 {
    constructor() { }
};
__decorate([
    ims_core_1.Inject(),
    __metadata("design:type", ImsDemo)
], ImsDemo2.prototype, "demo", void 0);
ImsDemo2 = __decorate([
    ims_core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ImsDemo2);
exports.ImsDemo2 = ImsDemo2;
const demo2 = lib_1.Injector.get(ImsDemo2);
debugger;
