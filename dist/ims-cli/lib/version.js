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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImsCommandVersion_1;
const ims_core_1 = require("ims-core");
let ImsCommandVersion = ImsCommandVersion_1 = class ImsCommandVersion {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${this.version}`);
        });
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsCommandVersion_1();
        return this.instance;
    }
};
__decorate([
    ims_core_1.Version(),
    __metadata("design:type", String)
], ImsCommandVersion.prototype, "version", void 0);
ImsCommandVersion = ImsCommandVersion_1 = __decorate([
    ims_core_1.Command({
        name: 'version',
        alis: 'v'
    })
], ImsCommandVersion);
exports.ImsCommandVersion = ImsCommandVersion;
