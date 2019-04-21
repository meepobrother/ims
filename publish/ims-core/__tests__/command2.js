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
const lib_1 = require("../lib");
const lib_2 = require("../lib");
let ImsCommand2 = class ImsCommand2 {
    constructor() {
        this.title = 'title';
    }
    async run() {
        console.log(`command2 ${this.title}`);
    }
};
__decorate([
    lib_2.Option({
        alias: 't'
    }),
    __metadata("design:type", String)
], ImsCommand2.prototype, "title", void 0);
ImsCommand2 = __decorate([
    lib_1.Command({
        name: 'command2 <cmd> [oths...]',
        description: 'command2 desc',
        example: {
            command: 'ims command2 cmd',
            description: 'command2 example'
        }
    })
], ImsCommand2);
exports.ImsCommand2 = ImsCommand2;
