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
var ImsCommandCreate_1;
const ims_core_1 = require("ims-core");
const root = process.cwd();
const template_1 = require("./template");
const fs_1 = require("fs");
const path_1 = require("path");
let ImsCommandCreate = ImsCommandCreate_1 = class ImsCommandCreate {
    constructor() {
        this.root = root;
        this.type = 'addon';
    }
    createFiles(opt) {
        const admin = {};
        const mobile = {};
        const incs = [];
        Object.keys(opt.admins).map(key => {
            const val = opt.admins[key];
            admin[`${key}.ts`] = template_1.buildInc(`admin`, `Admin${val}`);
            incs.push(`./admin/${key}`);
        });
        Object.keys(opt.mobiles).map(key => {
            const val = opt.mobiles[key];
            mobile[`${key}.ts`] = template_1.buildInc(`mobile`, `Mobile${val}`);
            incs.push(`./mobile/${key}`);
        });
        return {
            [`index.ts`]: template_1.buildIndex(opt.name),
            [`package.json`]: template_1.buildPkg(opt.name),
            inc: {
                admin: admin,
                mobile: mobile,
                [`index.ts`]: template_1.buildIncIndex(incs)
            },
            models: {
                [`index.ts`]: template_1.buildEntity(opt.name)
            },
            template: {
                admin: {
                    [`index.tsx`]: template_1.buildTemplate()
                },
                mobile: {
                    [`index.tsx`]: template_1.buildTemplate()
                }
            }
        };
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const cfg = {
                name: `${this.name}`,
                admins: {
                    [`admin.inc`]: 'Home'
                },
                mobiles: {
                    [`mobile.inc`]: 'Home'
                }
            };
            const files = this.createFiles(cfg);
            let root = path_1.join(this.root, 'addons', this.name);
            try {
                fs_1.mkdirSync(root);
                function makeFile(files, root) {
                    Object.keys(files).map(key => {
                        const val = files[key];
                        const path = path_1.join(root, key);
                        if (typeof val === 'string') {
                            fs_1.writeFileSync(path, val);
                        }
                        else {
                            fs_1.mkdirSync(path);
                            makeFile(val, path);
                        }
                    });
                }
                makeFile(files, root);
            }
            catch (e) { }
        });
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsCommandCreate_1();
        return this.instance;
    }
};
__decorate([
    ims_core_1.Input({
        alis: 't'
    }),
    __metadata("design:type", String)
], ImsCommandCreate.prototype, "type", void 0);
__decorate([
    ims_core_1.Input({
        alis: 'n'
    }),
    __metadata("design:type", String)
], ImsCommandCreate.prototype, "name", void 0);
ImsCommandCreate = ImsCommandCreate_1 = __decorate([
    ims_core_1.Command({
        name: 'create',
        alis: 'c'
    })
], ImsCommandCreate);
exports.ImsCommandCreate = ImsCommandCreate;
