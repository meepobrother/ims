"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var ImsCommandCreate_1;
const ims_common_1 = require("ims-common");
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
    async run() {
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
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsCommandCreate_1();
        return this.instance;
    }
};
tslib_1.__decorate([
    ims_common_1.Input({
        alis: 't'
    }),
    tslib_1.__metadata("design:type", String)
], ImsCommandCreate.prototype, "type", void 0);
tslib_1.__decorate([
    ims_common_1.Input({
        alis: 'n'
    }),
    tslib_1.__metadata("design:type", String)
], ImsCommandCreate.prototype, "name", void 0);
ImsCommandCreate = ImsCommandCreate_1 = tslib_1.__decorate([
    ims_common_1.Command({
        name: 'create',
        alis: 'c'
    })
], ImsCommandCreate);
exports.ImsCommandCreate = ImsCommandCreate;
