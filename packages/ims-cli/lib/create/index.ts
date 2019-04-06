import { Command, Input } from 'ims-core';
const root = process.cwd();
import { buildIndex, buildInc, buildIncIndex, buildTemplate, buildEntity, buildPkg } from './template';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface FileOptions {
    name: string;
    admins: any;
    mobiles: any;
}
@Command({
    name: 'create',
    alis: 'c'
})
export class ImsCommandCreate {
    root: string = root;

    @Input({
        alis: 't'
    })
    type: string = 'addon';

    @Input({
        alis: 'n'
    })
    name: string;

    createFiles(opt: FileOptions) {
        const admin = {};
        const mobile = {};
        const incs = [];
        Object.keys(opt.admins).map(key => {
            const val = opt.admins[key];
            admin[`${key}.ts`] = buildInc(`admin`, `Admin${val}`);
            incs.push(`./admin/${key}`)
        });
        Object.keys(opt.mobiles).map(key => {
            const val = opt.mobiles[key];
            mobile[`${key}.ts`] = buildInc(`mobile`, `Mobile${val}`);
            incs.push(`./mobile/${key}`)
        });
        return {
            [`index.ts`]: buildIndex(opt.name),
            [`package.json`]: buildPkg(opt.name),
            inc: {
                admin: admin,
                mobile: mobile,
                [`index.ts`]: buildIncIndex(incs)
            },
            models: {
                [`index.ts`]: buildEntity(opt.name)
            },
            template: {
                admin: {
                    [`index.tsx`]: buildTemplate()
                },
                mobile: {
                    [`index.tsx`]: buildTemplate()
                }
            }
        }
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
        let root = join(this.root, 'addons', this.name);
        try {
            mkdirSync(root)
            function makeFile(files: any, root: string) {
                Object.keys(files).map(key => {
                    const val = files[key];
                    const path = join(root, key)
                    if (typeof val === 'string') {
                        writeFileSync(path, val)
                    } else {
                        mkdirSync(path);
                        makeFile(val, path)
                    }
                })
            }
            makeFile(files, root);
        } catch (e) { }
    }
    static instance: any;
    static create() {
        if (this.instance) return this.instance;
        this.instance = new ImsCommandCreate();
        return this.instance;
    }
}